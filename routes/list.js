import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
const Concert = DB.models.concert_info;
const Artist = DB.models.artist;
const ConArt = DB.models.concert_artist_model;
const ArtGen = DB.models.artist_genre;
const Genre = DB.models.genre;

const router = express.Router();

const Chkcond = (data) => {
  console.log(data.start_date);
  console.log(data.end_date);

  let query = `SELECT *
  FROM concert_artist ConArt
    INNER JOIN concert_info Con
      ON ConArt.concert_code = Con.concert_code
    INNER JOIN artist Art
      ON ConArt.artist_code = Art.artist_code
    INNER JOIN artist_genre ArtGen
      ON Art.artist_code = ArtGen.artist_code
    INNER JOIN genre Gen
      ON ArtGen.genre_code = Gen.genre_code WHERE`;

  if (data.start_date && data.end_date)
    query += ` start_date BETWEEN "${data.start_date}" AND "${data.end_date} + 1"
    OR end_date BETWEEN "${data.start_date}" AND "${data.end_date} + 1"`;

  // if (data.concert_name) query += ``;

  // if (data.concert_place) query += ``;

  // if (data.artist_name) query += ``;

  // if (data.concert_loc) query += ``;

  // if (data.genre_name) query += ``;

  // concert_loc과 genre_name은 IN 키워드 사용?

  query += ` GROUP BY concert_info.concert_code`;
  return query;
};

router.post("/", async (req, res) => {
  const data = req.body;

  let {
    start_date,
    end_date,
    concert_name,
    concert_place,
    artist_name,
    concert_loc,
    genre_name,
  } = data;

  const query = Chkcond(data);
  console.log(query);

  let listData = await DB.sequelize.query(query, { type: QueryTypes.SELECT });

  //   const result = await Concert.findAll({where: $or
  //   {
  //     {start_date: $between {start_date,end_date}},
  //     {end_date:$between {start_date,end_date}}
  //   }
  // })

  res.render("list", { body: "list", listData });
});

export default router;
