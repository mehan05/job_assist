import React from "react";
import HoverComponent from "./HoverComponent";
import axios, { AxiosError } from "axios";

const Card = async ({ token }: { token: string }) => {
  let detailsOfUser;
  try {
    const response = await axios.get(
      "https://job-assist.vercel.app/api/user-api/dashboard/collective-details/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    detailsOfUser = response.data.userDetails;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex gap-5 justify-center items-center ">
      <HoverComponent detailsOfUser={detailsOfUser} />
    </div>
  );
};

export default Card;
