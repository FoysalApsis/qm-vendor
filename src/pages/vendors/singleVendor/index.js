import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React, { useState } from "react";
import PageHeader from "../../../components/layout/pageHeader";
import PageLayout from "../../../components/layout/pageLayout";
import serverAPI from "../../../config/serverAPI";
import uploadlogo from "../../../images/upload.png";
import VendorTabs from "./VendorTabs";
const iconStyles = {
  width: "30px",
  height: "30px",
  marginBottom: "0.7rem",
  cursor: "pointer",
};
const SingleVendor = () => {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("userObj"));
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setData({
        ...data,
        [name]: e.target.files[0],
      });
    } else {
      setData({
        ...data,
        [name]: type === "number" ? parseInt(value) : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await serverAPI
      .put(`update-vendor`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [tags, setTags] = useState(null);
  const tagsOptions = [
    { label: "Vendor", value: "vendor" },
    { label: "Employees", value: "employees" },
  ];

  const handleTagChange = (event,values)=>{
    console.log(values);
  }

  // console.log(data);

  return (
    <>
      {" "}
      <PageLayout />
      <PageHeader title="My Information"></PageHeader>
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
                  value={user.name ? user.name : ""}
                  onChange={handleChange}
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
                  value={user.street ? user.street : ""}
                  onChange={handleChange}
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
                  value={user.phone ? user.phone : ""}
                  onChange={handleChange}
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
                  value={user.street2 ? user.street2 : ""}
                  onChange={handleChange}
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
                  value={user.mobile ? user.mobile : ""}
                  onChange={handleChange}
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
                  value={user.city ? user.city : ""}
                  placeholder="City"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-2 mt-2">
              <select
                id="state"
                name="state"
                className="form-control"
                placeholder="State"
                onChange={handleChange}
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
                  value={user.zip ? user.zip : ""}
                  onChange={handleChange}
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
                  value={user.email ? user.email : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-5 mt-2">
              <select
                id="country_id"
                name="country_id"
                className="form-control"
                placeholder="country"
                onChange={handleChange}
              >
                <option value="" selected disabled>
                  Country
                </option>
                <option value="1">Bangladesh</option>
                <option value="2">India</option>
              </select>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="website">Website Link:</label>
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
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="vat">Tax ID:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="vat"
                  name="vat"
                  value={user.vat ? user.vat : ""}
                  placeholder="e.g. BE0477472701"
                  onChange={handleChange}
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
                  value={user.fax ? user.fax : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1">
              <label htmlFor="contact_no">Customer Number:</label>
            </div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="contact_no"
                  name="contact_no"
                  value={user.contact_no ? user.contact_no : ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-1 mt-2">
              <label htmlFor="tags">Tags:</label>
            </div>
            <div className="col-5 mt-2">
              {/* <select
                id="country_id"
                name="country_id"
                className="form-control"
                placeholder="Tags"
              >
                <option value="" selected disabled>
                  Tags
                </option>
                <option value="tax1">tax1</option>
                <option value="tax2">tax2</option>
              </select> */}

              <Autocomplete
                multiple
                disablePortal
                size="small"
                id="tags-outlined"
                onChange={handleTagChange}
                options={tagsOptions}
                sx={{ width: "500px" }}
                name="tags"
                // isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params}  label="Tags" />
                )}
              />
            </div>
          </div>
        </form>
        <div className="mt-4">
          <VendorTabs
            setData={setData}
            data={data}
            handleChange={handleChange}
          />
        </div>
        <div className="d-flex justify-content-between">
          <div></div>
          <div className="mt-4">
            {" "}
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onSubmit={handleSubmit}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleVendor;
