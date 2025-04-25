import React from "react";
import HoverComponent from "./HoverComponent";
import axios, { AxiosError } from "axios";

const Companycard = async ({ token }: { token: string }) => {
  let detailsOfCompany;

  try {
    const response = await axios.get(
      "http://localhost:3000/api/company-api/collective-details/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    detailsOfCompany = response.data.CollectiveObject;

  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
  return (
    <div className="flex gap-5 justify-center items-center">
      <HoverComponent detailsOfCompany={[detailsOfCompany]} />
    </div>
  );
};

export default Companycard;
