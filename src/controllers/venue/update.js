import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

// Update a venue by id
const updateVenue = async (req, res) => {
  const { id } = req.params;
  const { venueName, venueCapacity } = req.body;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      venue.venueName = venueName;
      venue.venueCapacity = venueCapacity;
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
