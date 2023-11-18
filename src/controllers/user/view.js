import User from "../../model/user";
import { parseMessage } from "../../utils/helper";

const viewUser = async (req, res) => {
  const userId = req.user;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      res.status(200).json(parseMessage("User found!", user));
      return;
    } else {
      res.status(404).json(parseMessage("User not found!"));
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>>>", error);
  }
};

export default viewUser;
