import Visitor from "../../model/visitor";
import { parseMessage } from "../../utils/helper";

const listAllVisitor = async (req, res) => {
  try {
    const { venueId } = req.params;
    const visitors = await Visitor.findAll({
      where: { venueId: venueId },
    });
    const list = visitors;
    const length = list.length;
    // console.log(DataTypes.list);
    if (list === null) {
      res.status(404).json(parseMessage("no visitors"));
      return;
    }

    res.status(201).json(parseMessage(`${length} visitors(s) retrieved`, list));
    return;
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
    console.log(">>>>>>", error);
    return;
  }
};

export default listAllVisitor;
