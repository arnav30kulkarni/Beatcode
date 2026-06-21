const express = require("express");
const router = express.Router();

const userRouter  = require("./userRoutes");
const questionRoutes = require("./questionRoutes");

router.use("/user",userRouter);
router.use("/questions",questionRoutes);

module.exports = router;