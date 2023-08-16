const bookingRoutes = require("express").Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const Booking = require("../Models/Schema");
bookingRoutes.use(bodyParser.urlencoded({ extended: false }));
bookingRoutes.use(bodyParser.json());
bookingRoutes.use(cors());


  //API for creating a movie booking ------------------------------------------------//
bookingRoutes.post("/api/booking", async (req, res) => {
    console.log(req.body);
    const booking = new Booking({
      movie: req.body.movie,
      seats: req.body.seats,
      slot: req.body.slot,
    });
    try {
      await booking.save();
      console.log("Your booking is confirmed");
      return res.status(200).send({ message: "Your booking has been confirmed" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  });
  
  //API for getting the last booking-------------------------------------------------//
  

  bookingRoutes.get("/api/booking", async (req, res) => {
    try {
      const booking = await Booking.find().sort({ createdOn: -1 }).limit(1);
      if (booking[0]) {
        res.status(200).send(booking[0]);
      } else {
        res.status(200).send({ message: "No previous bookings found" });
      }
    } catch (err) {
      res.status(500).send({ message: "error while getting the last booking" });
      console.log("error while getting the last booking", err);
    }
  });

  module.exports=bookingRoutes;