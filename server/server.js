const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/projects", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("projects");

	if (!req.body.name || req.body.name.trim() === "") {
		return res.status(400).send({ message: "Project name is required" });
	}

	const doc = {
		name: req.body.name,
		description: req.body.description || "",
		created_at: new Date()
	};

	coll.insertOne(doc)
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.get("/projects", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("projects");

	let page = parseInt(req.query.page) || 1;
	let limit = parseInt(req.query.limit) || 10;
	let skip = (page - 1) * limit;

	coll.find()
		.sort({ created_at: -1 })
		.skip(skip)
		.limit(limit)
		.toArray()
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.get("/projects/:id", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("projects");

	const doc = { _id: new ObjectId(req.params.id) };

	coll.findOne(doc)
		.then(response => {
			if (!response) {
				return res.status(404).send({ message: "Project not found" });
			}
			res.send(response);
		})
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.delete("/projects/:id", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const projectColl = db.collection("projects");
	const taskColl = db.collection("tasks");

	const doc = { _id: new ObjectId(req.params.id) };

	projectColl.deleteOne(doc)
		.then(response => {
			taskColl.deleteMany({ project_id: req.params.id })
				.then(() => res.send(response))
				.catch(error => res.status(500).send({ message: "Task delete error", error: error.message }));
		})
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.post("/projects/:project_id/tasks", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("tasks");

	if (!req.body.title || req.body.title.trim() === "") {
		return res.status(400).send({ message: "Task title is required" });
	}

	const statusList = ["todo", "in-progress", "done"];
	const priorityList = ["low", "medium", "high"];

	if (req.body.status && !statusList.includes(req.body.status)) {
		return res.status(400).send({ message: "Invalid status" });
	}

	if (req.body.priority && !priorityList.includes(req.body.priority)) {
		return res.status(400).send({ message: "Invalid priority" });
	}

	const doc = {
		project_id: req.params.project_id,
		title: req.body.title,
		description: req.body.description || "",
		status: req.body.status || "todo",
		priority: req.body.priority || "medium",
		due_date: req.body.due_date || "",
		created_at: new Date()
	};

	coll.insertOne(doc)
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.get("/projects/:project_id/tasks", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("tasks");

	let filter = { project_id: req.params.project_id };

	if (req.query.status) {
		filter.status = req.query.status;
	}

	let sortOrder = 1;
	if (req.query.sort === "desc") {
		sortOrder = -1;
	}

	coll.find(filter)
		.sort({ due_date: sortOrder })
		.toArray()
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.put("/tasks/:id", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("tasks");

	const statusList = ["todo", "in-progress", "done"];
	const priorityList = ["low", "medium", "high"];

	if (req.body.status && !statusList.includes(req.body.status)) {
		return res.status(400).send({ message: "Invalid status" });
	}

	if (req.body.priority && !priorityList.includes(req.body.priority)) {
		return res.status(400).send({ message: "Invalid priority" });
	}

	const filter = { _id: new ObjectId(req.params.id) };

	const doc = {
		$set: {
			title: req.body.title,
			description: req.body.description,
			status: req.body.status,
			priority: req.body.priority,
			due_date: req.body.due_date
		}
	};

	coll.updateOne(filter, doc)
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.delete("/tasks/:id", (req, res) => {
	const url = process.env.MONGO_URL;
	const con = new MongoClient(url);
	const db = con.db("project_management");
	const coll = db.collection("tasks");

	const doc = { _id: new ObjectId(req.params.id) };

	coll.deleteOne(doc)
		.then(response => res.send(response))
		.catch(error => res.status(500).send({ message: "Database error", error: error.message }));
});

app.listen(9000, () => {
	console.log("Ready to serve @ 9000");
});