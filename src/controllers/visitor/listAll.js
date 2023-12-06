import Visitor from "../../model/visitor";
import { parseMessage } from "../../utils/helper";
import { Op } from "sequelize";

const listAllVisitor = async (req, res) => {
  try {
    const { venueId } = req.params;
    const { search } = req.query;
    const page = req.query.page || 1;
    const limit = 15;
    const offset = (page - 1) * limit;
    const whereCondition = { venueId };
    if (search) {
      whereCondition[Op.or] = [
        { visitorName: { [Op.like]: `%${search}%` } },
        { visitorEmail: { [Op.like]: `%${search}%` } },
      ];
    }

    const { count, rows: visitors } = await Visitor.findAndCountAll({
      limit: limit,
      offset: offset,

      where: whereCondition,
      // where: {
      //   venueId: venueId,
      //   [Op.or]: [
      //     { name: { [Op.like]: `%${search}%` } },
      //     { email: { [Op.like]: `%${search}%` } },
      //   ],
      // },
    });
    const list = visitors;
    // console.log(list);
    const length = list.length;
    const maxPage = Math.ceil(count / limit);
    // console.log(DataTypes.list);
    if (list === null) {
      res.status(404).json(parseMessage("no visitors"));
      return;
    }

    res.status(201).json({
      message: `${length} visitors(s) retrieved`,
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

export default listAllVisitor;
