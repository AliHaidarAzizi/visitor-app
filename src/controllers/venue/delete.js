import Venue from "../../model/venue";
import Visitor from "../../model/visitor";
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
      venue.deletedAt = new Date();
      await venue.save();
      await Visitor.update(
        { deletedAt: new Date() },
        { where: { venueId: id } }
      );
      res
        .status(200)
        .json(parseMessage("Venue and associated visitor deleted!", venue));
    } else {
      res.status(404).json(parseMessage("Venue not found!"));
    }
  } catch (error) {
    console.log(">>>>>>>>", error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

export default deleteVenue;
