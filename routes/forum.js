import express from "express";

// 데이터 베이스 import
// import bbsDB from "../models/.."

const router = express.Router();

router.get(`/forum/:community`, async (req, res) => {
  let community = req.body.location;
  /**
   * try {
   * } catch(err) {}
   */
});
