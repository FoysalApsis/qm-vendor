import { Dialog, DialogTitle, Grid, Button, DialogContent, DialogActions } from '@mui/material';

import { ErrorMessage, Field, Form, Formik } from "formik";
import React from 'react'
import useChangePassword from './useChangePassword';
import { toast } from 'react-toastify';

const ChangePassword = ({ onClose, selectedValue, open, setOpen }) => {

  const { SignInValidations, defaultState, mutate } = useChangePassword();

  return (
    <Dialog
      // onClose={handleClose}
      open={open}>
      <DialogTitle className='text-center'
        style={{ width: '500px' }}
      >Change Password</DialogTitle>

      <Formik
        initialValues={{
          ...defaultState,
        }}
        validationSchema={SignInValidations}
        onSubmit={async (values, { resetForm }) => {
          if (values?.new_password != values?.confirm_new_password) {
            toast.error(`Password does not match`, {
              position: "bottom-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          }
          else {
            mutate(values, { onSuccess: () => resetForm() });

          }
        }}
      >
        {({ errors, touched }) => (
          <Form >
            <DialogContent>
              <Field
                name="current_password"
                type="password"
                className="form-control "
                placeholder="Current Password"
              />
              <ErrorMessage
                name="current_password"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Field

                name="new_password"
                type="password"
                className="form-control mt-3"
                placeholder="New Password"
              />
              <ErrorMessage
                name="new_password"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
              <Field
                name="confirm_new_password"
                type="password"
                className="form-control mt-3"
                placeholder="Confirm New Password"
              />
              <ErrorMessage
                name="confirm_new_password"
                render={(msg) => (
                  <div style={{ color: "red", marginBottom: "5px" }}>{msg}</div>
                )}
              />
            </DialogContent>

            <DialogActions>

              <Button type="button" color="primary" variant="contained" onClick={() => setOpen(false)} >
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained" >
                Save
              </Button>

            </DialogActions>
          </Form>
        )}
      </Formik>

    </Dialog>
  )
}

export default ChangePassword