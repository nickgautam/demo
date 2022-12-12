const express= require("express")
const router= express.Router()
const controller= require("./controller.js")


router.post("/product",controller.createInventory)
router.post("/Updateproduct", controller.UpdateInventory)
router.all("/**",function(){
    return res.status(404).send({status:false,msg:"The Api endpoint you are requesting is not available"})
})

module.exports= router