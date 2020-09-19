const express = require("express");
const { Db } = require("mongodb");

const cors = require("cors");

const app = express();

app.use(cors());

const MongoClient = require("mongodb").MongoClient;

let db;

MongoClient.connect(
	"mongodb://localhost:27017/todos",
	{ useUnifiedTopology: true },
	async function (err, client) {
		if (err) throw err;

		db = client.db("todos");
		await db.collection("todos").deleteMany();

		await db.collection("todos").insertMany([
			{ done: true, desc: "study" },
			{ done: false, desc: "write" },
			{ done: true, desc: "execute" }
		]);
	}
);

app.get("/", (req, res) => {
	res.json("yay");
});

app.get("/todos", async (req, res) => {
	const todos = await db.collection("todos").find().toArray();
	res.json(todos);
});

app.listen(3002, () => {
	console.log("running on 3002");
});
