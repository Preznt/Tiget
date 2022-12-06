import express from "express";

const router = express.Router();
router.post("/", (req, res) => {
  const data = req.body;
  console.log(data);
  const {
    search_start,
    search_end,
    search_place,
    search_cast,
    search_loc,
    search_genre,
  } = data;

  const query = `SELECT artist.artist_name, concert_info.concert_name, concert_info.concert_poster, concert_info.start_date, concert_info.end_date
  FROM concert_artist
  LEFT JOIN artist
  ON concert_artist.artist_code = artist.artist_code
  LEFT JOIN concert_info
  ON concert_info.concert_code = concert_artist.concert_code;`;

  res.render("detail", { body: "detail" });
});

export default router;
