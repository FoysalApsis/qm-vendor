import React from "react";
import { Link } from "react-router-dom";

import NotFoundSvg from "../../images/page_not_found.svg";
import PageHeader from "./pageHeader";
import PageLayout from "./pageLayout";

const PageNotFound = () => {
  return (
    <>
      <PageLayout />
      <PageHeader title="404 - Page Not Found" />
      <div className="main-container d-flex flex-column justify-content-center align-items-center">
        <img
          src={NotFoundSvg}
          alt="404 - Page Not Found"
          style={{ width: "50%", height: "80%" }}
        />
        <Link
          to="/"
          className="button-prime mt-5"
          style={{ textDecoration: "none" }}
        >
          Back To Dashboard{" "}
          <svg
            width="18"
            height="18"
            viewBox="0 0 34 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ms-2 mb-1"
          >
            <path
              d="M3.21042 0.667939H11.6999C13.1978 0.667939 14.5298 2.01168 14.5298 3.54316V12.1537C14.5298 13.6852 13.1978 15.0289 11.6999 15.0289H3.21042C1.697 15.0289 0.380585 13.885 0.380585 12.1537V3.54316C0.380585 2.01168 1.71258 0.667939 3.21042 0.667939Z"
              stroke="white"
              strokeWidth="0.807459"
            />
            <path
              d="M19.482 3.32783C19.482 1.79634 20.814 0.452607 22.3118 0.452607H30.8013C32.2992 0.452607 33.6312 1.79634 33.6312 3.32783V11.9384C33.6312 13.4699 32.2992 14.8136 30.8013 14.8136H22.3118C20.814 14.8136 19.482 13.4699 19.482 11.9384V3.32783ZM0.380585 22.7015C0.380585 21.1701 1.71258 19.8263 3.21042 19.8263H11.6999C13.1978 19.8263 14.5298 21.1701 14.5298 22.7015V31.3121C14.5298 32.8436 13.1978 34.1873 11.6999 34.1873H3.21042C1.71258 34.1873 0.380585 32.8436 0.380585 31.3121V22.7015ZM19.482 22.7015C19.482 21.1701 20.814 19.8263 22.3118 19.8263H30.8013C32.2992 19.8263 33.6312 21.1701 33.6312 22.7015V31.3121C33.6312 32.8436 32.2992 34.1873 30.8013 34.1873H22.3118C20.814 34.1873 19.482 32.8436 19.482 31.3121V22.7015Z"
              stroke="white"
              strokeWidth="0.807459"
            />
          </svg>
        </Link>
      </div>
    </>
  );
};

export default PageNotFound;
