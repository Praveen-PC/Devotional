const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");


const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient

const userRouter = require("./routes/userRouter");
const programRouter=require('./routes/programRouter')
const dashboardRouter=require('./routes/dashboardRouter')
const reportRouter=require('./routes/reportRouter')

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET','POST','PUT','DELETE'],
  })
);
app.get("/", (req, res) => {
  res.send("hello from backend");
});

app.use("/api", userRouter);
app.use('/api',programRouter)
app.use('/api',dashboardRouter)
app.use('/api',reportRouter)





const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
