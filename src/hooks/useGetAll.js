import { useQuery } from "react-query";
import serverAPI from "../config/serverAPI";
import errorHandle from "../utils/errorHandle";
import setAuthToken from "../utils/setAuthToken";

const get = async (endPoint, params = {}) => {
  if (
    localStorage.getItem("token") &&
    !serverAPI.defaults.headers.common["authorization"]
  ) {
    setAuthToken(localStorage.getItem("token"));
  }
  return await serverAPI.get(`${endPoint}`, {
    params,
  });
};

const useGetAll = (endPoint, options = {}) => {
  return useQuery(
    options.params ? [`${endPoint}`, options.params] : `${endPoint}`,
    () => get(endPoint, options.params),
    {
      select: (data) => data.data.data,
      onError: (err) => errorHandle(err),
      ...options,
      retry: false,
    }
  );
};

export default useGetAll;
