import React, { useRef } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import {
  GridToolbarColumnsButton,
  // GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

import { createTheme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import SearchIcon from "../../../images/search.png";

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        fontFamily: "FuturaLight",
        padding: "10px 0",
        paddingBottom: 0,
        justifyContent: "space-between",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        color: "#828282",
        "& .MuiPaper-root ": {
          background: "red",
        },
        "& .css-d4cai4-MuiInputBase-root-MuiInput-root": {
          paddingBottom: 5,
        },
        "& .MuiGrid-root:nth-child(2)": {
          justifyContent: "flex-end",
          [theme.breakpoints.down("sm")]: {
            justifyContent: "space-between",
          },
        },
        "& .css-ghsjzk-MuiInputBase-root-MuiInput-root:after": {
          borderBottom: "2px solid #828282",
        },
        "& .MuiButton-root": {
          marginLeft: 20,
          color: "#828282",
          [theme.breakpoints.down("sm")]: {
            padding: "2px 10px",
            fontSize: 10,
            display: "flex",
            alignItems: "center",
          },
          [theme.breakpoints.down("md")]: {
            padding: "2px 10px",
            fontSize: 10,
            display: "flex",
            alignItems: "center",
            marginLeft: 5,
          },
          "& .css-i4bv87-MuiSvgIcon-root": {
            [theme.breakpoints.down("sm")]: {
              fontSize: 17,
            },
          },
        },
      },
      textField: {
        [theme.breakpoints.down("xs")]: {
          width: "100%",
        },
        margin: theme.spacing(1, 0.5, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
      select: {
        margin: theme.spacing(1.3, 0, 1.5),
        "& .MuiSvgIcon-root": {
          marginRight: theme.spacing(0.5),
        },
        "& .MuiInput-underline:before": {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme }
);

const CustomToolBar = ({
  value,
  onChange,
  hideToolbar,
  hideSearchBar,
  hideTopBar,
  clearSearch,
}) => {
  const classes = useStyles();

  const searchip = useRef();

  return !hideTopBar ? (
    <Grid container className={classes.root} sx={{ marginBottom: "20px" }}>
      {!hideSearchBar && (
        <Grid
          item
          xs={12}
          sm={hideToolbar ? 8 : 4}
          md={hideToolbar ? 8 : 4}
          className="d-flex justify-content-start align-items-center ps-4"
        >
          <TextField
            variant="standard"
            value={value}
            onChange={onChange}
            placeholder="Enter"
            ref={searchip}
            fullWidth
            className={classes.textField}
            InputProps={{
              startAdornment: (
                // <span
                //   className="material-icons-outlined"
                //   style={{ cursor: "pointer" }}
                // >
                //   search
                // </span>
                <img src={SearchIcon} alt="search" height="25" width="25" />
              ),
              endAdornment: (
                <>
                  <span
                    className="material-icons-outlined"
                    title="Clear"
                    aria-label="Clear"
                    style={{
                      visibility: value ? "visible" : "hidden",
                      cursor: "pointer",
                    }}
                    onClick={clearSearch}
                  >
                    clear
                  </span>
                </>
              ),
            }}
          />
        </Grid>
      )}
      {!hideToolbar && (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          className="d-flex align-items-center pb-2 pe-3"
        >
          <GridToolbarColumnsButton className="dark" />
          <GridToolbarFilterButton className="dark" />
          {/* <GridToolbarExport className="dark" /> */}
        </Grid>
      )}
    </Grid>
  ) : (
    ""
  );
};

export default CustomToolBar;

CustomToolBar.propTypes = {
  clearSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
