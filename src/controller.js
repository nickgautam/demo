const mongoose = require("mongoose")
const model = require("./model.js")


exports.createApi = async (req, res) => {
    try {
        const data = req.body
        // console.log(data)
        const { productId, quantity } = data
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data in body"
        })
        if (!productId) return res.status(400).send({ status: false, msg: "productId is required" })
        if (!quantity) return res.status(400).send({ status: false, msg: "quantity is required" })
        const saveData = await model.create(data)
        return res.status(201).send({ status: true, msg: "Inventory created Successfully", data: saveData })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}


exports.updateApi = async (req, res) => {
    try {
        const data = req.body
        const { productId, quantity, operation } = data
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data in body"
        })
        const existData= await model.findOne({productId:productId})
        if(!existData)return res.status(404).send({status:false, msg:"No data exist with this id"})
        
        if(operation.toLowerCase()=="subtract"){
        if(quantity>existData.quantity) return res.status(400).send({
            status:false, 
            msg:"quantity for subtracting is greater than the available quantity"
        })
        else{
            existData.quantity= existData.quantity-quantity
        }
      }

      if(operation.toLowerCase()=="add"){
        if(quantity<=0) return res.status(400).send({
            status:false, 
            msg:"quantity for adding should be greater than zero"
        })
        else{
            existData.quantity= existData.quantity+quantity
        }
      }

      const updateData= await model.findOneAndUpdate({productId:productId},existData,{new:true})
      return res.status(200).send({status:true, msg:"Data updated Successfully", data:updateData})

    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}