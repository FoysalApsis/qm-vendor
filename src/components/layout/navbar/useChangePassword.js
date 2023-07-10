import { useMutation } from "react-query";
import serverAPI from "../../../config/serverAPI";
import * as Yup from "yup";
import errorHandle from "../../../utils/errorHandle";
import { toast } from 'react-toastify';



const useChangePassword = () => {
    const user = JSON.parse(localStorage.getItem("userObj"));

    const defaultState = {
        email: user?.email,
        current_password: "",
        new_password: "",
        confirm_new_password: ""
    };
    const SignInValidations = Yup.object().shape({
        current_password: Yup.string().required("Current Password is required!"),
        new_password: Yup.string().required("New Password is required!"),
        confirm_new_password: Yup.string().required("Confirm new password is required!")
        
    });
    const PostPassword = async (data) => {
        const res = { jsonrpc: "2.0", params: { ...data } }
        return await serverAPI.post("/change-password", res, {});
    };
    const Mutation = useMutation(PostPassword, {
        onSuccess: (data) => {
              if (data?.data?.success) {
                toast.success(data?.data?.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                localStorage.removeItem("token");
                localStorage.removeItem("userObj");
                window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);

              }
              else{
                toast.error(data?.data?.message, {
                  position: "bottom-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                });
                // localStorage.removeItem("token");
                // localStorage.removeItem("userObj");
                // window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);
              }


        },
        // onError: (err) => {
        //     errorHandle(err);
        // },
    });
    return{
        SignInValidations,
        defaultState,
        mutate: Mutation.mutate,
    }
}

export default useChangePassword