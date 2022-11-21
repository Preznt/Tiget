import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/calendar", function (req, res, next) {
  res.render("calendar", { title: "Tiget" });
});

export default router;
