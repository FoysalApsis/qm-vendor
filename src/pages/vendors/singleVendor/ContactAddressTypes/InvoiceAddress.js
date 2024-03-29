import React from "react";

const InvoiceAddress = (props) => {
  const {
    data,
    setData,
    handleChange,
    handleChildChange,
    countries,
    states,
    childData,
  } = props;
  return (
    <>
     <div className="row mt-3">
        <div className="row col-6">
          <div className="col-12 segoe-bold">
            <label htmlFor="name">Contact Name:</label>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              name="name"
              onChange={handleChildChange}
              value={childData?.name || ""}
            />
          </div>
          <div className="col-12 segoe-bold mt-2">
            <label htmlFor="address">Address:</label>
          </div>
          <div className="col-12 mt-2">
            <input
              type="text"
              className="form-control form-control-sm"
              id="street"
              name="street"
              onChange={handleChildChange}
              value={childData?.street || ""}
            />
          </div>
          <div className="col-12 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-sm"
                id="street2"
                name="street2"
                //   value={user.street2 ? user.street2 : ""}
                onChange={handleChildChange}
                value={childData?.street2 || ""}
              />
            </div>
          </div>
          <div className="col-6 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-sm"
                id="city"
                name="city"
                //   value={user.city ? user.city : ""}
                placeholder="City"
                value={childData?.city || ""}
                onChange={handleChildChange}
              />
            </div>
          </div>
          <div className="col-6 mt-2">
            <div className="form-group ">
              <input
                type="text"
                className="form-control form-control-sm"
                id="zip"
                name="zip"
                placeholder="ZIP"
                value={childData?.zip || ""}
                //   value={user.zip ? user.zip : ""}
                onChange={handleChildChange}
              />
            </div>
          </div>
        </div>
        <div className="row col-6">
          <div className="col-12 segoe-bold">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm"
              id="email"
              name="email"
              onChange={handleChildChange}
              value={childData?.email || ""}
            />
          </div>
          <div className="col-12 mt-2 segoe-bold">
            <label htmlFor="phone">Phone:</label>
          </div>
          <div className="col-12 ">
            <input
              type="text"
              className="form-control form-control-sm"
              id="phone"
              name="phone"
              onChange={handleChildChange}
              value={childData?.phone || ""}
            />
          </div>
          <div className="col-12 mt-2 segoe-bold">
            <label htmlFor="mobile">Mobile:</label>
          </div>
          <div className="col-12 ">
            <input
              type="text"
              className="form-control form-control-sm"
              id="mobile"
              name="mobile"
              value={childData?.mobile || ""}
              onChange={handleChildChange}
            />
          </div>
        </div>

        <div className="row col-6">
          <div className="col-6 mt-2">
            <select
              id="state_id"
              name="state_id"
              className="form-control form-control-sm"
              placeholder="State"
              value={childData?.state || ""}
              onChange={handleChildChange}
            >
              <option value="" disabled>
                State
              </option>
              {states?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 mt-2">
            {" "}
            <select
              id="country_id"
              name="country_id"
              className="form-control form-control-sm"
              placeholder="country"
              value={childData?.country_id || ""}
              onChange={handleChildChange}
            >
              <option value="" disabled>
                Country
              </option>
              {countries?.map((item, index) => (
                <option value={item?.id} key={index}>
                  {item?.label}
                </option>
              ))}
            </select>
          </div>
          
        </div>

        <div className="row col-12"><div className="col-12 mt-2 segoe-bold">
          <label htmlFor="notes">Notes:</label>
        </div>
        <div className="col-12 mt-2">
          <textarea
            type="text"
            className="form-control form-control-sm"
            id="notes"
            name="notes"
            value={childData?.notes || ""}
            onChange={handleChildChange}
          />
        </div></div>

        {/* <div className="col-2 mt-2">
          <label htmlFor=""></label>
        </div> */}

        {/* <div className="col-1"></div>
        <div className="col-4 mt-2"></div>
        <div className="col-2 mt-2">
          <label htmlFor=""></label>
        </div> */}

        
      </div>
      {/* <div className="row mt-3">
        <div className="row col-6">
          <div className="col-12">
            <label htmlFor="name">Contact Name:</label>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control form-control-sm"
              id="name"
              name="name"
              onChange={handleChildChange}
              value={childData?.name || ""}
            />
          </div>
        </div>
        <div className="row col-6">

        <div className="col-12">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-12">
          <input
            type="text"
            className="form-control form-control-sm"
            id="email"
            name="email"
            onChange={handleChildChange}
            value={childData?.email || ""}
          />
        </div>
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
            onChange={handleChildChange}
            value={childData?.street || ""}
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
            onChange={handleChildChange}
            value={childData?.phone || ""}
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
              value={childData?.street2 || ""}
              onChange={handleChildChange}
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
            value={childData?.mobile || ""}
            onChange={handleChildChange}
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
              value={childData?.city || ""}
              placeholder="City"
              onChange={handleChildChange}
            />
          </div>
        </div>
        <div className="col-2 mt-2">
          <select
            id="state_id"
            name="state_id"
            className="form-control form-control-sm"
            placeholder="State"
            onChange={handleChildChange}
            value={childData?.state || ""}
          >
            <option value="" disabled>
              State
            </option>
            {states?.map((item, index) => (
              <option value={item?.id} key={index}>
                {item?.label}
              </option>
            ))}
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
              value={childData?.zip || ""}
              onChange={handleChildChange}
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
            onChange={handleChildChange}
            value={childData?.country_id || ""}
          >
            <option value="" disabled>
              Country
            </option>
            {countries?.map((item, index) => (
              <option value={item?.id} key={index}>
                {item?.label}
              </option>
            ))}
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
            onChange={handleChildChange}
            value={childData?.notes || ""}
          />
        </div>
      </div> */}
    </>
  );
};

export default InvoiceAddress;
