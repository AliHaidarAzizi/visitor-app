import { DataTypes } from "sequelize";
import User from "../../model/user";
import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";
import listAllVisitor from "../visitor/listAll";

// Read or view a venue by id
const viewVenue = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;
  try {
    const venue = await Venue.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (venue) {
      res.status(200).json(parseMessage("Venue found!", venue));

      return;
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>>>", error);
  }
};

export default viewVenue;
