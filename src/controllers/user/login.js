import bcrypt from "bcryptjs";
import { parseMessage } from "../../utils/helper";
import jwt from "jsonwebtoken";
import config from "../../config";
import User from "../../model/user";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    console.log(user);

    if (user === null) {
      res.status(401).json(parseMessage("unauthorised"));
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const token = jwt.sign({ id: user.id }, config.jwtSecret);

    if (isMatch) {
      res.status(200).json({ message: "Login successful", data: user, token });
      return;
    } else {
      res.status(403).json(parseMessage("Unauthorised"));
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>", error);
    return;
  }
};

export default login;
