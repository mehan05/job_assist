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

export default function WorkSpaceEdit() {
  const { id } = useParams();
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const [category, setCategory] = useState<string[]>([]);
  const [workspaceData, setWorkspaceData] = useState<WorkspaceData>({
    name: "",
    category: [],
    description: "",
    visibility: "",
    inviteMembers: [],
  });

  useEffect(() => {
    getDataForUpdate();
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkspaceData((prev) => ({ ...prev, [name]: value }));
  };

  const getDataForUpdate = async () => {
    const toastId = toast.loading("Fetching Data...");
    try {
      const response = await axios.get(`/api/company/workspace/edit/${id}`);
      if (response.status === 200) {
        toast.success("Data Fetched Successfully", { id: toastId });
        setWorkspaceData(response.data.data);
        setCategory(response.data.data.category);
        setIsPublic(response.data.data.visibility === "Public");
      } else {
        toast.error("Workspace Not Found", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Something went wrong", { id: toastId });
        console.error(error.response?.data);
      }
    }
  };

  const handleAddCategory = (cat: string) => {
    if (!category.includes(cat)) {
      setCategory((prev) => [...prev, cat]);
    } else {
      setCategory(category.filter((item) => item !== cat));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating Workspace...");
    const updatedWorkspace: NewWorkspaceData = {
      name: workspaceData.name,
      category,
      description: workspaceData.description,
      visibility: isPublic,
      inviteMembers: workspaceData.inviteMembers,
    };

    try {
      const response = await axios.put(`/api/company/workspace/edit/${id}`, updatedWorkspace);
      if (response.status === 200) {
        toast.success("Workspace Updated Successfully", { id: toastId });
      } else {
        toast.error("Failed to Update Workspace", { id: toastId });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error("Something went wrong", { id: toastId });
        console.error(error.response?.data);
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <NavBar />
      <form onSubmit={handleSubmit}>
        <div className="ml-10 mr-10 mb-10">
          <h1 className="font-Josefin_Sans text-4xl font-bold">Edit Your Workspace</h1>
          <p className="font-Josefin_Sans text-xl font-semibold">
            Modify your workspace details below.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            <div className="p-5 border rounded-lg shadow-md">
              <label className="block text-lg font-semibold">Workspace Name</label>
              <input
                type="text"
                placeholder="Enter workspace name"
                value={workspaceData.name}
                name="name"
                onChange={handleOnChange}
                className="w-full p-2 mt-2 border rounded-md"
              />
            </div>
            <div className="p-5 border rounded-lg shadow-md">
              <label className="block text-lg font-semibold">Category</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {["Technology", "Marketing", "Design", "Finance", "Healthcare", "Other"].map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    className={`p-2 border rounded-md ${
                      category.includes(cat) ? "bg-[#ad54f0] text-white" : ""
                    }`}
                    onClick={() => handleAddCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-5 border rounded-lg shadow-md col-span-2">
              <label className="block text-lg font-semibold">Description</label>
              <textarea
                placeholder="Describe the workspace purpose"
                value={workspaceData.description}
                name="description"
                onChange={handleOnChange}
                className="w-full p-2 mt-2 border rounded-md"
                rows={4}
              ></textarea>
            </div>
            <div className="p-5 border rounded-lg shadow-md">
              <label className="block text-lg font-semibold">Visibility</label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="visibility"
                    value="Public"
                    className="mr-2"
                    checked={workspaceData.visibility === "Public"}
                    onChange={(e) => {
                      handleOnChange(e);
                      setIsPublic(true);
                    }}
                  />
                  Public
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    name="visibility"
                    value="Private"
                    className="mr-2"
                    checked={workspaceData.visibility === "Private"}
                    onChange={(e) => {
                      handleOnChange(e);
                      setIsPublic(false);
                    }}
                  />
                  Private
                </label>
              </div>
            </div>
            <div className="col-span-2 flex justify-end gap-5">
              <button
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md hover:scale-105"
                type="submit"
              >
                Update Workspace
              </button>
              <button className="px-6 py-2 border rounded-md hover:scale-105" type="button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
