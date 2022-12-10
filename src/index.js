const express= require("express")
const mongoose= require("mongoose")
const app= express()
const route= require("./route.js")

app.use(express.json())

mongoose.connect("mongodb+srv://NishantGautam:Ng123@cluster0.45vj3.mongodb.net/revisionProjectDB",
{
    useNewUrlParser: true
})

.then(()=>console.log("Hello Nishant! MongoDB is successfully connected"))
.catch((err)=> console.log(err))

app.use("/",route)

app.listen(process.env.PORT||3000, function(){
    console.log("Express App is running on port "+ (process.env.PORT||3000))
})