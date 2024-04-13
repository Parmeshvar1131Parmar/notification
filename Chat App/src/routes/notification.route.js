const express = require("express");
const router = express.Router();
const { getNotifications } = require("../controller/notification.controller");

router.get("/notifications", async (req, res) => {
  try {
    // const userId = req.user.id; // Assuming user ID is available after authentication
    const notifications = await getNotifications();
    // console.log(notifications);
    res.render("notifications", { notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
