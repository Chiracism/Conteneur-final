import jwt from "jsonwebtoken";
import { User } from "../models/index";

const auth = async (req, res, next) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").replace("Bearer ", "");
    try {
      let decoded = jwt.verify(token, process.env.JWT_KEY);
      let user = null;
      user = await User.findByPk(decoded.id);
      if (!user) {
        res.status(403);
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res
      .status(403)
      .json({ message: "Authorization header required", code: "403" });
  }
};
export default auth;
