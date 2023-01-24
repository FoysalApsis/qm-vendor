import React from "react";

const Contact = (props) => {
  const { data, setData, handleChange, handleChildChange, titles,childData } = props;
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
            id="name"
            name="name"
            onChange={handleChildChange}
          />
        </div>
        <div className="col-2">
          <label htmlFor="email">Email:</label>
        </div>
        <div className="col-4">
          <input
            type="text"
            className="form-control form-control-sm"
            id="email"
            name="email"
            onChange={handleChildChange}
          />
        </div>
        <div className="col-2 mt-2">
          <label htmlFor="title">Title:</label>
        </div>
        <div className="col-4 mt-2">

          <select
            id="title"
            name="title"
            className="form-control"
            placeholder="Title"
            onChange={handleChildChange}
            // value={Array.isArray(data?.titles) ? data?.titles[0] : data?.titles}
          >
            <option value="0">Select Title</option>
            {titles?.map((item, index) => (
              <option value={item?.id} key={index}>
                {item?.label}
              </option>
            ))}
          </select>
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
            onChange={handleChildChange}
          />
        </div>
        <div className="col-2 mt-2">
          <label htmlFor="function">Job Position:</label>
        </div>
        <div className="col-4 mt-2">
          <input
            type="text"
            className="form-control form-control-sm"
            id="function"
            name="function"
            onChange={handleChildChange}
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
            onChange={handleChildChange}
          />
        </div>
        <div className="col-2 mt-2">
          <label htmlFor="comment">Notes:</label>
        </div>
        <div className="col-4 mt-2">
          <textarea
            type="text"
            className="form-control form-control-sm"
            id="comment"
            name="comment"
            onChange={handleChildChange}
          />
        </div>
      </div>
    </>
  );
};

export default Contact;
