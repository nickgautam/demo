const express= require("express")
const controller= require("./controller.js")
const router= express.Router()



router.post("/add", controller.createApi)


router.post("/update", controller.updateApi)


module.exports= router