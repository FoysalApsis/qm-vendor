import useGetAll from "../../hooks/useGetAll";

const useDashboard = () => {
  const { data: dashboardData } = useGetAll("/request/dashboard");
  const { data: delegateData } = useGetAll("/request/dashboard/delegation");
  return {
    dashboardData: dashboardData && dashboardData[0],
    delegateData,
  };
};

export default useDashboard;
