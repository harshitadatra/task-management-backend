const express = require('express');
const PORT =3000

const app = express();
const dotenv = require("dotenv");
// const cors = require("cors");
const connectDB = require("./db")
const authRoutes = require("./routes/auth.router");
const taskRoutes = require("./routes/task.router")

dotenv.config()
//db conection
connectDB();
app.use(express.json());

app.use("/auth",authRoutes)
// app.use("/task",taskRoutes)
app.use('/api/tasks', taskRoutes); // No need to apply auth here

app.listen(PORT,()=>
{
    console.log(`app is listening on port ${PORT}`)
})