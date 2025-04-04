const express = require("express");
const router = express.Router();
const Startup = require("../Models/Startups");
const Order = require("../Models/OrderSchema");
const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const Review = require('../Models/Review');
const Razorpay = require("razorpay");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../Middleware/fetchuser");
const Volunteer = require("../models/Volunteer");  // Assuming Volunteer model is defined

require('dotenv').config()

//Fetching Startups
router.get("/fetch-startups", fetchuser, async (req, res) => {
  try {
    let startups = await Startup.find({ isVerified: true });
    if (startups.length === 0) {
      return res.status(404).json({ success: false, error: "Could not find any startups right now" });
    }
    return res.status(200).json({ success: true, data: startups });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//Fetching Startup's Data
router.post("/fetch-startup", async (req, res) => {
  try {
    const { startup_id } = req.body;
    let startupsData = await Startup.findById(startup_id);
    if (!startupsData) {
      return res.status(404).json({ success: false, error: "Could not find any startups right now" });
    }
    return res.status(200).json({ success: true, data: startupsData });
  }
  catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})

//Fetching User's Startup's Data
router.get('/fetchuserStartups', fetchuser, async (req, res) => {
  try {
    let user_id = req.user.id;
    let data = await Startup.find({ Founder_id: user_id });
    console.log("Data of user:",data);
    if (data.length === 0) {
      console.log("Data not found:",data);
      return res.status(404).json({ success: false, msg: "No Startup Found for the User" })
    }
    console.log("API responded successfully with data:",data);
    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
})



router.post(
  "/create-volunteer",
  [
    // Validation rules
    body("Name", "Enter a valid name").isLength({ min: 3 }),
    body("Email", "Enter a valid email").isEmail(),
    body("Phone", "Enter a valid phone number").isLength({ min: 10, max: 15 }),
    body("Skills", "Skills must be at least 3 characters").isLength({ min: 3 }),
    body("Availability", "Enter valid availability").isLength({ min: 3 }),
    body("City", "City must be at least 3 characters").isLength({ min: 3 }),
  ],
  fetchuser,
  async (req, res) => {
    const userId = req.user.id; // Get the logged-in user's ID

    try {
      // Validate the incoming data
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("Validation failed:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      // Destructure fields from the request body
      const { Name, Email, Phone, Skills, Availability, City } = req.body;

      // Check if the volunteer already exists by email or phone number
      const existingVolunteer = await Volunteer.findOne({ $or: [{ email: Email }, { phone: Phone }] });
      if (existingVolunteer) {
        console.log("Volunteer already exists");
        return res.status(400).json({ success: false, msg: "Volunteer with this email or phone already exists" });
      }

      // Map incoming data to the schema fields
      const volunteerData = {
        userId,
        name: Name,
        email: Email,
        phone: Phone,
        skills: Skills,
        availability: Availability,
        city: City,
      };

      // Save the volunteer to the database
      const savedVolunteer = await Volunteer.create(volunteerData);
      console.log("Saved volunteer:", savedVolunteer);

      // Respond with success
      return res.json({ success: true, msg: "Volunteer registration successful!" });
    } catch (error) {
      console.error("Error occurred while creating volunteer:", error);
      return res.status(500).json({ success: false, msg: error.message });
    }
  }
);


router.get('/:city', async (req, res) => {
  const { city: needyLocation } = req.params;
  const {needyName, needyPhone, needyPurpose, urgencyStatus} = req.query;

  console.log("Query params: ", req.query)

  try {
    const volunteers = await Volunteer.find({ needyLocation }); // Filter by city
    // res.json(volunteers);

    for(const volunteer of volunteers){
      const {name:volunteerName, email:volunteerEmail} = volunteer;
      const title = "You are selected as a volunteer";
      const body = templateVolunteerNotification(volunteerName, needyName, needyPhone, needyLocation, needyPurpose, urgencyStatus )  
      const userMail = "volunteerEmail";
      // const userMail = volunteer.email;

      await sendMail(title, body, userMail);

      console.log("Mail sent to: ", userMail);
    }

    console.log("Volunteer info: ", volunteers);
    return res.status(200).json(volunteers);



  } catch (err) {
    console.log("Error while fetching volunteers: ", err);
    res.status(500).json({ message: 'Error fetching volunteers' });
  }
});





router.get('/cities', async (req, res) => {
  try {
    // Use the correct method 'distinct' to get distinct city values from the volunteer collection
    const cities = await Volunteer.distinct('city'); // Get distinct cities from the volunteer collection
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cities' });
  }
});

















// Creation of Startup
router.post(
  "/create-startup",
  [
    [
      body("Name", "Enter a valid name").isLength({ min: 3 }),
      body("Description", "description must be atleast 15 characters").isLength(
        {
          min: 15,
        }
      ),
      body("Website", "Enter a valid website").isLength({
        min: 10,
      }),
      body("Category", "Enter a valid category").exists(),
      body("Vision", "description must be atleast 15 characters").isLength({
        min: 15,
      }),
      body(
        "Problemstatement",
        "problemstatement must be atleast 15 characters"
      ).isLength({
        min: 15,
      }),
      // body("Solution", "solution must be atleast 15 characters").isLength({
      //   min: 15,
      // }),
    ],
  ],
  fetchuser,
  async (req, res) => {
    let Founder_id = req.user.id;
    try {
      const {
        Name,
        Description,
        Website,
        Email,
        Instagram,
        LinkedIn,
        LogoUrl,
        Category,
        Vision,
        Problemstatement,
        // Solution,
        Ask,
      } = req.body;
      console.log("create startup api called");
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("validiation faled:",errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
      }

      let existed = await Startup.findOne({ Name });
      console.log("existed startup:",existed);
      let startup = Startup({
        Founder_id,
        Name,
        Description,
        Website,
        Email,
        Instagram,
        LinkedIn,
        LogoUrl,
        Category,
        Vision,
        Problemstatement,
        // Solution,
        Ask
      });
      if (existed) {
        console.log("sartup already exist")
        return res.status(400).json({ success: false, msg: "Please Enter a unique name" });
      }
      let savedStartup = await startup.save();
      console.log("saved startup:",savedStartup)
      return res.json({ success: true, msg: "Congratulations!! Your registration has been successfully Submitted." })

    } catch (error) {
      console.log("Error occured while creating startup: ", error)
      return res.status(500).json({ success: false, msg: error.message });
    }
  }
);


router.get("/get-razorpay-key", fetchuser, (req, res) => {
  return res.json({ success: true, key: process.env.RAZORPAY_KEY_ID })
})

router.post("/create-order", fetchuser, async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    if (!order) {
      return res.status(500).json({ success: false, msg: "Some error occured" });
    }
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

router.post('/pay-order', async (req, res) => {
  try {
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature, investor_id, startup_id } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      investor_id,
      startup_id,
      razorpay: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    });
    let startup = await Startup.findById(startup_id);
    await Startup.findByIdAndUpdate(startup_id, { Current: startup.Current + amount, Backers: startup.Backers + 1 });
    await newOrder.save();
    res.json({
      success: true,
      msg: 'Payment was successfull',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: error.message });
  }
});

// Fetching the Transaction of Investor

router.get("/getTransactions", fetchuser, async (req, res) => {
  try {
    let userOrders = await Order.find({ investor_id: req.user.id });
    if (userOrders.length === 0) {
      return res.status(404).json({ success: false, msg: "No transactions yet" });
    }
    return res.json({ success: true, data: userOrders });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
})

// Storing Investor's Review

router.post("/review", fetchuser, async (req, res) => {
  try {
    let { ideaRating, approachRating, websiteRating, instagramRating, Startup_id, overallRating } = req.body;
    let review = Review({
      Startup_id,
      ideaRating,
      approachRating,
      websiteRating,
      instagramRating,
      overallRating
    });
    let userReview = await review.save();
    if (!userReview) {
      return res.status(500).json({ success: false, msg: "Cannot Save the file" });
    }
    return res.json({ success: true, msg: "Successfully Submitted" });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
})

// Get Startup's Review
router.post("/fetchstartupReview", async (req, res) => {
  try {
    const { startup_id } = req.body;
    const data = await Review.find({
      Startup_id: startup_id
    });
    if (data.length === 0) {
      return res.json({ success: false, msg: "No Startup Available" })
    }
    else {
      let avOverall = 0;
      data.forEach(element => {
        let a = element.overallRating;
        avOverall = avOverall + a;
      });
      return res.json({ success: true, ReviewData: { rating: Math.floor(avOverall / data.length) , totalReview: data.length } });
    }
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
})

// Get Startup's Transactions
router.post('/getStartupsTransactions', async (req,res)=>{
  try{
    let {startup_id} = req.body;
    let transactions = await Order.find({
      startup_id
      });
    if(transactions.length === 0){
      return res.json({success:false, msg:"No Transactions Found"});
    }
    return res.json({success:true, data: transactions});
  }
  catch(error){
    return res.status(500).json({ success: false, msg: error.message });
  }
})

// Getting User's Data
router.post('/getUsersName',fetchuser, async (req,res)=>{
  try {
    let {userId} = req.body;
    let user = await User.findById(userId).select("-password");
    if(!user){
      return res.status(404).json({success:false,msg:"No user found"});
    }
    return res.json({success:true, data:user.name})
  } catch (error) {
    return res.status(500).json({ success: false, msg: error.message });
  }
})


//Changing User's Data 
router.post("/changePassword", fetchuser, async (req, res) => {
  let { currentPassword, newPassword } = req.body;
  let user = await User.findById(req.user.id);
  console.log("User: ", req.user);
  console.log("User id: ", req?.user?.id);
  
  try {
    const passwordCompare = await bcrypt.compare(currentPassword, user.password);
    const salt = await bcrypt.genSaltSync(10)
    let secured = await bcrypt.hash(newPassword, salt);
    if (!passwordCompare) {
      console.log("Password do not match")
      return res.status(400).json({
          success: false,
          error: "Incorrect credentials",
        });
    }
    await User.findByIdAndUpdate(user._id, { password: secured }).then(() => {
      console.log("Password changed successfully to: ", newPassword)
      return res.json({ success: true, msg: "Changed Password Successfully!" })
    });
  } catch (error) {
    console.log("Error while updating password: ", error)
    return res.status(500).json({ success: false, msg: error.message });
  }
}) 

module.exports = router;
