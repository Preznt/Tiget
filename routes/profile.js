import express from "express"
import modelDB from "../models/index.js"
const router = express.Router()
const userDB = modelDB.models.user

router.get("/", (req, res)=> {
    res.render("mypage", {users:""} )
})
router.post("/:id", async (req, res)=> {
    const id = req.body

    try {
        const withdrawalResult = await userDB.destroy({where:{username:id}})
        res.redirect("/")
    } catch(err) {console.error(err); return res.send("회원정보가 없습니다.")}
}) 


export default router
