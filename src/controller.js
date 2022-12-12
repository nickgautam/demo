const mongoose= require("mongoose")
const model= require("./model.js")


exports.createInventory= async (req,res)=>{
    try{
        const data= req.body
        // console.log(data)
        let {productId, quantity}=data   
         if(Object.keys(data).length==0)return res.status(400).send({status:false, msg:"Please mention some data"})
     
      if(Array.isArray(data)){
       for(let i=0; i<data.length; i++){
        if(!data[i].productId)return res.status(400).send({status:false, msg:"Product Id is required"})
        if(!data[i].quantity)return res.status(400).send({status:false, msg:"quantity is required"})
        }
    }

    else{
         if(!productId)return res.status(400).send({status:false, msg:"Product Id is required"})
            if(!quantity)return res.status(400).send({status:false, msg:"quantity is required"})
    }
        var saveData= await model.create(data)
       
    
    return res.status(201).send({status:true, msg:"Inventory data is successfully created",data: saveData})
    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}



exports.UpdateInventory= async (req, res)=>{
    try{
        const data= req.body
        // console.log(data)
     
        if(data.length==0) return res.status(400).send({status:false, msg:"Please mention some data"})
        if(Object.keys(data).length==0)return res.status(400).send({status:false, msg:"Please mention some data"})

        let response=[]
        let output=[]
        if(Array.isArray(data)){
            for(let i=0; i<data.length; i++){
                productId= data[i].productId
              var alreadyExistData= await model.findOne({productId:productId})
            //   console.log(alreadyExistData)
              if(!alreadyExistData)return res.status(404).send({status:false, msg:`No data found with this id, ${productId}`})
              response.push(alreadyExistData)
            //   console.log(response)
              
              if(data[i].operation=="add"){
                if(data[i].quantity>0){
                    response[i].quantity+= data[i].quantity
                }
                else return res.status(400).send({status:false, msg:"quantity for adding should be greater than 0"})
            }
            if(data[i].operation=="subtract"){
                if(response[i].quantity>=data[i].quantity){
                    response[i].quantity= response[i].quantity-data[i].quantity
                }
                else return res.status(400).send({status:false, msg:"quantity for subtracting should not be greater than existing quantity"})
            }
            var updateData = await model.findOneAndUpdate({productId:productId},{$set:{quantity:response[i].quantity}},{new:true,upsert:true})
            output.push(updateData)
         }
    }
    else{
        let {productId, quantity,operation}=data 
        var alreadyExistData= await model.findOne({productId:productId})
        if(!alreadyExistData)return res.status(404).send({status:false, msg:`No data found with this id, ${productId}`})
        if(operation=="add"){
            if(quantity>0){
                alreadyExistData.quantity+= quantity
            }
            else return res.status(400).send({status:false, msg:"quantity for adding should be greater than 0"})
        }
        if(operation=="subtract"){
            if(alreadyExistData.quantity>=quantity){
                alreadyExistData.quantity-=quantity
            }
            else return res.status(400).send({status:false, msg:"quantity for subtracting should not be greater than existing quantity"})
        }
        var updateData = await model.findOneAndUpdate({productId:productId},{$set:{quantity:alreadyExistData.quantity}},{new:true,upsert:true})
        output.push(updateData)
     }
    
    return res.status(200).send({status:true, msg:"Inventory data is successfully updated",data: output})
    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}


exports.getApi =async (req, res)=>{
    const saveData= await model.find()
    return res.status(200).send({status:true, msg:"All product list",data: saveData})
}
