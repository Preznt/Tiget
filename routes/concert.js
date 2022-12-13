import express from "express";
import DB from "../models/index.js";

const router = express.Router();

const Concert = DB.models.concert_info;
const ConcertGenre = DB.models.genre_concert_model;

router.get("/", async (req, res) => {
  const concert = await Concert.findAll({
    where: { concert_type: "국내" },
    order: [["concert_views", "DESC"]],
  });
  // console.log(concert);
  const rConcert = await Concert.findAll({
    where: { concert_type: "국내", concert_loc: "서울" },
    order: [["concert_views", "DESC"]],
  });

  res.render("concert", { concert, rConcert, body: 1 });
});

router.get("/:category", async (req, res) => {
  const category = req.params.category;
  // console.log(category);
  try {
    const concert = await Concert.findAll({
      where: { concert_type: category },
      order: [["concert_views", "DESC"]],
    });
    // console.log(concert);
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

router.get("/genre/:gCategory", async (req, res) => {
  const gCategory = req.params.gCategory;
  // console.log(gCategory);
  try {
    const concert = await ConcertGenre.findAll({
      where: { genre_code: gCategory },
      include: "f_concert",
      required: false,
    });
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

router.get("/recommend/:category", async (req, res) => {
  const category = req.params.category;
  // console.log(category);
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

router.get("/region/:category", async (req, res) => {
  const category = req.params.category;

  console.log(category);
  try {
    const concert = await Concert.findAll({
      where: { concert_loc: category },
    });
    res.json(concert);
  } catch (err) {
    console.log(err);
  }
});

// 페스티벌 관련 라우터

router.get("/type/festival", async (req, res) => {
  const concert = await Concert.findAll({
    where: { concert_type: "페스티벌" },
    order: [["concert_views", "DESC"]],
  });
  const rConcert = await Concert.findAll({
    where: { concert_type: "페스티벌", concert_loc: "서울" },
    order: [["concert_views", "DESC"]],
  });

  res.render("concert", { concert, rConcert });
});

router.get("/festival/:region", async (req, res) => {
  const region = req.params.region;
  const rFestival = await Concert.findAll({
    where: { concert_type: "페스티벌", concert_loc: region },
    order: [["concert_views", "DESC"]],
  });
  res.json(rFestival);
});

export default router;
