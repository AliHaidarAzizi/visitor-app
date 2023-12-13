import User from "../../model/user";
import { parseMessage } from "../../utils/helper";

const updateUser = async (req, res) => {
  const userId = req.user;
  const { email, username } = req.body;

  try {
    const user = await User.update(
      { email, username },
      {
        where: { id: userId },
        returning: true,
      }
    );
    res.status(200).json(parseMessage("user details updated!", user));
  } catch (error) {
    console.log(">>>>>>>", error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default updateUser;
