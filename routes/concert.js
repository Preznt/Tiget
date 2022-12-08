import express from "express";
import DB from "../models/index.js";

const router = express.Router();

const Concert = DB.models.concert_info;
const ConcertGenre = DB.models.concert_genre;

router.get("/", (req, res) => {
  res.render("concert");
});

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  try {
    const concert = await Concert.findAll({
      where: { concert_type: category },
      order: [["concert_views", "DESC"]],
      limit: 4,
    });
    // console.log(concert);
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

router.get("/genre/:gcategory", async (req, res) => {
  const gcategory = req.params.category;
  console.log(gcategory);
  try {
    const concert = await ConcertGenre.findAll({
      where: { genre_code: gcategory },
    });
    // console.log(concert);
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

router.get("/recommend/:category", async (req, res) => {
  const category = req.params.category;
  console.log(category);
  try {
    const concert = await Concert.findAll({
      where: { concert_type: category },
      order: [["concert_views", "ASC"]],
      limit: 5,
    });
    // console.log(concert);
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

export default router;
