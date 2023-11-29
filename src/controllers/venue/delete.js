import Venue from "../../model/venue";
import Visitor from "../../model/visitor"; // Import the Visitor model
import { parseMessage } from "../../utils/helper";

// Delete a venue by id
const deleteVenue = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const venue = await Venue.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
    if (venue) {
      // Find and delete the visitor associated with the venue
      const visitor = await Visitor.findOne({ where: { venueId: id } });
      if (visitor) {
        await visitor.destroy();
      }

      await venue.destroy();
      res
        .status(200)
        .json(parseMessage("Venue and associated visitor deleted!", venue));
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default deleteVenue;
