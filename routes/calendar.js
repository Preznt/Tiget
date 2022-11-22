import express from "express";
import DB from "../models/index.js";
const Holiday = DB.models.tbl_holiday;

const router = express.Router();

router.get("/", async (req, res, next) => {
  const holidays = await Holiday.findAll();
  const holiArr = [];
  // for (let i of holidays) {
  //   holiArr.push(i.dataValues);
  // }
  // console.log(holidays);
  // res.json(holidays);
  //
<<<<<<< HEAD
  res.render("main", { holidays: holidays });
=======
  res.render("calendar", { holidays: holidays });
>>>>>>> efa62ca4e8bf03385c461a70c27a6e1afe630e58
});

export default router;
