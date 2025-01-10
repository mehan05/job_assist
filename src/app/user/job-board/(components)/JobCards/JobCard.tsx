import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bookmark } from 'lucide-react'

interface JobTag {
  label: string
}

interface JobListing {
  date: string
  company: string
  title: string
  tags: JobTag[]
  salary: string
  location: string
}

export default function JobCard() {
  const job: JobListing = {
    date: "20 May, 2023",
    company: "Amazon",
    title: "Senior UI/UX Designer",
    tags: [
      { label: "Part time" },
      { label: "Senior level" },
      { label: "Distant" },
      { label: "Project work" },
    ],
    salary: "$250/hr",
    location: "San Francisco, CA",
  }

  return (
    <Card className="max-w-sm   border-2  border-none hover:cursor-pointer hover:scale-105 transition-all hover:border-2 hover:border-white ">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm text-white">{job.date}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8 bg-[#9574e2]">
            <Bookmark className="h-4 w-4  hover:border-2 hover:border-[#9574e2]" />
          </Button>
        </div>

        <div className="space-y-4 ">
          <div className="flex items-center gap-2 border-[#9574e2] "> 
            <div className=" rounded-full w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">a</span>
            </div>
            <span className="font-medium">{job.company}</span>
          </div>

          <h3 className="text-xl font-semibold">{job.title}</h3>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#9574e2]  text-white rounded-full text-sm"
              >
                {tag.label}
              </span>
            ))}
          </div>

        </div>
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="font-semibold text-white">{job.salary}</div>
              <div className="text-sm text-gray-600">{job.location}</div>
            </div>
            <Button variant="secondary" className="bg-[#9574e2] text-white hover:bg-black/90 hover:border-2 hover:border-[#9574e2]">
              Details
            </Button>
          </div>
      </CardContent>
    </Card>
  )
}

