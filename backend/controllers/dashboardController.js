const {PrismaClient}=require('@prisma/client')
const prisma=new PrismaClient

const dashboard=async(req,res)=>{
    try{
        const programLength=await prisma.program.count()
        const devoteesLength=await prisma.user.count()
        const contributionLength=await prisma.devotees.count()
        const contributionAmount=await prisma.devotees.findMany({
            select:{
                contribution:true
            }
        })
        const totalAmount=contributionAmount.reduce((total,value)=>(total+value.contribution),0)
        res.status(200).json([{programLength,devoteesLength,contributionLength,totalAmount}])   
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports={dashboard}