interface JobApplication {
  id: string;
  title: string;
  status: string;
  jobId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export default function MyApplications({
  applications,
}: {
  applications: JobApplication[];
}) {
  return (
    <div className="overflow-hidden  ">
      <div className=" ml-10 mr-10">
        <div className="h-64 w-auto max-w-3/4 flex items-center text-center">
          <div className="w-full">
            <h1 className="font-Josefin_Sans text-4xl font-bold">
              Your Job Applications
            </h1>
            <br />
            <p className="font-Josefin_Sans text-xl font-semibold mb-3">
              View and track the status of all the jobs you&apos;ve applied to.
            </p>
          </div>
        </div>

        <div className="">
          <div>
            <h1 className="font-Josefin_Sans text-2xl font-bold justify-center">
              Your Applications
            </h1>
          </div>

          <div className="">
            <table className="w-auto min-w-full table-auto border-collapse text-center">
              <thead className="text-center">
                <tr>
                  <th className=" px-4 py-2 border-b ">Job Title</th>
                  <th className=" px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Date Applied</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{application.title}</td>
                    <td
                      className={`px-4 py-2 border-b ${
                        application.status === "Under Review"
                          ? "text-yellow-500"
                          : application.status === "Rejected"
                            ? "text-red-500"
                            : application.status === "Interviewing"
                              ? "text-blue-500"
                              : "text-green-500"
                      }`}
                    >
                      {application.status}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
