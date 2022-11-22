import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("title", { title: "callor.com Express" });
});
router.get("/main", (req, res) => {
  res.render("./main/community")
})
export default router;
