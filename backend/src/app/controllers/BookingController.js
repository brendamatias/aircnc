const User = require("../models/User");
const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;
    const { date } = req.body;

    const user = await User.findById(user_id);

    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    }

    let booking = await Booking.findOne({ spot: spot_id, user: user_id });

    if (booking) {
      return res
        .status(400)
        .json({ error: "You have already requested this reservation." });
    }

    booking = await Booking.create({
      user: user_id,
      spot: spot_id,
      date
    });

    await booking
      .populate("spot")
      .populate("user")
      .execPopulate();

    return res.json(booking);
  }
};
