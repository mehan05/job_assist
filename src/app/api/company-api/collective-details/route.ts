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

interface CollectiveDetails {
  totalWorkspacesCount: number;
  totalMembersCount: number;
  totalJobBoardsCount: number;
  totalJobApplicationCount: number;
}


export async function GET(req: NextRequest) {
  try {
    console.log("requet hit");
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ message: 'No token provided' }, { status: 401 })
    }

    const userId = jwt.verify(token, process.env.SECRET_KEY as string) as TokenPayLoad

    const [JobAndWorkspaceCount,MembersAndJobBoardsCount] = await prisma.$transaction([
         prisma.user.findUnique({
          where: {
            id:userId.payload.id
          },
          select:{
            _count:{
              select:{
                jobApplications:true,
                workspace:true
              }
            }
          }
        }),

      prisma.workSpace.findMany({
          select:{
            _count:{
              select:{
                members:true,
                jobBoards:true,

              }
              
            }
          }
        })

       ])

    // if(!collectiveDetails)
    // {
    //   return NextResponse.json({ message: 'Data not found' }, { status: 404 })
    // }

    // return NextResponse.json({ collectiveDetails }, { status: 200 })
    const arr = [];
    for(const i of MembersAndJobBoardsCount)
    {
      arr.push(i);
    }
    if (JobAndWorkspaceCount && arr ) {
      const CollectiveObject:CollectiveDetails = {
        totalWorkspacesCount: JobAndWorkspaceCount._count.workspace,
        totalMembersCount: arr[0]._count.members,
        totalJobBoardsCount: arr[0]._count.jobBoards,
        totalJobApplicationCount: JobAndWorkspaceCount._count.jobApplications
      };
      console.log("printign the object of data:",CollectiveObject);
     return NextResponse.json({ CollectiveObject }, { status: 200 });
   } else {
     console.log("No data found");
     return NextResponse.json({ message: 'No data found' }, { status: 404 });
   }
  

  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Error fetching user details' }, { status: 500 })
  }
}
