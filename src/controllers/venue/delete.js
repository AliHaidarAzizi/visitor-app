import Venue from "../../model/venue";
import { parseMessage } from "../../utils/helper";

// Delete a venue by id
const deleteVenue = async (req, res) => {
  const { id, userId } = req.params;
  try {
    const venue = await Venue.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (venue) {
      await venue.destroy();
      res.status(200).json(parseMessage("Venue deleted!", venue));
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default deleteVenue;
