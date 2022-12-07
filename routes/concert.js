import express from "express";
import DB from "../models/index.js";

const router = express.Router();

const Concert = DB.models.concert_info;

router.get("/", (req, res) => {
  res.render("concert");
});

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  try {
    const concert = await Concert.findAll({
      where: { concert_type: category },
    });
    // console.log(concert);
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

export default router;
