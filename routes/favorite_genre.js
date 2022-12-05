import express from "express";
import DB from "../models/index.js";

const IntGen = DB.models.genre_of_interest;
const router = express.Router();

router.get("/", async (req, res) => {
  // const uservalue = "bjw1403@gmail.com";
  // const favorite_genre = await IntGen.findAll({
  //   where: { username: uservalue },
  // });

  res.render("mypage", { body: "favoriteGenre" });
});

router.post("/", async (req, res) => {
  const uservalue = req.body.username;
  const genres = req.body.genre;

  // IntGen.create(InfoGenre);
  // console.log(uservalue, genres);

  const upLoadGenre = genres.map((genre) => {
    let uploadvalue = {
      username: uservalue,
      genre_code: genre,
    };
    return uploadvalue;
  });

  console.log(upLoadGenre);
  const del = await IntGen.destroy({ where: { username: uservalue } });
  const result = await IntGen.bulkCreate(upLoadGenre);
});
export default router;
