//import mongoose from "mongoose"
import express from "express";
const app = express();

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));

const newSchema= new mongoose.Schema({
  code:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

const collection=mongoose.model("LTSMweb", newSchema)

module.exports=collection
