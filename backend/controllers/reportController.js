const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const allReports = async (req, res) => {
    const { startDate, endDate } = req.body;

    try {
        const adjustedEndDate = new Date(endDate);
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1); 

        const reportData = await prisma.$queryRaw`
            SELECT 
                d.programId,
                d.userId,
                d.contribution,
                d.createdAt,
                p.programname,
                p.startTime,
                u.username,
                u.phone
            FROM devotees d
            JOIN program p ON d.programId = p.id
            JOIN user u ON d.userId = u.id
            WHERE d.createdAt >= ${new Date(startDate)} 
              AND d.createdAt <= ${adjustedEndDate}
            GROUP BY 
                d.programId, d.userId, d.contribution, d.createdAt, 
                p.programname, p.startTime, u.username, u.phone;
        `;

        res.status(200).json(reportData);
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Failed to fetch reports", error: error.message });
    }
};

  
  
module.exports = { allReports };
