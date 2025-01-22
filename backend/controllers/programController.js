const {PrismaClient}=require('@prisma/client')
const { use } = require('../routes/userRouter')
const prisma=new PrismaClient()


const addProgram=async(req,res)=>{
    const { programName, startTime,endTime,description}=req.body
    try{
    const newProgram=await prisma.program.create({
        data:{
            programname :programName, 
            description :description,  
            startTime: new Date(startTime), 
            endTime: new Date(endTime),        
            status :'active'
        }
       
    })
    res.status(200).send(newProgram)
    }catch(error){
        res.status(400).send(error)
    }
}

const getAllProgram=async(req,res)=>{
    try{
        const allProgram=await prisma.program.findMany({   
            include: {
                devotees: true,
                users: true,
              },
         })
        res.status(200).send(allProgram)
    }catch(error){
        res.status(400).send(error)
    }
}


const userData=async(req,res)=>{
    const {phoneNo}=req.params;
    console.log(phoneNo)
    try{
        const userdata=await prisma.user.findUnique({
            where:{
                phone:phoneNo
            }
        })

        res.status(200).send(userdata)

    }catch(error){
        res.status(400).send(error)
    }
}

const addAmount=async(req,res)=>{
    const {userid,name,amount,programid}=req.body
    console.log(userid,name,amount,programid)
    try{
        const addFund = await prisma.devotees.create({
            data: {
              name: name,
              contribution: parseInt(amount),
              userId: userid,
              programId: programid,
            }
          });
        res.status(200).send(addFund)
    }catch(error){
        res.status(400).send(error)  
    }
}


const getFundDetails=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        const allFundDetails=await prisma.devotees.findMany({
            where:{
                programId:parseInt(id)
            }
        })
     res.status(200).send(allFundDetails)
    }catch(error){
        res.status(400).send(error)
    }
}



const allDevotees=async(req,res)=>{
    try{
        const usersWithContributions = await prisma.user.findMany({
            include: {
              devotees: {
                include: {
                  program: true,  
                },
              },
            },
          });  
       res.status(200).send(usersWithContributions)

    }catch(error){
        res.status(400).send(error)
    }
}
module.exports={addProgram,getAllProgram,addAmount,getFundDetails,allDevotees,userData}