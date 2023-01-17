import React from "react";

const InvoiceAddress = (props) => {
  const { data, setData, handleChange } = props;
  return (
    <>
      <div className="row mt-3">
        <div className="col-2">
          <label htmlFor="name">Contact Name:</label>
        </div>
        <div className="col-5">
          <input
            type="text"
            className="form-control form-control-sm"
            id="name"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="col-1">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control form-control-sm"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 mt-2">
          <label htmlFor="address">Address:</label>
        </div>
        <div className="col-5 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="street"
            name="street"
            onChange={handleChange}
          />
        </div>
        <div className="col-1 mt-2">
          <label htmlFor="phone">Phone:</label>
        </div>
        <div className="col-4 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="phone"
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 mt-2">
          <label htmlFor=""></label>
        </div>
        <div className="col-5 mt-2">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id="street2"
              name="street2"
              //   value={user.street2 ? user.street2 : ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-1 mt-2">
          <label htmlFor="mobile">Mobile:</label>
        </div>
        <div className="col-4 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="mobile"
            name="mobile"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 mt-2"></div>
        <div className="col-2 mt-2">
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-sm"
              id="city"
              name="city"
              //   value={user.city ? user.city : ""}
              placeholder="City"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-2 mt-2">
          <select
            id="state"
            name="state"
            className="form-control form-control-sm"
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
          <div className="form-group ">
            <input
              type="text"
              className="form-control form-control-sm"
              id="zip"
              name="zip"
              placeholder="ZIP"
              //   value={user.zip ? user.zip : ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-1"></div>
        <div className="col-4 mt-2"></div>
        <div className="col-2 mt-2">
          <label htmlFor=""></label>
        </div>
        <div className="col-5 mt-2">
          {" "}
          <select
            id="country_id"
            name="country_id"
            className="form-control form-control-sm"
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
        <div className="col-1"></div>
        <div className="col-4 mt-2"></div>
        <div className="col-2 mt-2">
          <label htmlFor="notes">Notes:</label>
        </div>
        <div className="col-5 mt-2">
          <textarea
            type="text"
            className="form-control form-control-sm"
            id="notes"
            name="notes"
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default InvoiceAddress;
