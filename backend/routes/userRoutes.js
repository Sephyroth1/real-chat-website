import { Router } from "express";
import { bcryptjs } from "bcryptjs";
import poolQuery from "../databaseConnect.js";


module.exports = () => {
    const router = Router();

    router.post("/signup", async (req, res) => {
        const { username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                message: "All Fields Required"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

    })
}
