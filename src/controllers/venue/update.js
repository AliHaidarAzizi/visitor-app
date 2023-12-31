import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

// Update a venue by id
const updateVenue = async (req, res) => {
  const { id } = req.params;
  const { venueName, venueCapacity } = req.body;
  const userId = req.user;
  try {
    const venue = await Venue.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (venue) {
      if (venueName) {
        venue.venueName = venueName;
      }
      if (venueCapacity) {
        venue.venueCapacity = venueCapacity;
      }
      await venue.save();
      res.status(200).json(parseMessage("Venue updated!", venue));
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default updateVenue;
