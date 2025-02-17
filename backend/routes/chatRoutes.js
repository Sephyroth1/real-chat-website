import { Router } from "express";
import poolConnect from "../databaseConnect.js";
import verifyToken from "../middleware/middleware.js";

const router = Router();

router.get("/", verifyToken, async (_, res) => {
	const getAll = await poolConnect("SELECT * FROM chat");

	if (getAll.rowCount<= 0) {
		res.status(400).send("Chat couldn't be found");
	}

	res.status(200).send({
		message: "Chat fetched Successfully",
		chat: getAll.rows[0],
	});
});

router.get("/:chat_id", verifyToken, async (req, res) => {
	const { chat_id } = req.params;
	const getById = await poolConnect("SELECT * FROM chat where chat_id = $1", [
		chat_id,
	]);

	if (getById.rowCount <= 0) {
		res.status(404).send("Chat Couldn't be found by Id");
	}

	res.status(200).send({
		chat: getById.rows[0],
	});
});

router.post("/create", async (req, res) => {
	const { chat_name } = req.body;
	const insertChat = await poolConnect(
		"INSERT INTO chat (chat_name, createdAt) VALUES ($1, $2)",
		[chat_name, new Date()]
	);

	if (insertChat.rowCount <= 0) {
		res.status(400).send("INSERTION FAILED");
	}

	res.status(200).send({
		message: "Chat successfully created",
		chat: insertChat.rows[0],
	});
});

router.put("/update/:id", async (req, res) => {
	const { chat_id } = req.params;
	const { chat_name } = req.body;
	const updateQuery = await poolConnect(
		"UPDATE chat set chat_name=$1 WHERE chat_id=$2",
		[chat_name, chat_id]
	);

	if (updateQuery.rowCount <= 0) {
		res.status(400).send("The chat could not be updated");
	}

	res.status(200).send({
		message: "The chat has been updated",
		chat_details: updateQuery.rows[0],
	});
});

router.delete("/delete/:id", async (req, res) => {
	const { chat_id } = req.body;
	const { chat_name } = req.body;

	const deleteUser = await poolConnect(
		"DELETE INTO chat WHERE chat_id = $1 AND chat_name = $2",
		[chat_id, chat_name]
	);

	if (deleteUser.rowCount <= 0) {
		res.status(400).send("The chat could not be deleted ");
	}

	res.status(200).send({
		message: "Chat deleted Successfully",
	});
});

export default router;
