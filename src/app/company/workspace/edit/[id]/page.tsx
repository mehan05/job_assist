"use client";
import { NavBar } from "@/components/NavBar";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface WorkspaceData {
  name: string;
  category: string[];
  description: string;
  visibility: string;
  inviteMembers: string[];
}
interface NewWorkspaceData {
  name: string;
  category: string[];
  description: string;
  visibility: boolean;
  inviteMembers: string[];
}
function WorkSpaceEdit() {
  const params = useParams();
  const id = params.id;
  const [loading, setLoading] = useState(true);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [category, setCategory] = useState<string[]>([]);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    name: "",
    category: [],
    description: "",
    visibility: "",
    inviteMembers: [],
  });

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setWorkspaceData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (workspaceData) {
      setLoading(false);
    }
    if (id) {
      getDataForEdit(id.toString());
    } else {
      setLoading(false);
      toast.error("ID not found");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const getDataForEdit = async (id: string) => {
    const toastId = toast.loading("Fetching Data...");
    try {
      const response = await axios.get(
        "https://job-assist.vercel.app/api/company-api/workspace/edit/" + id
      );
      if (response.status == 200) {
        toast.success("Data Fetched Successfully", { id: toastId });
        setWorkspaceData(() => {
          return {
            name: response.data.data.name,
            category: response.data.data.category,
            description: response.data.data.description,
            visibility:
              response.data.data.isPublic == true ? "Public" : "Private",
            inviteMembers: response.data.data.members,
          };
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };

  const handleAddCategory = (cat: string) => {
    if (!category.includes(cat)) {
      setCategory((prev) => [...prev, cat]);
    }
    if (category.includes(cat)) {
      const index = category.indexOf(cat);
      category.splice(index, 1);
      setCategory([...category]);
    }
  };
  useEffect(() => {
    const arr2 = category;
    const filteredArr = arr2.filter(
      (item) => !workspaceData.category.includes(item)
    );
    workspaceData.category.push(...filteredArr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let toastId;
    setIsPublic(workspaceData.visibility === "Public");
    const newWorkspace: NewWorkspaceData = {
      name: workspaceData.name,
      category: workspaceData.category,
      description: workspaceData.description,
      visibility: isPublic,
      inviteMembers: workspaceData.inviteMembers,
    };
    try {
      toastId = toast.loading("Craeting Workspace...");
      const response = await axios.post(
        "https://job-assist.vercel.app/api/company/workspace",
        { ...newWorkspace }
      );
      if (response.status == 200) {
        toast.success("Workspace Created Successfully", { id: toastId });
      } else if (response.status == 401) {
        toast.error("Invalid Data", { id: toastId });
      } else if (response.status == 402) {
        toast.error("Invalid User", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Something went wrong", { id: toastId });
        console.log(error);
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <NavBar />
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="font-Josefin_Sans text-2xl font-bold">Loading...</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className=" ml-10 mr-10 mb-10">
            <div className="h-48 w-auto max-w-3/4 flex items-center">
              <div className="w-full">
                <h1 className="font-Josefin_Sans text-4xl font-bold">
                  Edit Your Workspace
                </h1>
                <p className="font-Josefin_Sans text-xl font-semibold ">
                  Collaborate, innovate, and grow with your team in a dedicated
                  space.
                </p>
              </div>
            </div>
            <div className="">
              <h2 className="font-Josefin_Sans text-2xl font-bold">
                Workspace Setup
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4    ">
                <div className="p-5 border rounded-lg shadow-md">
                  <label className="block text-lg font-semibold ">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter workspace  name"
                    value={workspaceData.name ? workspaceData.name : ""}
                    name="name"
                    onChange={handleOnChange}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
                <div className="p-5 border rounded-lg shadow-md">
                  <label className="block text-lg font-semibold">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      type="button"
                      className={`${
                        (category.includes("Technology") ||
                          workspaceData.category?.includes("Technology")) &&
                        "bg-[#ad54f0]  text-white"
                      }  hover:scale-105 p-2 border rounded-md`}
                      onClick={() => handleAddCategory("Technology")}
                    >
                      Technology
                    </button>
                    <button
                      type="button"
                      className={`${
                        (category.includes("Marketing") ||
                          workspaceData.category?.includes("Marketing")) &&
                        "bg-[#ad54f0]  text-white"
                      }  p-2 border hover:scale-105 rounded-md`}
                      onClick={() => handleAddCategory("Marketing")}
                    >
                      Marketing
                    </button>
                    <button
                      type="button"
                      className={`${
                        (category.includes("Design") ||
                          workspaceData.category?.includes("Design")) &&
                        "bg-[#ad54f0]  text-white"
                      }  p-2 border hover:scale-105 rounded-md`}
                      onClick={() => handleAddCategory("Design")}
                    >
                      Design
                    </button>
                    <button
                      type="button"
                      className={`${
                        (category.includes("Finance") ||
                          workspaceData.category?.includes("Finance")) &&
                        "bg-[#ad54f0]  text-white"
                      }  p-2 border hover:scale-105 rounded-md`}
                      onClick={() => handleAddCategory("Finance")}
                    >
                      Finance
                    </button>
                    <button
                      type="button"
                      className={`${
                        (category.includes("Healthcare") ||
                          workspaceData.category?.includes("Healthcare")) &&
                        "bg-[#ad54f0]  text-white"
                      }  p-2 border hover:scale-105 rounded-md`}
                      onClick={() => handleAddCategory("Healthcare")}
                    >
                      Healthcare
                    </button>
                    <button
                      type="button"
                      className={`${
                        (category.includes("Other") ||
                          workspaceData.category?.includes("Other")) &&
                        "bg-[#ad54f0]  text-white"
                      }  p-2 border hover:scale-105 rounded-md`}
                      onClick={() => handleAddCategory("Other")}
                    >
                      Other
                    </button>
                  </div>
                </div>
                <div className="p-5 border rounded-lg shadow-md col-span-2">
                  <label className="block text-lg font-semibold">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe the workspace purpose"
                    value={
                      workspaceData.description ? workspaceData.description : ""
                    }
                    name="description"
                    onChange={handleOnChange}
                    className="w-full p-2 mt-2 border rounded-md"
                    rows={4}
                  ></textarea>
                </div>

                <div className="p-5 border rounded-lg shadow-md">
                  <label className="block text-lg font-semibold">
                    Visibility
                  </label>
                  <div className="mt-2">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="visibility"
                        value="Public"
                        className="mr-2"
                        checked={workspaceData?.visibility === "Public"}
                        onChange={handleOnChange}
                      />{" "}
                      Public
                    </label>
                    <label className="inline-flex items-center ml-6 opacity-50">
                      <input
                        type="radio"
                        name="visibility"
                        className="mr-2"
                        value="Private"
                        checked={workspaceData?.visibility === "Private"}
                        onChange={handleOnChange}
                      />{" "}
                      Private
                    </label>
                  </div>
                </div>
                {workspaceData.visibility == "Private" && (
                  <div className="p-5 border rounded-lg shadow-md ">
                    <label className="block text-lg font-semibold">
                      Invite Members (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email/usernames"
                      className="w-full p-2 mt-2 border rounded-md"
                    />
                  </div>
                )}
                <div className="col-span-2 flex justify-end gap-5 ">
                  <button
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md hover:scale-105"
                    type="submit"
                  >
                    Create Workspace
                  </button>
                  <button className="px-6 py-2 border rounded-md hover:scale-105">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default WorkSpaceEdit;
