import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

// Read or view a venue by id
const viewVenue = async (req, res) => {
  const { id } = req.params;
  try {
    const venue = await Venue.findByPk(id);
    if (venue) {
      res.status(200).json(parseMessage("Venue found!", venue));
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default viewVenue;
