import User from "../../model/user";

const updateUser = async (req, res) => {
  const userId = req.user;
  console.log(">>>>>>>>>", userId);
  const { email, username } = req.body;
  console.log(req.body);

  try {
    const user = await User.update(
      { email, username },
      {
        where: { id: userId },
        returning: true,
      }
    );
    console.log(user);
    res.status(200).json({ message: "user details updated!", data: user });
  } catch (error) {
    console.log(">>>>>>>", error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default updateUser;
