import express from "express";
import DB from "../models/index.js";

const IntGen = DB.models.genre_of_interest;
const router = express.Router();

router.get("/", async (req, res) => {
  // const uservalue = "bjw1403@gmail.com";
  // const favorite_genre = await IntGen.findAll({
  //   where: { username: uservalue },
  // });
  const username = req.session.user.username;
  const favorite_genre = await IntGen.findAll({
    where: { username: username },
  });
  res.render("mypage", { body: "favoriteGenre", info: favorite_genre });
});

router.post("/", async (req, res) => {
  const uservalue = req.session.user.username;
  const genres = req.body.genre;

  // IntGen.create(InfoGenre);
  // console.log(uservalue, genres);
  try {
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
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<script>alert('선호장르가 변경되었습니다')</script>");
    return res.write("<script>location.href='/favoriteGenre'</script>");
  } catch (err) {
    console.error(err);
  }
});
export default router;
