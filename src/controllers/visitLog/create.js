import Venue from "../../model/venue";
import visitLog from "../../model/visitLog";
import Visitor from "../../model/visitor";

const createVisitLog = async (req, res) => {
  try {
    const { visitorId, venueId } = req.body;

    const visitor = await Visitor.findByPk(visitorId);
    if (!visitor) {
      return res.status(404).json({ message: "Visitor not found" });
    }

    const venue = await Venue.findByPk(venueId);
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    const newVisitLog = await visitLog.create({
      visitorId,
      venueId,
      createdAt: new Date(),
    });

    return res.status(201).json({
      message: "Visit log created successfully",
      visitLog: newVisitLog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error });
  }
};

export default createVisitLog;
