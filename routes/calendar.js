import express from "express";
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

const router = express.Router();

/* GET home page. */
router.get("/calendar", async (req, res, next) => {
  const holidays = await Holiday.findAll();
  console.log(holidays["tbl_holiday"]);
  res.render("calendar", { holidays });
});

export default router;
