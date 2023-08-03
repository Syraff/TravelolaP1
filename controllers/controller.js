const { Package, Booking, Profile, Transaction, User } = require("../models");
const formatNumber = require("../helpers/helper");

class Controller {
  static home(req, res) {
    const { userId } = req.session;
    Package.findAll()
      .then((data) => {
        res.render("home", { data, formatNumber, userId });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static detail(req, res) {
    Package.findByPk(req.params.id)
      .then((data) => {
        res.render("detail", { data, formatNumber });
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static booking(req, res) {
    const { userId } = req.session;
    let profile;
    Profile.findOne({ where: { UserId: userId } })
      .then((data) => {
        profile = data;
        return Package.findByPk(req.params.id);
      })
      .then((pkg) => {
        if (profile) {
          res.render("booking", { pkg });
        } else res.redirect("/profile?error=Profile First");
      })
      .catch((err) => res.send(err));
  }

  static postBooking(req, res) {
    const { userId } = req.session;
    const { participants } = req.body;
    let tour;
    Package.findByPk(req.params.id)
      .then((pkg) => {
        tour = pkg;
        return Booking.create({
          participants,
          UserId: userId,
          packageId: req.params.id,
          orderDate: new Date(),
          totalPayment: tour.price * participants,
        });
      })
      .then(() => {
        res.send("Berhasil");
      })
      .catch((err) => res.send(err));
  }
}

module.exports = Controller;
