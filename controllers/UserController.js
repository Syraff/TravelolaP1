const { Op } = require("sequelize");
const { User, Profile } = require("../models");
const nodemailer = require("nodemailer");

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "nodemailertest53@gmail.com",
    pass: "ksjcawditmxklvua",
  },
});

const bcrypt = require("bcryptjs");

class UserController {
  static registerForm(req, res) {
    const { errors } = req.query;
    res.render("auth/register", { errors });
  }

  static postRegister(req, res) {
    const { email, password, role } = req.body;
    User.create({ email, password, role })
      .then(() => {
        let html = `
        <h1>Hai ${email}</h1>
        <h1><a href="http://localhost:3003/verification/${email}">Verification</a></h1>
        `;
        let details = {
          from: "nodemailertest53@gmail.com",
          to: "mhmmddaaa@gmail.com",
          subject: "Verification Travelola",
          html: html,
        };
        mailTransporter.sendMail(details, (err) => {
          if (err) {
            console.log(err);
            res.send("it has error ");
          } else {
            res.redirect("/login?success=Sent verification mail");
          }
        });
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map((el) => el.message);
          res.redirect(`/register?errors=${errors}`);
        } else res.send(err);
      });
  }

  static loginForm(req, res) {
    const { error, success } = req.query;
    res.render("auth/login", { success, error });
  }

  static postLogin(req, res) {
    const { email, password } = req.body;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          const isInvalidPassword = bcrypt.compareSync(password, user.password);
          if (isInvalidPassword) {
            if (user.activated) {
              req.session.userId = user.id;
              req.session.userRole = user.role;
              return res.redirect("/");
            } else {
              const error = "Verification email";
              return res.redirect(`/login?error=${error}`);
            }
          } else {
            const error = "Invalid Email or Password";
            return res.redirect(`/login?error=${error}`);
          }
        } else {
          const error = "Invalid Email or Password";
          return res.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }

  static verification(req, res) {
    const email = req.params.email;
    User.findOne({ where: { email } })
      .then((data) => {
        data.set("activated", true);
        data.save();
        res.redirect("/login?success=Account activated");
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  }

  static logout(req, res) {
    delete req.session.userId;
    res.redirect("/");
  }

  static profileForm(req, res) {
    const { userId } = req.session;
    Profile.findOne({ where: { UserId: userId }, include: User })
      .then((data) => {
        res.render("auth/profile", { userId, data });
        // res.send(data);
      })
      .catch((err) => res.send(err));
  }

  static addProfile(req, res) {
    const { userId } = req.session;
    const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;
    Profile.create({
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      UserId: userId,
    })
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => res.send(err));
  }

  static editProfile(req, res) {
    const { userId } = req.session;
    const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;
    Profile.update(
      { firstName, lastName, dateOfBirth, phoneNumber },
      { where: { UserId: userId } }
    )
      .then(() => {
        res.redirect("/profile");
      })
      .catch((err) => res.send(err));
  }
}
module.exports = UserController;
