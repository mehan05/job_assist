import { APPLICATION_STATUS } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import jwt from "jsonwebtoken"

interface TokenPayLoad {
  payload: {
    email: string,
    id: string,
    role: string
  },
  exp: number;
  iat: number;
  nbf: number
}

const JobDetails = [
  {
    description: "Jobs Applied",
    status: "APPLIED" 
  },
  {
    description: "Jobs Rejected",
    status: "REJECTED"
  },
  {
    description: "Job Application Under Review",
    status: "PENDING"
  },
  {
    description: "Jobs Selected",
    status: "ACCEPTED"
  }
];

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    const userId = jwt.verify(token, process.env.SECRET_KEY as string) as TokenPayLoad

    const statusCounts: { [key: string]: number } = {}

    // Fetch count for each status
    for (const job of JobDetails) {
      const count = await prisma.jobApplication.count({
        where: {
          userId: userId.payload.id,
          status: job.status as APPLICATION_STATUS,
        },
      })
      statusCounts[job.status] = count
    }

    // Format the response
    const formattedDetails = JobDetails.map((job) => {
      return {
        description: job.description,
        count: statusCounts[job.status] || 0,
      }
    })

    return NextResponse.json({ userDetails: formattedDetails })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching user details' }, { status: 500 })
  }
}
