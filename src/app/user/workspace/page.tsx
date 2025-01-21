import { NavBar } from "@/components/NavBar";

export default function BrowseWorkspaces() {
  return (
    <div className="overflow-hidden">
      <NavBar />
      <div className="mt-10 mx-10">
        <h1 className="font-Josefin_Sans text-4xl font-bold mb-5">
          Browse Workspaces
        </h1>
        
        <div className="p-6   border-2 border-purple-600  rounded-lg shadow-md  mb-10">
          <h2 className="font-Josefin_Sans text-2xl font-semibold mb-4">
            Search and Filter
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter workspace name..."
              className="p-1 h-12 min-h-12  border rounded-md w-full md:w-1/2"
            />
            <select className="p-3 h-12 min-h-12  border rounded-md w-full md:w-1/4">
              <option hidden>Filter by Category</option>
              <option>Category 1</option>
              <option>Category 2</option>
              <option>Category 3</option>
            </select>
            <select className="p-3 border h-12 min-h-12 rounded-md w-full md:w-1/4">
              <option hidden>Privacy: Public/Private</option>
              <option>Public</option>
              <option>Private</option>
            </select>
            <button className="px-6 h-12 min-h-12  py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-105 text-white rounded-md">
              Search
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-5 border-2 border-purple-600 rounded-xl shadow-md ">
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl font-Josefin_Sans font-semibold">
                Workspace Name A
              </h3>
              <hr className="text-purple-600 "/>
              <p className="font-Josefin_Sans">
                <span className="font-bold">Description: </span>Short
                description of Workspace A.
              </p>
              <p className="font-Josefin_Sans">
                <span className="font-bold">Category: </span> Category 1,
                Category 2
              </p>
              <p className="font-Josefin_Sans">
                <span className="font-bold">Privacy: </span>Public
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
