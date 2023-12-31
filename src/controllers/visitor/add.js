import Visitor from "../../model/visitor";
import { parseMessage } from "../../utils/helper";

const addVisitor = async (req, res) => {
  const { visitorName, visitorEmail, visitorContactNo, visitorReason } =
    req.body;

  const { venueId } = req.params;

  try {
    const visitor = await Visitor.create({
      visitorName,
      visitorEmail,
      visitorContactNo,
      visitorReason,
      venueId,
    });
    res.status(201).json(parseMessage("Check In Successful!", visitor));
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
    return;
  }
};

export default addVisitor;
