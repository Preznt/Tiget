import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";

const router = express.Router();

const Chkcond = (data) => {
  let query = `SELECT *
  FROM concert_artist ConArt
    INNER JOIN concert_info Con
      ON ConArt.concert_code = Con.concert_code
    INNER JOIN artist Art
      ON ConArt.artist_code = Art.artist_code
    INNER JOIN artist_genre ArtGen
      ON Art.artist_code = ArtGen.artist_code
    INNER JOIN genre Gen
      ON ArtGen.genre_code = Gen.genre_code WHERE `;

  let addQuery = [];
  if (data.start_date && data.end_date) {
    addQuery.push(`(start_date BETWEEN :start AND :end
    OR end_date BETWEEN :start AND :end)`);
  }
  if (data.concert_name) {
    addQuery.push(`concert_name LIKE :conName`);
  }
  if (data.concert_place) {
    addQuery.push(`concert_place LIKE :conPlace`);
  }
  if (data.artist_name) {
    addQuery.push(`artist_name LIKE :artName`);
  }
  if (data.concert_loc) {
    addQuery.push(`concert_loc IN (:loc)`);
  }
  if (data.genre_name) {
    addQuery.push(`genre_name IN (:genre)`);
  }
  addQuery = addQuery.join(` AND `);
  query += addQuery;
  query += ` GROUP BY Con.concert_code`;

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
  const listData = await DB.sequelize.query(query, {
    replacements: {
      start: `${start_date}`,
      end: `${end_date} + 1`,
      conName: `%${concert_name}%`,
      conPlace: `%${concert_place}%`,
      artName: `%${artist_name}%`,
      loc: `${concert_loc}`,
      genre: `${genre_name}`,
    },
    type: QueryTypes.SELECT,
  });

  const listCount = listData.length;
  res.render("list", { body: "list", listData, listCount });
});

export default router;
