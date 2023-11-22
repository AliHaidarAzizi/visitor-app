import { Sequelize } from "sequelize";
import User from "../../model/user";
import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

const listAll = async (req, res) => {
  try {
    const userId = req.user;
    const venues = await Venue.findAll({
      limit: 5,
      attributes: {
        include: [
          "id", // Add other attributes you want from the Venue model
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM "visitors" WHERE "visitors"."venue_id" = "venue"."id")'
            ),
            "visitLogsCount",
          ],
        ],
      },
      include: {
        model: User,
        where: { id: userId },
      },
    });

    // we want to include visitlog count to this listAll controller

    const list = venues;
    const length = list.length;
    // console.log(DataTypes.list);
    if (list === null) {
      res.status(404).json(parseMessage("Link not found"));
      return;
    }

    res.status(201).json(parseMessage(`${length} event(s) retrieved`, list));
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>>", error);
    return;
  }
};

export default listAll;
