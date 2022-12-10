const mongoose= require("mongoose")

const InventorySchema= new mongoose.Schema({
    productId:{
        type: Number,
        required:true
    },
    quantity:{
        type: Number,
        required: true
    }
},{timestamps:true})


module.exports= mongoose.model("Inventory", InventorySchema)