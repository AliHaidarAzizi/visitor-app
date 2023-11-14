const publicController = (req, res) => {
  res.status(200).json({ message: "Public route" });
};
const protectedController = (req, res) => {
  res
    .status(200)
    // req.user came from middleware assignation
    .json({ message: "Protected controller route", data: { user: req.user } });
};

const pageAuth = {
  protectedController,
  publicController,
};

export default pageAuth;
