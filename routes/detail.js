import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
const Concert = DB.models.concert_info;

const router = express.Router();

// const Artist = DB.models.artist;
// const ConArt = DB.models.concert_artist_model;
// const Genre = DB.models.genre;

const filterData = (array, column, group) => {
  let result = [];
  let lastgroupValue = "";

  array.map((ele) => {
    const groupValue = ele[group];
    let data = [];
    if (groupValue !== lastgroupValue) {
      data = array.filter((data) => {
        if (data[group] === groupValue) return data;
      });

      let arr = [];
      if (data.length > 1) {
        for (let i of data) {
          if (!arr.includes(i[column])) {
            arr = arr.concat(i[column]);
          }
        }
        data[0][column] = arr;
      }
      data = data[0];
      lastgroupValue = groupValue;
      result.push(data);
    }
  });
  return result;
};

router.get("/:conCode", async (req, res) => {
  const code = req.params.conCode;

  // 조회수 증가
  const updateViews = await Concert.increment(["concert_views"], {
    by: 1,
    where: { concert_code: code },
  });

  const query = `SELECT *
  FROM concert_artist ConArt
  INNER JOIN concert_info Con
  ON ConArt.concert_code = Con.concert_code
  INNER JOIN artist Art
  ON ConArt.artist_code = Art.artist_code
  INNER JOIN artist_genre ArtGen
  ON Art.artist_code = ArtGen.artist_code
  INNER JOIN genre Gen
  ON ArtGen.genre_code = Gen.genre_code
  WHERE Con.concert_code = ${code}
  `;

  let result = await DB.sequelize.query(query, { type: QueryTypes.SELECT });

  const conInfo = {
    concert_name: result[0].concert_name,
    concert_poster: result[0].concert_poster,
    start_date: result[0].start_date,
    end_date: result[0].end_date,
    concert_place: result[0].concert_place,
    concert_loc: result[0].concert_loc,
    concert_ticketing: result[0].concert_ticketing,
    concert_type: result[0].concert_type,
    concert_views: result[0].concert_views,
  };
  console.log(conInfo);
  const artInfo = filterData(result, "genre_name", "artist_code");

  return res.render("detail", { conInfo, artInfo });
});

export default router;
