import express from "express";
import sequelize from "sequelize";
import { QueryTypes } from "sequelize";
import DB from "../models/index.js";
const Concert = DB.models.concert_info;

const router = express.Router();

// 콘서트와 아티스트의 장르를 배열로 통합하는 함수
const makeArray = (array, column, group) => {
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
  try {
    const code = req.params.conCode;
    console.log(code);

    // 조회수 증가
    // const updateViews = await Concert.increment(["concert_views"], {
    //   by: 1,
    //   where: { concert_code: code },
    // });

    // const conQuery = `
    // SELECT Con.concert_type, Con.concert_views, Con.concert_poster,
    // Con.concert_name, Con.concert_loc, Con.concert_ticketing, Con.concert_place,
    // Con.start_date, Con.end_date, Gen.genre_name
    // FROM concert_info Con
    //   INNER JOIN genre_concert GenCon
    //     ON Con.concert_code = GenCon.concert_code
    //   INNER JOIN genre Gen
    //     ON GenCon.genre_code = Gen.genre_code
    // WHERE Con.concert_code = ${code}
    // `;

    const artQuery = `
    SELECT Art.artist_code, Art.artist_name, Art.artist_type,
    Art.artist_img, Art.artist_debut,
    Gen.genre_name
    FROM concert_info Con
      INNER JOIN concert_artist ConArt
        ON Con.concert_code = ConArt.concert_code
      INNER JOIN artist Art
        ON ConArt.artist_code = Art.artist_code
      INNER JOIN artist_genre ArtGen
        ON Art.artist_code = ArtGen.artist_code
      INNER JOIN genre Gen
        ON ArtGen.genre_code = Gen.genre_code
    WHERE Con.concert_code = ${code}
    `;

    // let conResult = await DB.sequelize.query(conQuery, {
    //   type: QueryTypes.SELECT,
    // });
    let artResult = await DB.sequelize.query(artQuery, {
      type: QueryTypes.SELECT,
    });

    // 콘서트 장르를 배열로 변환 후 통합
    // const conInfo = makeArray(conResult, "genre_name", "concert_code");

    // 아티스트 장르를 배열로 변환 후 통합
    const artInfo = makeArray(artResult, "genre_name", "artist_code");
    // conInfo,
    return res.render("detail", { artInfo });
  } catch (err) {
    console.error(err);
    return res.send("서버가 죽엇슴다--;;");
  }
});

export default router;
