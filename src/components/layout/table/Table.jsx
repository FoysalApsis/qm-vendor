import React, { useCallback, useEffect, useState } from "react";

import { DataGrid } from "@mui/x-data-grid";

import CustomGridOverlay from "./GridOverlay";
import CustomLoadingOverlay from "./LoadingOverlay";
import CustomToolbar from "./CustomToolbar";
import { makeStyles } from "@mui/styles";

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginTop: "20px",
    fontFamily: "FuturaLight",
    fontSize: "15px",
    marginRight: "20px",
    minHeight: "500 !important",
    "& .MuiTablePagination-root": {
      marginBottom: "5rem",
    },
    "& .MuiTablePagination-selectLabel,& .MuiTablePagination-displayedRows,": {
      marginBottom: 0,
      color: "#495057",
    },
    "& .MuiTablePagination-toolbar": {
      dispaly: "flex",
      aligItems: "center",
      justifyContent: "space-between",
    },
    "& .MuiCheckbox-root.Mui-checked": {
      color: "#000",
    },
    "& .MuiDataGrid-columnsContainer.css-99lfi7-MuiDataGrid-columnsContainer": {
      backgroundColor: "#ced4da",
      border: "none !important",
      height: "50px",
      color: "#4C6371",
      lineHeight: "50px !important",
    },
    "& .MuiButton-root": {
      color: "#828282",
      border: "2px solid #828282",
      padding: "5px 10px",
    },
    "& .MuiDataGrid-columnHeader": {
      fontFamily: "FuturaMedium",
      backgroundColor: "var(--primary)",
      fontSize: "16px",
      fontWeight: "400 ",
      margin: "0",
      color: "#000",
    },
    "& .MuiDataGrid-columnHeaders": {
      minHeight: "50px !important",
      maxHeight: "50px !important",
    },
    "& .MuiDataGrid-overlay": {
      top: "50px !important",
    },
    "& .MuiDataGrid-columnHeaderDraggableContainer": {
      height: "50px",
    },
    "& .MuiDataGrid-columnSeparator": {
      color: "#000",
      "& .MuiSvgIcon-root": {
        paddingLeft: "2px",
      },
    },
  },
}));

const Table = ({
  data,
  columns,
  loading,
  remove,
  rowheight,
  width,
  hideToolbar,
  hideSearchBar,
  hideTopBar,
  hideFooter,
  checkboxSelection,
  setRowsState,
  rowsState,
  setSelectedRows,
  clientPagination,
  search,
  setSearch,
}) => {
  const [searchText, setSearchText] = useState("");
  const [rows, setRows] = useState(data);
  const [pagination, setPagination] = useState({
    limit: 15,
    page: 0,
  });

  const onPageSizeChange = useCallback(
    (pageSize) => {
      if (clientPagination) {
        setPagination((prev) => ({ ...prev, limit: pageSize }));
      } else {
        setRowsState({ ...rowsState, pageSize: pageSize });
      }
    },
    [setRowsState, clientPagination, rowsState]
  );

  const onPageChange = useCallback(
    (page) => {
      if (clientPagination) {
        setPagination((prev) => ({ ...prev, page }));
      } else {
        setRowsState({ ...rowsState, page });
      }
    },
    [setRowsState, clientPagination, rowsState]
  );

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);

    const searchRegex = new RegExp(escapeRegExp(searchValue), "gi");
    const filteredRows = data.filter((row) =>
      Object.keys(row).some((field) =>
        searchRegex.test(row[field] ? row[field].toString() : "")
      )
    );
    setRows(filteredRows);
  };

  const classes = useStyles();

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  useEffect(() => {
    return remove && remove();
    //eslint-disable-next-line
  }, []);

  const getPaginationObj = () => {
    return !clientPagination
      ? {
          paginationMode: "server",
          rowCount: (rowsState && rowsState?.total) || data?.length,
          page: rowsState && rowsState?.page,
          pageSize: rowsState && rowsState?.pageSize,
        }
      : {
          rowCount: data?.length,
          page: pagination?.page,
          pageSize: pagination.limit,
        };
  };

  return (
    <div
      style={{
        height: rows?.length ? undefined : 500,
        maxWidth: `${width}`,
        width: `auto`,
      }}
    >
      <DataGrid
        {...getPaginationObj()}
        className={classes.root}
        rows={rows}
        columns={columns}
        pagination
        // pageSize={rowsState && rowsState?.pageSize}
        rowsPerPageOptions={[5, 15, 25, 50, 100]}
        onPageSizeChange={onPageSizeChange}
        // onPageSizeChange={(pageSize) =>
        //   setRowsState({ ...rowsState, pageSize })
        // }
        // rowCount={(rowsState && rowsState?.total) || data?.length}
        // page={rowsState && rowsState?.page}
        // onPageChange={(page) => setRowsState({ ...rowsState, page })}
        onPageChange={onPageChange}
        resize
        onSelectionModelChange={(ids) => {
          setSelectedRows(ids);
        }}
        loading={loading}
        scrollable
        hideFooter={(rows && rows.length === 0) || hideFooter ? true : false}
        autoHeight={rows?.length ? true : false}
        disableSelectionOnClick
        rowHeight={rowheight}
        checkboxSelection={checkboxSelection ? true : false}
        components={{
          LoadingOverlay: CustomLoadingOverlay,
          NoRowsOverlay: CustomGridOverlay,
          Toolbar: CustomToolbar,
        }}
        componentsProps={{
          toolbar: {
            hideSearchBar: hideSearchBar,
            hideTopBar: hideTopBar,
            hideToolbar: hideToolbar,
            // value: searchText,
            // onChange: (e) => requestSearch(e.target.value),
            // clearSearch: () => requestSearch(""),
            value: !clientPagination ? search : searchText,
            // value:  search ,
            onChange: (e) =>
              setSearch
                ? setSearch(e.target.value)
                : requestSearch(e.target.value),
            clearSearch: () => (setSearch ? setSearch("") : setSearchText("")),
            searchText,
          },
        }}
      />
    </div>
  );
};

export default Table;
