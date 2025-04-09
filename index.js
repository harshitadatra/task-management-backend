const express = require('express');
const PORT =3000

const app = express();
const dotenv = require("dotenv");
// const cors = require("cors");
const connectDB = require("./db")
const authRoutes = require("./routes/auth.router")

dotenv.config()
//db conection
connectDB();
app.use(express.json());

app.use("/auth",authRoutes)
app.listen(PORT,()=>
{
    console.log(`app is listening on port ${PORT}`)
})