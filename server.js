const express = require("express");

const server = express();

server.use(express.json());

const PORT = 4000;

server.use(express());

let users = [
  { id: 0, name: "Christian", bio: "Here is Christian's biography" },
  { id: 1, name: "James", bio: "Here is the James' biography" },
  { id: 2, name: "Ashley", bio: "Here is Ashley's biography" },
];

// get all users from /api/users route
server.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

// create a user and add to "database"
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (req.body.name == "" && req.body.bio == "") {
    res.status(400).json({
      errorMessage: "Please provide a name and bio for the user.",
      error,
    });
  } else {
    users.push(newUser);
    res.status(201).json({ message: "Your new user was created" });
  }
});

// get a specific user by id
server.get("/api/users/:id", (req, res) => {});

server.delete("/api/users/:id", (req, res) => {});

server.patch("/api/users/:id", (req, res) => {});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
