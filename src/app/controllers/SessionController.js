const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(404).json({
        error: "Enter an email"
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
};
