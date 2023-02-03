import { Button } from "@mui/material"
import React, { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PageHeader from "../../components/layout/pageHeader"
import PageLayout from "../../components/layout/pageLayout"
import serverAPI from "../../config/serverAPI"
import PurchaseTabs from "./PurchaseTabs"

const SinglePO = () => {
  const [singlePO, setSinglePO] = useState()
  const [productsPO, setProductsPO] = useState()
  const [data, setData] = useState(null)

//   const user = JSON.parse(localStorage.getItem("userObj"))

//   const getUserInfo = () => {
//     if (user) {
//       setData({
//         id: user?.id,
//         name: user?.name,
//         street: user?.street,
//         street2: user?.street2,
//         phone: user?.phone,
//         mobile: user?.mobile,
//         city: user?.city,
//         state_id: user?.state_id[0],
//         zip: user?.zip,
//         email: user?.email,
//         country_id: user?.country_id[0],
//         website: user?.website,
//         vat: user?.vat,
//         fax: user?.fax,
//         property_supplier_payment_term_id:
//           user?.property_supplier_payment_term_id,
//       })
//     }
//   }
const handleChange = ( ) => {
    console.log();
}
//   const handleChange = (e) => {
//     const { name, value, type } = e.target
//     if (type === "file") {
//       setData({
//         ...data,
//         [name]: e.target.files[0],
//       })
//     } else if (type === "select-one") {
//       setData({
//         ...data,
//         [name]: parseInt(value),
//       })
//     } else {
//       setData({
//         ...data,
//         [name]: type === "number" ? parseInt(value) : value,
//       })
//     }
//   }

  let { id } = useParams()
  // console.log(id,"yeahhhh   ------------------------");
  const getSinglePO = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: { id } }
    await serverAPI
      .post(`get-single-po`, body)
      .then((res) => {
        setSinglePO(
          res?.data?.response.map((elm) => {
            console.log(elm[0],"aaaaaaaaaaaaaaaaaa");
            // console.log(elm[0],"single po");
            // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
            return {
              ...elm[0],
            }
          })
        )
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const getPoProducts = useCallback(async () => {
    const body = { jsonrpc: "2.0", params: { id } }
    await serverAPI
      .post(`get-po-products`, body)
      .then((res) => {
        setProductsPO(
          res?.data?.response.map((elm) => {

            // return { partner_id:elm[0].partner_id[1], date_order:elm[0].date_order,partner_ref:elm[0].partner_ref,date_planned:elm[0].date_planned, po_approver_id:elm[0].po_approver_id[1],currency_id:elm[0].currency_id[1], };
            return {
              ...elm[0],
            }
          })
        )
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  useEffect(() => {
    getSinglePO()
    getPoProducts()
  }, [])

//   console.log(productsPO,"products po");

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (paymentTerm == null) {
//       const { property_supplier_payment_term_id, ...rest } = data
//       submit_data = rest
//     } else {
//       submit_data = data
//     }
//     const res = {
//       jsonrpc: "2.0",
//       params: { ...submit_data, id: user?.id },
//     }

//     // console.log(res);
//     await serverAPI
//       .post(`update-vendor`, res)
//       .then((res) => {
//         setAlert(true)
//       })
//       .catch((err) => {
//         console.log(err.message)
//       })
//   }

  return (
    <div className="main-container">
      <PageLayout />
      <PageHeader title={"Purchase Order"}></PageHeader>
      <form>
        <div className="row">
          <div className="col-1">
            <label htmlFor="name">Vendor:</label>
          </div>
          <div className="col-5">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="partner_id"
                name="partner_id"
                value={
                  singlePO?.[0]?.partner_id ? singlePO?.[0]?.partner_id[1] : ""
                }
                disabled
                onChange={handleChange}
              />
            </div>
          </div>
          <div
            className="col-2"
            style={{ display: "grid", placeContent: "center" }}
          >
            <label htmlFor="name">Order Deadline:</label>
          </div>
          <div className="col-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="date_order"
                name="date_order"
                value={singlePO?.[0]?.date_order ? singlePO[0]?.date_order : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="col-1"></div>
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
                //   onChange={handleChange}
                />
              </div>
            </div> */}
        </div>
        <div className="row mt-2">
          <div className="col-2">
            <label htmlFor="address">Vendor Reference:</label>
          </div>
          <div className="col-4">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="partner_ref"
                name="partner_ref"
                value={singlePO?.[0]?.partner_ref ? singlePO[0].partner_ref : ""}
                //   value={data?.street ? data?.street : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-2">
            <label htmlFor="phone">Expected Arrival:</label>
          </div>
          <div className="col-4">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="date_planned"
                name="date_planned"
                value={
                  singlePO?.[0]?.date_planned ? singlePO[0].date_planned : ""
                }
                //   value={data?.phone ? data?.phone : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="col-1"></div>
            <div className="col-5 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="street2"
                  name="street2"
                //   value={data?.street2 ? data?.street2 : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          <div className="col-1 mt-2">
            <label htmlFor="phone">Approver:</label>
          </div>
          <div className="col-5 mt-2">
            {" "}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="po_approver_id"
                name="po_approver_id"
                value={
                  singlePO?.[0]?.po_approver_id
                    ? singlePO[0].po_approver_id[1]
                    : ""
                }
                //   value={data?.mobile ? data?.mobile : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* <div className="col-1 mt-2"></div>
            <div className="col-2 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                //   value={data?.city ? data?.city : ""}
                //   placeholder="City"
                  onChange={handleChange}
                />
              </div>
            </div> */}
          {/* <div className="col-2 mt-2">
              
            </div> */}
          {/* <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  placeholder="ZIP"
                //   value={data?.zip ? data?.zip : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
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
                //   value={data?.email ? data?.email : ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-1 mt-2">
            <label htmlFor="website">Currency:</label>
          </div>
          <div className="col-5 mt-2">
            {" "}
            <div className="form-group">
              <select
                id="currency_id"
                name="currency_id"
                className="form-control"
                // placeholder="State"
                onChange={handleChange}
                value={singlePO?.[0]?.currency_id ? singlePO[0]?.currency_id : ""}

                // value={
                //   Array.isArray(data?.state_id)
                //     ? data?.state_id[0]
                //     : data?.state_id
                // }
              >
                <option value="">Select Currency</option>
                {/* {states?.map((item, index) => (
                  <option value={item?.id} key={index}>
                    {item?.label}
                  </option>
                ))} */}
                <option value="1">USD</option>
                <option value="2">EUR</option>
              </select>
            </div>
          </div>
          <div className="col-1 mt-2">
            <label htmlFor="vat">Division:</label>
          </div>
          <div className="col-5 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="qm_division_dimension_id"
                name="qm_division_dimension_id"
                value={
                  singlePO?.[0]?.qm_division_dimension_id
                    ? singlePO[0]?.qm_division_dimension_id
                    : ""
                }
                //   value={data?.vat ? data?.vat : ""}
                //   placeholder="e.g. BE0477472701"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6 mt-2">
            <label htmlFor="fax"></label>
          </div>
          {/* <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  name="fax"
                //   value={data?.fax ? data?.fax : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          <div className="col-1 mt-2">
            <label htmlFor="fax"> Region</label>
          </div>
          <div className="col-5 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="qm_region_dimension_id"
                name="qm_region_dimension_id"
                value={
                  singlePO?.[0]?.qm_region_dimension_id
                    ? singlePO[0]?.qm_region_dimension_id
                    : ""
                }
                //   value={data?.fax ? data?.fax : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6 mt-2">
            <label htmlFor="fax"></label>
          </div>
          {/* <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  name="fax"
                //   value={data?.fax ? data?.fax : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          <div className="col-1 mt-2">
            <label htmlFor="fax"> Location</label>
          </div>
          <div className="col-5 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="qm_location_dimension_id"
                name="qm_location_dimension_id"
                value={
                  singlePO?.[0]?.qm_location_dimension_id
                    ? singlePO[0]?.qm_location_dimension_id
                    : ""
                }
                //   value={data?.fax ? data?.fax : ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-5 mt-2">
            <label htmlFor="fax"></label>
          </div>
          {/* <div className="col-1 mt-2">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="fax"
                  name="fax"
                //   value={data?.fax ? data?.fax : ""}
                  onChange={handleChange}
                />
              </div>
            </div> */}
          <div className="col-2 mt-2" style={{ textAlign: "end" }}>
            <label htmlFor="fax">Department:</label>
          </div>
          <div className="col-5 mt-2">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="qm_department_dimension_id"
                name="qm_department_dimension_id"
                value={
                  singlePO?.[0]?.qm_department_dimension_id
                    ? singlePO[0]?.qm_department_dimension_id
                    : ""
                }
                //   value={data?.fax ? data?.fax : ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
      <hr />
        <div>
          <PurchaseTabs
          data = {productsPO}
            // setData={setData}
            // data={data}
            // handleChange={handleChange}
            // paymentTerm={paymentTerm}
            // setPaymentTerm={setPaymentTerm}
            // paymentTermOptions={paymentTermOptions}
            // setPaymentTermOptions={setPaymentTermOptions}
            // titles={titles}
            // states={states}
            // countries={countries}
            // banks={banks}
            // childs={childs}
          />
        </div>
      {/* <div className="d-flex justify-content-between">
        <div></div>
        <div className="mt-5">
          {" "}
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </div>
      </div> */}
    </div>
  )
}

export default SinglePO
