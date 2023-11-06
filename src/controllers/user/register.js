import bcrypt from "bcryptjs";
import { parseMessage } from "../../utils/helper";
import User from "../../model/user.js";

const register = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedValue = bcrypt.hashSync(password, salt);

    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        username,
        password: hashedValue,
      },
    });
    if (created) {
      res
        .status(201)
        .json(parseMessage("user account successfully created", user));
    } else {
      res.status(403).json(parseMessage("account already exist!"));
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(">>>>>", error);
  }
};

export default register;
