const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const addUser = async (req, res) => {
  const { username, phone, address, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, phone, address, password: hashedPassword, role },
    });
    res.status(200).send(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { phoneNo, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { phone: phoneNo },
    });
    if (!user) {
      return res.status(400).send("User Not Found");
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.status(400).send("incorrect password");
    }
    const token = jwt.sign(
      {id:user.id, userName: user.username, userRole: user.role, phone: user.phone },
      process.env.jwt_secert_key,
      { expiresIn: "1d" }
    );
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);

    
  }
};
module.exports = { addUser, loginUser };
