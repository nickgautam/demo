const mongoose= require("mongoose")
const model= require("./model.js")


exports.createInventory= async (req,res)=>{
    try{
        const data= req.body
        const{productId, quantity}=data
        if(Object.keys(data).length==0)return res.status(400).send({status:false, msg:"Please mention some data"})
        if(!productId)return res.status(400).send({status:false, msg:"Product Id is required"})
        if(!quantity)return res.status(400).send({status:false, msg:"quantity is required"})
        const saveData= await model.create(data)
        return res.status(201).send({status:true, msg:"Inventory data is successfully created",data: saveData})
    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}


exports.UpdateInventory= async (req, res)=>{
    try{
        const data= req.body
        const{productId,quantity,operation}=data
        if(Object.keys(data).length==0)return res.status(400).send({status:false, msg:"Please mention some data"})

        const alreadyExistData= await model.findOne({productId:productId})
        if(!alreadyExistData)return res.status(404).send({status:false, msg:"No data found with this id"})
        if(operation.toLowerCase()=="add"){
            if(quantity>0){
                alreadyExistData.quantity= alreadyExistData.quantity+ quantity
            }
            else return res.status(400).send({status:false, msg:"quantity for adding should be greater than 0"})
        }
        if(operation.toLowerCase()=="subtract"){
            if(quantity<alreadyExistData.quantity){
                alreadyExistData.quantity= alreadyExistData.quantity- quantity
            }
            else return res.status(400).send({status:false, msg:"quantity for subtracting should not be greater than existing quantity"})
        }
        const updateData = await model.findOneAndUpdate({productId:productId},alreadyExistData,{new:true})
        return res.status(200).send({status:true, msg:"Inventory data is successfully updated",data: updateData})
    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}

