import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

const createVenue = async (req, res) => {
  const { venueName, venueCapacity } = req.body;
  try {
    const venue = await Venue.create({
      venueName,
      venueCapacity,
    });
    res.status(201).json(parseMessage("Venue/Event created!", venue));
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default createVenue;
