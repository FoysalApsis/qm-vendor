import React from "react";

import { GridOverlay } from "@mui/x-data-grid";

import LinearProgress from "@mui/material/LinearProgress";
import { makeStyles } from "@mui/styles";
import { createStyles } from "@mui/material";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiLinearProgress-colorPrimary": {
        backgroundColor: "red",
      },
      "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "var(--primary)",
      },
    },
  })
);

const CustomLoadingOverlay = () => {
  const classes = useStyles();
  return (
    <GridOverlay>
      <div style={{ position: "absolute", top: 0, width: "100%" }}>
        <LinearProgress
          sx={{
            backgroundColor: "#fff",
          }}
          className={classes.root}
        />
      </div>
    </GridOverlay>
  );
};

export default CustomLoadingOverlay;
