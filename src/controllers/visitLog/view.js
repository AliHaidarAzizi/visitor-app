import Venue from "../../model/venue";
import visitLog from "../../model/visitLog";
import Visitor from "../../model/visitor";

const getVisitLogs = async (req, res) => {
  const userId = req.user;
  const venueId = req.body.venueId;

  try {
    const visitLogs = await visitLog.findAll({
      where: {
        venueId,
        userId,
      },
      include: [
        {
          model: Visitor,
          attributes: [
            "visitorName",
            "visitorEmail",
            "visitorContactNo",
            "visitorReason",
          ],
        },
        {
          model: Venue,
          attributes: ["venueName", "venueCapacity"],
        },
      ],
    });

    return res
      .status(200)
      .json({ message: "Visit logs retrieved successfully", visitLogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export default getVisitLogs;
