import { DataTypes, Sequelize } from "sequelize";
import User from "../../model/user";
import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

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
      attributes: {
        include: [
          "id", // Add other attributes you want from the Venue model
          [
            Sequelize.literal(
              "(SELECT COUNT(id) FROM visitors WHERE visitors.venue_id = Venue.id)"
            ),
            "visitLogsCount",
          ],
        ],
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
