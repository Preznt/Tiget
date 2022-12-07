import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";

const router = express.Router();
// const Concert = DB.models.concert_info;
// const Artist = DB.models.artist;
// const ConArt = DB.models.concert_artist_model;
// const Genre = DB.models.genre;

const filterData = (data) => {
  let artArr = [];
  let genArr = [];
  if (data.length > 1) {
    for (let i of data) {
      if (!artArr.includes(i.artist_name)) {
        artArr = artArr.concat(i.artist_name);
      }
      if (!genArr.includes(i.genre_name)) {
        genArr = genArr.concat(i.genre_name);
      }
    }
    data[0].artist_name = artArr;
    data[0].genre_name = genArr;
  }
  data = data[0];
  return data;
};

router.get("/:conCode", async (req, res) => {
  const code = req.params.conCode;

  const query = `SELECT *
  FROM concert_artist ConArt
  LEFT JOIN concert_info Con
  ON ConArt.concert_code = Con.concert_code
  RIGHT JOIN artist Art
  ON ConArt.artist_code = Art.artist_code
  RIGHT JOIN artist_genre ArtGen
  ON Art.artist_code = ArtGen.artist_code
  RIGHT JOIN genre Gen
  ON ArtGen.genre_code = Gen.genre_code
  WHERE Con.concert_code = ${code}
  `;

  let result = await DB.sequelize.query(query, { type: QueryTypes.SELECT });

  result = filterData(result);

  const conInfo = {
    concert_name: result.concert_name,
    concert_poster: result.concert_poster,
    start_date: result.start_date,
    end_date: result.end_date,
    concert_place: result.concert_place,
    concert_loc: result.concert_loc,
    concert_ticketing: result.concert_ticketing,
    concert_type: result.concert_type,
    concert_views: null,
    artist_name: result.artist_name,
    artist_type: result.artist_type,
    artist_img: result.artist_img,
    artist_debut: result.artist_debut,
    genre_code: result.genre_code,
    genre_name: result.genre_name,
  };

  console.log(conInfo);
  res.render("detail", { conInfo });
});

export default router;
