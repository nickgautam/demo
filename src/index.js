const express= require("express")
const mongoose= require("mongoose")
const route= require("./route.js")

const app= express()

app.use(express.json())

mongoose.connect("mongodb+srv://NishantGautam:Ng123@cluster0.45vj3.mongodb.net/ProjectDB",
{
    useNewUrlParser: true
})

.then(()=> console.log("Hello Nishant! MongoDB is connected"))
.catch((err)=> console.log(err))

app.use("/",route)
// app.get("/add", (req,res)=>{
//     return res.send(req.body)
// })

app.listen(process.env.PORT||3000, function(){
    console.log("Express App is running on port "+ (process.env.PORT||3000))
})