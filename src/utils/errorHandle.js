import { toast } from "react-toastify";

const errorHandle = (error) => {
  if (error.response) {
    if (error.response.status === 404) {
      toast.error(`404 Not Found!`);
      localStorage.removeItem("token");
      localStorage.removeItem("userObj");
      window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);
   
    } else if (error.response.status === 401) {
      toast.error(error.response.data || `401 Connection Refused!`);
      localStorage.removeItem("token");
      localStorage.removeItem("userObj");
      // window.location.replace(`${process.env.REACT_APP_FE_URL}/sign-in`);
      localStorage.clear()
      window.location.href=`${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`
    } else if (error.response.status === 500) {
      const msg =
        typeof error.response.data.msg === "object"
          ? error.response.data.msg[0]
          : error.response.data.msg;
      toast.error(<div dangerouslySetInnerHTML={{ __html: msg }} />);
    } else if (error.response.data.msg) {
      toast.error(error.response.data.msg);
    }
  } else if (error.message) {
    toast.error(error.message || "Client Error");
  }
};
export default errorHandle;
