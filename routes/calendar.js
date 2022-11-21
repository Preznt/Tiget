import express from "express";
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

const router = express.Router();

/* GET home page. */
router.get("/calendar", async (req, res, next) => {
  const holidays = await Holiday.findAll();
  const holiArr = [];
  for (let i of holidays) {
    holiArr.push(i.dataValues);
  }
  console.log(holiArr);
  res.render("calendar", { holiArr });
});

export default router;
