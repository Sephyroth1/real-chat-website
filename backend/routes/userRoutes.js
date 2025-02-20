import { Router } from "express";
import { bcryptjs } from "bcryptjs";
import poolConnect from "../databaseConnect.js";
import verifyToken from "../middleware/middleware.js";


module.exports = () => {
    const router = Router();

    router.post("/signup", async (req, res) => {
        try {
            const { username, email, password} = req.body;

            if (!username || !email || !password) {
                return res.status(400).send({
                    message: "All Fields Required"
                });
            }

            const hashedPassword = await bcryptjs.hash(password, 10);
            const selectQuery = await poolQuery( 
                "SELECT * FROM users where username = $1 OR email = $2",
                [username, email]
            );
            if (selectQuery.rowCount > 0) {
                return res.status(400).send({
                    message: "User Already Exists"
                })
            }

            const {rows} = await poolConnect(
                "INSERT INTO users (username, email, password, createdAt, updatedAt) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
                [username, email, hashedPassword, new Date(), new Date()]
            );
            
            if (!rows || rows.length === 0) {
                return res.status(500).send({
                    message: "Internal Server Error"
                })
            }

            return res.status(201).send({
                message: "User Created Successfully",
                user: {
                    username: rows.username,
                    email: rows.email
                },
            });
        }
        catch(error){
            console.error("Error:", error.message);
            return res.status(500).send({
                error: error,
                message: error.message,
                stack: error.stack,
            });
        }
    })

    router.post("/login", async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Validate input
            if (!username || !email || !password) {
                return res
                    .status(400)
                    .send({ message: "Username, email, and password are required" });
            }

            // Get the user from the database
            const result = await poolConnect(
                "SELECT id, username, email, password FROM users WHERE username = $1 AND email = $2",
                [username, email]
            );

            const user = result.rows[0];

            if (!user) {
                return res.status(404).send({
                    message: "User Not Found"
                })
            }


            const isPasswordValid = await bcryptjs.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(400).send({ message: "Invalid password" });
            }

            // Create JWT token
            const token = jwt.sign(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                process.env.JWT_TOKEN, // Secret key from environment variable
                { expiresIn: "1h" }
            );

            // Check if the token was successfully generated
            if (!token) {
                return res.status(500).send({ message: "Token generation failed" });
            }

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Ensure secure cookie in production
                maxAge: 3600000, // 1 hour expiration time
                sameSite: "Strict", // Prevent CSRF
            });

            res.status(200).send({
                message: "Login successful",
                token: token,
            });
        } catch (error) {
            console.error("Error:", error.message);
            return res.status(500).send({
                error: error,
                message: error.message,
                stack: error.stack,
            });
        }
    })


    router.post("/logout", async (req, res) => {
        try {
            res.cookie("token", "", { expires: new Date(0), httpOnly: true });
            res.send("User Logged Out Successfully");
        } catch (error) {
            res.status(400).send({
                error: error,
                details: error.message,
                stack: error.stack,
            });
        }
    });

    
    router.delete("/delete/:id", async (req, res) => {
        const { id } = req.params;
        const query = await poolConnect(
            "SELECT username, email FROM users where id = $1",
            [id]
        );

        if (query.rowCount <= 0) {
            res.status(404).send({
                message: "Could not find User",
            });
        }

        const deleteQuery = await poolConnect("DELETE FROM users WHERE id = $1", [id]);

        if (deleteQuery.rowCount <= 0) {
            res.status(500).send({
                message: "Could not delete User",
            });
        }

        res.cookie("token", "", { expires: new Date(0), httpOnly: true });

        res.status(204).send({
            message: "User has been deleted",
        });
    });


    // Get Users By User Id
    router.get("/profile", verifyToken, async (req, res) => {
        const { id } = req.user;
        const { rows } = await poolConnect("SELECT * FROM users where id = $1", [id]);
        if (rows.rowCount <= 0) {
            res.status(400).send("User Could not be found");
        }
        res.send(rows[0]);
    });

    // Update User Details
    router.put("/profile/update/:id", verifyToken, async (req, res) => {
        try {
            const { id } = req.params;
            const { username, email, password } = req.body;

            const selectQuery = await poolConnect(
                "SELECT username, email, password, FROM users WHERE id = $1",
                [id]
            );

            if (!selectQuery.rowCount <= 0) {
            }

            const updatedUser = {};

            if (username) updatedUser.username = username;
            else {
                updatedUser.username = selectQuery.rows[0].username;
            }
            if (email) updatedUser.email = email;
            else {
                updatedUser.email = selectQuery.rows[0].email;
            }

            if (password) updatedUser.password = password;
            else {
                updatedUser.password = selectQuery.rows[0].password;
            }

            const hashedPassword = await bcryptjs.hash(updatedUser.password, 10);
            const updateQuery = await poolConnect(
                "UPDATE users SET username = $1, email = $2, password = $3 WHERE chat_id = $2",
                [updatedUser.username, updatedUser.email, updatedUser.password]
            );

            if (updatedUser.rowCount <= 0) {
                res.status(400).send({
                    message: "Could not update",
                });
            }

            res.status(200).send({
                message: "User is updated",
                data: rows[0],
            });
        } catch (error) {
            res.status(400).send({
                error: error,
                details: error.message,
                stack: error.stack,
            });
        }
    });
}
