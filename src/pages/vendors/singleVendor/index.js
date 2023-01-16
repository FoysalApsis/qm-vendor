import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import uploadlogo from "../../../images/upload.png";
const iconStyles = {
  width: "30px",
  height: "30px",
  marginBottom: "0.7rem",
  cursor: "pointer",
};
const SingleVendor = () => {
  const [data, setData] = useState(null);

  //* handle Change Data
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type == "file") {
      setData({
        ...data,
        [name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [name]: type == "number" ? parseInt(value) : value,
      });
    }
  };
  return (
    <>
      {" "}
      <PageLayout />
      <PageHeader title="Vendors"></PageHeader>
      <div className="main-container">
        <form>
          <div className="row">
            <div className="col-1">
              <label htmlFor="name">Name:</label>
            </div>
            <div className="col-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5">
              <div className="image-upload">
                <label htmlFor="file-input">
                  <img
                    src={uploadlogo}
                    alt="uploadlogo"
                    className="mb-4 "
                    style={iconStyles}
                  />
                </label>
                <input
                  id="file-input"
                  type="file"
                  name="profile"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-1">
              <label htmlFor="address">Address:</label>
            </div>
            <div className="col-5">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                />
              </div>
            </div>
            <div className="col-1">
              <label htmlFor="phone">Phone:</label>
            </div>
            <div className="col-5">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="street2"
                  name="street2"
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="phone">Mobile:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                />
              </div>
            </div>
            <div className="col-1 mt-2"></div>
            <div className="col-2 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="City"
                />
              </div>
            </div>
            <div className="col-2 mt-2">
              <select
                id="state"
                name="state"
                className="form-control"
                placeholder="State"
              >
                <option value="" selected disabled>
                  State
                </option>
                <option value="Delhi">Delhi</option>
                <option value="GOA">GOA</option>
              </select>
            </div>
            <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder="ZIP"
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="phone">Email:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5 mt-2">
              <select
                id="country"
                name="country"
                className="form-control"
                placeholder="Country"
              >
                <option value="" selected disabled>
                  Country
                </option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
              </select>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="phone">Website Link:</label>
            </div>
            <div className="col-5 mt-2">
              {" "}
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  name="website"
                  placeholder="e.g. https://www.odoo.com"
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="tax">Tax ID:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="tex"
                  name="tax"
                  placeholder="e.g. BE0477472701"
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="fax">Fax Number:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  name="fax"
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="customer_number"
                  name="customer_number"
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="tags">tags:</label>
            </div>
            <div className="col-5 mt-2">
              <select
                id="tags"
                name="tags"
                className="form-control"
                placeholder="Tags"
              >
                <option value="" selected disabled>
                  Tags
                </option>
                <option value="tax1">tax1</option>
                <option value="tax2">tax2</option>
              </select>
            </div>
          </div>
        </form>

        <div className="d-flex justify-content-between">
          <div></div>
          <div className="mt-4">
            {" "}
            <Button type="submit" color="secondary" variant="contained">
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVendor;
