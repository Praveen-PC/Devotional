const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");


const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient

const userRouter = require("./routes/userRouter");
const programRouter=require('./routes/programRouter')
const dashboardRouter=require('./routes/dashboardRouter')

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




app.get('/userdata/:id', async (req, res) => {
  const id = req.params.id; // Fetch `id` from request parameters

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: parseInt(id), // Convert `id` to integer
      },
      include: {
        devotees: true, // Include related devotees data
      },
    });

    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(data); // Respond with the user data
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});






const PORT = process.env.PORT || 8000;







app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
