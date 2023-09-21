import { Link } from "react-router-dom";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { SidebarAccButton } from "../../../utils/Icons";
// import "./SideBar.scss";
import "./newSideBar.scss";

const sx = {
  "& .css-10hburv-MuiTypography-root ": {
    fontWeight: 600,
    fontSize: "15px",
  },
  fontSize: 12,
  color: "#000",
};
const classes = {
  item: {
    "&:hover": {
      // color: "#1F73B7",x
      borderBottom: "1px #1F73B7 solid",
    },
  },
};

export const SiderbarItem = ({ onClick, title = "Item text here" }) => {
  return (
    <div
      onClick={onClick}
      style={{
        color: "inherit",
        textDecoration: "none",
        cursor: "pointer",
        marginBlock: "6px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "FuturaBold !important",
          marginBlock: "10px !important",
          whiteSpace: "nowrap",
          fontWeight: "500",
          color: "#797979",
          textDecoration: "none",
          fontSize: "10px",
          borderBottom: "1px transparent solid",
          padding: "8px",
          paddingBottom: "0.2rem",
          transition: "0.3s",
          width: "fit-content",
          ...classes.item,
        }}
      >
        {title}
      </Typography>
    </div>
  );
};

export const CustomListItem = ({
  title,
  icon: Icon,
  pageTitle,
  subItemList = null,
  path,
  open,
  handleClick,
 
}) => {

  return (
    <>
      {!subItemList ? (
        <Link to={path} className="mb-2" style={{ textDecoration: "none" }} >
          <ListItemButton
            component="li"
            // className={open === title ? "active-sidenavbar" : ""}
            // sx={{  marginBottom: "10px", }}
            // onClick={() =>{ 
            //   // handleClick(title)
            //   console.log(title,"iiiiiiiiiii")
            //   setSelectedName(title)
            // }}
            className={pageTitle === title ? "!bg-[#F5F5F5] !border-l-4 !border-solid !border-[#0D3875]":""}
          >
            {/* <ListItemIcon className="text-primaryColor" style={{color: "#6B1D73"}}> */}
              {/* <Icon /> */}
            {/* </ListItemIcon> */}
            <ListItemText className={pageTitle === title ? "!font-semibold !text-[15px] segoe-bold text-[#0D3875]" :"!font-semibold !text-[15px] segoe-bold text-[#5F6D7E]"}   primary={title} style={{ paddingLeft:"20px" }}/>
          </ListItemButton>
        </Link>
      ) : (
        <ListItemButton
          component="li"
          sx={{
            borderRadius: "6px !important",
            marginBottom: "10px",
            fontFamily: "Segoe",
          }}
          className={open === title ? "active-sidenavbar" : ""}
          onClick={() => handleClick(title)}
        >
          <ListItemIcon className="text-primary">
            {/* <Icon className="text-primary"  sx={{ color: "#6B1D73" }}/> */}
          </ListItemIcon>
          <ListItemText sx={sx} primary={title} style={{ color: '#FFFFFF' }}/>
          {subItemList && (
            <SidebarAccButton
              style={{
                transform: open === title ? "rotate(0deg)" : "rotate(180deg)",
              }}
            />
          )}
        </ListItemButton>
      )}

      {subItemList && (
        <>
          <Collapse
            in={open === title}
            timeout={(1, 1, 1)}
            unmountOnExit
            component="li"
          >
            <List
              component="div"
              sx={{ ml: 4 }}
              className={`border-3`}
            >
              {/* {subItemList.map((item, index) => {
                return (
                  <Link
                    to={item.path}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemButton
                      sx={{
                        backgroundColor: location?.pathname.startsWith(
                          item.path
                        )
                          ? "rgba(0, 0, 0, 0.13) "
                          : "",
                        borderRadius: "6px",
                        paddingY: "3px",
                        color: "white",
                        fontFamily: "FuturaMedium",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </Link>
                );
              })} */}
            </List>
          </Collapse>
        </>
      )}
    </>
  );
};
