const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose
  //   .connect(`${process.env.DATABASE}`, {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: true,
  //   })
  .connect(
    "mongodb+srv://goldentalos:Dong20070922@cluster0.pb9a6bd.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to DB"));

mongoose.connection.on("error", (err) => {
  console.log(`${err.message}`);
});
