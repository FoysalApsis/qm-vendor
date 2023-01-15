import axios from "axios";
import { useQuery } from "react-query";

const useGetMe = (options) => {
  return useQuery(
    "me",
    async () => await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`),
    {
      ...options,
      refetchOnWindowFocus: true,
      enabled: Boolean(localStorage.getItem("token")),
    }
  );
};

export default useGetMe;
