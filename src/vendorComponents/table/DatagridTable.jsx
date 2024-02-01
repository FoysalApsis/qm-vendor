import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React, { useState } from 'react'
import CustomLoadingOverlay from '../../components/layout/table/LoadingOverlay'
import CustomGridOverlay from '../../components/layout/table/GridOverlay'
import CustomToolBar from '../../components/layout/table/CustomToolbar'
import { makeStyles } from '@mui/styles'

const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };


const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 5,
    marginTop: "20px",
    fontFamily: "Inter",
    fontSize: "13px",
    marginRight: "20px",
    minHeight: "500 !important",
    background:"#F8F8F8",
    boxShadow: "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    // "& .MuiTablePagination-root": {
    //   marginBottom: "5rem",
    // },
    // "& .MuiTablePagination-selectLabel,& .MuiTablePagination-displayedRows,": {
    //   marginBottom: 0,
    //   color: "#495057",
    // },
    // "& .MuiTablePagination-toolbar": {
    //   dispaly: "flex",
    //   aligItems: "center",
    //   justifyContent: "space-between",
    // },
    // "& .MuiCheckbox-root.Mui-checked": {
    //   color: "#000",
    // },
    // "& .MuiDataGrid-columnsContainer.css-99lfi7-MuiDataGrid-columnsContainer": {
    //   backgroundColor: "#ced4da",
    //   border: "none !important",
    //   height: "50px",
    //   color: "#4C6371",
    //   lineHeight: "50px !important",
    // },
    // "& .MuiButton-root": {
    //   color: "#828282",
    //   border: "2px solid #828282",
    //   padding: "5px 10px",
    // },
    // "& .MuiDataGrid-main":{

    // },
    // "& div"{
    //     height:"auto"
    // }
    "& .MuiDataGrid-columnHeader": {
      fontSize: "14px",
      fontWeight: "600",
    },
    "& .MuiDataGrid-columnHeaders": {
      minHeight: "50px !important",
      maxHeight: "50px !important",
    },
    // "& .MuiDataGrid-overlay": {
    //   top: "50px !important",
    // },
    // "& .MuiDataGrid-columnHeaderDraggableContainer": {
    //   height: "50px",
    // },
    // "& .MuiDataGrid-columnSeparator": {
    //   color: "#000",
    //   "& .MuiSvgIcon-root": {
    //     paddingLeft: "2px",
    //   },
    // },
  },
}));  

const DatagridTable = ({data,columns,handleEvent}) => {
    const [searchText, setSearchText] = useState("");
    const [rows,setRows] = useState(data)
    console.log(columns,"xoxooxox")
    console.log(data,"rows")
    const requestSearch = (searchValue) => {

        console.log(searchValue,"seachval")
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
  return (
    <div style={{ height: "100%", width: '100%', }}>
    <DataGrid
        className={classes.root}
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
        }}
        pageSizeOptions={[5, 10, 25]}
        onRowClick={handleEvent}
       
        components={{
            LoadingOverlay: CustomLoadingOverlay,
            NoRowsOverlay: CustomGridOverlay,
            Toolbar: CustomToolBar,
          }}

          componentsProps={{
            toolbar: {
            //   hideToolbar: true,
              value:searchText,
              onChange: (e) => requestSearch(e.target.value),
              searchText  
            },
          }}
      />
    </div>
  )
}

export default DatagridTable