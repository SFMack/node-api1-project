const express = require("express");
const shortId = require("shortid");

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
    newUser.id = shortId.generate();
    users.push(newUser);
    res.status(201).json({ message: "Your new user was created" });
  }
});

// get user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = users.find(user => user.id == id);
  if (foundUser) {
    users = users.filter(user => user.id == req.params.id);
    res.status(201).json(foundUser);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// delete user by id
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const foundUserToDelete = users.find(user => user.id == id);
  if (foundUserToDelete) {
    users = users.filter(user => user.id !== foundUserToDelete.id);
    res.status(200).json(foundUserToDelete);
  } else {
    res.status(404).send({ message: "User does not exist" });
  }
});

// update user by id
server.patch("/api/users/:id", (req, res) => {});

// start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
