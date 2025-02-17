import { Router } from "express";
import * as db from "../db/index.js";

const router = new Router();

// Get all of the chat a user is associated with
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await db.query(
			"SELECT c.chat_id, c.chat_name, c.created_at FROM userchats uc JOIN chat c ON uc.chat_id = c.chat_id WHERE uc.user_id = $1",
			[id]
		);
		if (rows.rowcount <= 0) {
			res.status(400).send("cannot fetch the details");
		}
		res.status(200).send({
			message: "All User Chats fetched",
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

// Insert into the userchats table the user_id, chat_id so the chat is now associated with a user
router.post("/userchats", async (req, res) => {
	try {
		const { user_id, chat_id } = req.body;
		const { rows } = await db.query(
			"INSERT INTO userchats (user_id, chat_id) VALUES ($1, $2)",
			[user_id, chat_id]
		);

		if (rows.rowCount <= 0) {
			res.status(400).send("Something wong wong");
		}

		res.status(200).send({
			message: "Created the UserChats",
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

// When a chat is deleted invoke this so the user is not associated with the chat anymore
router.delete("/delete/:user_id/:chat_id", async (req, res) => {
	try {
		const { user_id, chat_id } = req.params;
		const { rows } = await db.query(
			"DELETE FROM userchats WHERE user_id = $1 AND chat_id = $2",
			[user_id, chat_id]
		);

		if (rows.rowcount <= 0) {
			res.status(400).send("Cant delete user from chat");
		}
	} catch (error) {
		res.status(400).send({
			error: error,
			details: error.message,
			stack: error.stack,
		});
	}
});

export default router;
