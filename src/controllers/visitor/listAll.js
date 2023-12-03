import Visitor from "../../model/visitor";
import { parseMessage } from "../../utils/helper";

const listAllVisitor = async (req, res) => {
  try {
    const { venueId } = req.params;
    const page = req.query.page || 1;
    const limit = 15;
    const offset = (page - 1) * limit;

    const { count, rows: visitors } = await Visitor.findAndCountAll({
      limit: limit,
      offset: offset,

      where: { venueId: venueId },
    });
    const list = visitors;
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
