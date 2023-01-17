import React from "react";

const Contact = (props) => {
  const { data, setData, handleChange } = props;
  return (
    <>
      <div className="row mt-3">
        <div className="col-2">
          <label htmlFor="contactName">Contact Name:</label>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control form-control-sm"
            id="contactName"
            name="contactName"
            onChange={handleChange}
          />
        </div>
        <div className="col-2">
          <label htmlFor="contactName">Email:</label>
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
          <label htmlFor="title">Title:</label>
        </div>
        <div className="col-4 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="title"
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 mt-2">
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
          <label htmlFor="position">Job Position:</label>
        </div>
        <div className="col-4 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="position"
            name="position"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 mt-2">
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
        <div className="col-2 mt-2">
          <label htmlFor="notes">Notes:</label>
        </div>
        <div className="col-4 mt-2">
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

export default Contact;
