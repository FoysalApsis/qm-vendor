import { useState } from "react";
import CommonContext from "./CommonContext";

const CommonState = ({ children }) => {
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 15,
    total: 0,
  });

  const query = new URLSearchParams({
    limit: rowsState ? rowsState.pageSize : 15,
    page: rowsState ? rowsState.page : 1,
  });

  const clearRowState = () => {
    setRowsState({
      page: 0,
      pageSize: 15,
      total: 0,
    });
  };

  // #################### Only For Previous  Delegation Table ########################

  const [rowsStatePrev, setRowsStatePrev] = useState({
    page: 0,
    pageSize: 15,
    total: 0,
  });

  const queryPrev = new URLSearchParams({
    limit: rowsStatePrev ? rowsStatePrev.pageSize : 15,
    page: rowsStatePrev ? rowsStatePrev.page : 1,
  });

  const clearRowStatePrev = () => {
    setRowsStatePrev({
      page: 0,
      pageSize: 15,
      total: 0,
    });
  };

  return (
    <CommonContext.Provider
      value={{
        rowsState,
        query,
        setRowsState,
        clearRowState,
        rowsStatePrev,
        setRowsStatePrev,
        queryPrev,
        clearRowStatePrev,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

export default CommonState;
