import { Sequelize } from "sequelize";
import User from "../../model/user";
import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

const listAll = async (req, res) => {
  try {
    const userId = req.user;

    // Get the page number from the request query
    const page = req.query.page || 1;
    // console.log(">>>>>>>>>", page);
    const limit = 5;

    // Calculate the offset
    const offset = (page - 1) * limit;

    const { count, rows: venues } = await Venue.findAndCountAll({
      where: {
        deletedAt: null,
      },
      limit: limit,
      offset: offset,
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
    const maxPage = Math.ceil(count / limit);
    // console.log(DataTypes.list);
    if (list === null) {
      res.status(404).json(parseMessage("Link not found"));
      return;
    }

    res.status(201).json({
      message: `${length} event(s) retrieved`,
      pagination: {
        currentPage: page,
        rowsLength: count,
        maxPage,
      },
      list,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>>", error);
    return;
  }
};

export default listAll;
