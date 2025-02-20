import { Router } from "express";
import poolConnect from "../databaseConnect.js";
import verifyToken from "../middleware/middleware.js";

module.exports = (io) => {
	const router = Router();

	// Get all messages of a chat
	router.get("/:chat_id", verifyToken, async (req, res) => {
		try {
			const { chat_id } = req.params;
			const { user_id } = req.user.id;
			const { rows } = await poolConnect(
				"SELECT message FROM messages WHERE user_id = $1 AND chat_id = $2",
				[user_id, chat_id]
			);

			if (rows.rowcount <= 0) {
				res.status(400).send("The messages could not be fetched");
			}

			res.status(200).send({
				message: "All of the users have been fetched",
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

	// Get a specific message of a chat posted by a user
	router.get("/:chat_id/:message_id", verifyToken,async (req, res) => {
		try {
			const { chat_id, message_id } = req.params;
			const { user_id } = req.user.id;
			const { rows } = await poolConnect(
				"SELECT message FROM messages WHERE user_id = $1 AND chat_id = $2 AND message_id = $3",
				[user_id, chat_id, message_id]
			);

			if (rows.rowcount <= 0) {
				res.status(400).send("Message could not be fetched");
			}

			res.status(200).send({
				message: "fetched the message",
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

	router.post("/:chat_id", verifyToken, async (req, res) => {
	  try {
		const { chat_id } = req.params;
		const { user_id } = req.user.id;
		const { message } = req.body;
		
		// Corrected SQL query: include user_id and chat_id in the insertion
		const result = await poolConnect(
		  "INSERT INTO messages (user_id, chat_id, message) VALUES ($1, $2, $3) RETURNING *",
		  [user_id, chat_id, message]
		);
		
		if (result.rowCount <= 0) {
		  return res.status(400).send({
			message: "Something went wrong",
		  });
		}
		
		const newMessage = result.rows[0];

		const io = req.app.get("io");
		io.to(`chat-${chat_id}`).emit("newMessage", { chatId: chat_id, message: newMessage });

		res.status(200).send({
		  message: "Message posted to chat",
		  data: newMessage,
		});
	  } catch (error) {
		res.status(400).send({
		  error: error,
		  details: error.message,
		  stack: error.stack,
		});
	  }
	});

	router.put("/:chat_id/:message_id", async (req, res) => {
	  try {
		const { chat_id, message_id } = req.params;
		const { user_id } = req.user.id;
		const { message } = req.body;
		const result = await poolConnect(
		  "UPDATE messages SET message = $1 WHERE user_id = $2 AND chat_id = $3 AND message_id = $4 RETURNING *",
		  [message, user_id, chat_id, message_id]
		);

		if (result.rowCount === 0) {
		  return res.status(400).send("Message could not be updated");
		}

		const updatedMessage = result.rows[0];

		// Emit the update event using Socket.IO
		const io = req.app.get("io");
		io.to(`chat-${chat_id}`).emit("messageUpdated", {
		  chatId: chat_id,
		  message: updatedMessage,
		});

		res.status(200).send({
		  message: "Message updated successfully",
		  data: updatedMessage,
		});
	  } catch (error) {
		res.status(400).send({
		  error: error,
		  details: error.message,
		  stack: error.stack,
		});
	  }
	});


	router.delete("/:chat_id/:message_id", async (req, res) => {
	  try {
		const { chat_id, message_id } = req.params;
		const { user_id } = req.user.id;
		const result = await poolConnect(
		  "DELETE FROM messages WHERE user_id = $1 AND chat_id = $2 AND message_id = $3 RETURNING *",
		  [user_id, chat_id, message_id]
		);

		if (result.rowCount === 0) {
		  return res.status(400).send("Message could not be deleted");
		}

		// Emit the delete event using Socket.IO
		const io = req.app.get("io");
		io.to(`chat-${chat_id}`).emit("messageDeleted", {
		  chatId: chat_id,
		  messageId: message_id,
		});

		res.status(200).send({
		  message: "Message deleted successfully",
		  data: result.rows[0],
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
