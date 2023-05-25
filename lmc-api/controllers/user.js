const db = require("../models/index");
const { Op } = require("sequelize");
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

// Endpoint to create user
exports.createUser = async (req, res, next) => {
  const userObject = JSON.parse(JSON.stringify(req.body));
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  // now we set user password to hashed password
  userObject.password = await bcrypt.hash(userObject.password, salt);

  delete userObject.id;

  db.User.create({
    ...userObject,
  })
    .then((user) => {
      res.status(200).json(user.dataValues);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to get single user
exports.getOneUser = async (req, res, next) => {
  let user = await db.User.findOne({ where: { id: req.params.id } });

  if (user) {
    const token = jwt.sign(user.toJSON(), process.env.JWT_KEY);
    res.status(200).json({ token, type: "Bearer" });
  } else {
    res.status(400).json({ message: "Error on getting user" });
  }
};

// Endpoint for auth user
exports.getAuthUser = async (req, res, next) => {
  let user = await db.User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (validPassword) {
      const token = jwt.sign(user.toJSON(), process.env.JWT_KEY);
      res.status(200).json({ token, type: "Bearer" });
    } else {
      res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

// Endpoint to update user
exports.modifyUser = async ({ body, query, params }, res, next) => {
  const userObject = JSON.parse(JSON.stringify(body));

  db.User.update(
    { ...userObject },
    {
      where: { id: params.id },
    }
  )
    .then(async () => {
      await db.User.findOne({ where: { id: params.id } })
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => error.message);
};

// Endpoint to get all users
exports.getAllUsers = async (req, res, next) => {
  db.User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => res.status(400).json({ error }));
};

// Endpoint to delete user
exports.deleteUser = async (req, res, next) => {
  const user = await db.User.findOne({ where: { id: req.params.id } });

  if (
    user.email === "tshitengailunga@icloud.com" &&
    user.password ===
      "$2b$10$pUaWvCIKqTCA8W/byi2Z.uEic1TgUCzLYvBIQtGkbaSAu3QBDdPJC" &&
    user.role_id === 1
  ) {
    res
      .status(200)
      .json({ message: "Cet utilisateur ne peut pas être supprimé !" });
  } else {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => {
        res.status(200).json({ message: "User deleted !" });
      })
      .catch((error) => res.status(400).json({ error }));
  }
};
