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
        where:{
            status:'active'
        } })
        res.status(200).send(allProgram)
    }catch(error){
        res.status(400).send(error)
    }
}
const getClosedProgram=async(req,res)=>{
    try{
        const data=await prisma.program.findMany({
            where:{
                status:'close'
            }
        })
        res.status(200).send(data)
    }catch(error){
        res.status(400).send(error)
    }
}
//delete an program
const removeProgram=async(req,res)=>{
    const {id}=req.params
    try{
        const remove=await prisma.program.delete({
            where:{
                id:parseInt(id)
            }
        })
        res.status(200).send(remove)
    }catch(error){
        res.status(400).send(error)
    }
}

// update program

// const updateProgram=async(req,res)=>{
//     const {id}=req.params;
//     const {programName,startTime,endTime,description}=req.body
//     try{
//      const updateData=await prisma.program.update({
//         where:{
//             id:parseInt(id)
//         },
//         data:{
//             programname:programName,
//             startTime:startTime,
//             endTime:endTime,
//             description:description
//         }
//      })
//      res.status(200).send(updateData)
//     }catch(error){
//         res.status(400).send(error)
//     }
// }
const updateProgram = async (req, res) => {
    const { id } = req.params;
    const { programName, startTime, endTime, description } = req.body;
    try {
        const updateData = await prisma.program.update({
            where: {
                id: parseInt(id), // Ensure the ID is parsed as an integer
            },
            data: {
                programname: programName,
                startTime: startTime,
                endTime: endTime,
                description: description,
            },
        });
        res.status(200).send(updateData); // Use 200 for success
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).send({ error: "Failed to update program", details: error });
    }
};

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
              programId:parseInt(programid),
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

// update status in program
const updateStatus=async(req,res)=>{
    const {id}=req.params
    try{
        const updatedata=await prisma.program.update({
            where:{
                id:parseInt(id)
            },
            data:{
                status:'close'
            }
        })
        
        res.status(200).send(updatedata)
    }catch(error){
        res.status(400).send({error:error.message})
    }
}
module.exports={addProgram,getAllProgram,addAmount,getFundDetails,allDevotees,userData,updateStatus
    ,getClosedProgram,removeProgram,updateProgram}