import { NavBar } from "@/components/NavBar";

export default function WorkspaceDetails() {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="mt-10 mx-10">
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Workspace Details
        </h1>

        <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10">
          <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
            Workspace Information
          </h2>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Workspace Name:</span> [Dynamic Workspace Name]
          </p>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Description:</span> [Detailed Workspace Description]
          </p>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Category:</span> [Category 1], [Category 2], ...
          </p>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Privacy:</span> [Public/Private]
          </p>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Created By:</span> [Creator's Name]
          </p>
          <p className="font-Josefin_Sans">
            <span className="font-bold">Created On:</span> [Date]
          </p>
        </div>

      

        <div className="p-6 border-2 border-purple-600 rounded-lg shadow-md mb-10">
          <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">Request to Join</h2>
          <textarea
            placeholder="Write a short message explaining why you'd like to join this workspace. (Max 250 characters)"
            className="w-full h-28 border rounded-md p-3 mb-4"
          ></textarea>
          <input
            type="text"
            placeholder="Relevant Skills (e.g., Skill 1, Skill 2)"
            className="w-full border rounded-md p-3 mb-4"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 text-white rounded-md">
            Submit Request
          </button>
        </div>

            </div>

    </div>
  );
}
