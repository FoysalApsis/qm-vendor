// import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
// import React, { useRef } from "react";
// import CopyPageLayout from "./copyPageLayout";
// import Navbar from "../navbar/Navbar";

// const MainLayout = ({
//   children,
//   pageTitle,
//   buttonName,
//   onButtonClick,
//   loading,
// }) => {
//   const ref = useRef(null);
//   return (
//     <div style={{ backgroundColor: "#CFCFCF", position: "relative" }}>
//       <div style={{ height: "239px", backgroundColor: "#6B1D73" }}></div>
//       {/* <div style={{ height: "100vh", backgroundColor: "#CFCFCF" }}></div> */}
//       <div style={{ position: "absolute", top: "10px", width: "100%" }}>
//         <div style={{ width: "95%", margin: "auto" }}>
//           <Navbar
//           // handleDrawerToggle={handleDrawerToggle}
//           />
//         </div>
//       </div>
//       <div style={{ position: "absolute", top: "100px", width: "100%" }}>
//         <div style={{ width: "95%", margin: "auto" }}>
//           <div className="main-container mb-24">
//             <CopyPageLayout />
//             {/* <PageHeader title={'Purchase Orders'} > </PageHeader> */}
//             <Card className="w-full py-[24px] px-[68px]">
//               <div className="flex justify-between items-middle">
//                 <span className="pb-[20px] page-title segoe-bold">
//                   {pageTitle}
//                 </span>
//                 <div>
//                   {buttonName && (
//                     <Button
//                       type="submit"
//                       color="secondary"
//                       variant="contained"
//                       onClick={onButtonClick}
//                       className="h-8 segoe-normal capitalize"
//                       style={{
//                         backgroundColor: "#6B1D73",
//                         textTransform: "capitalize",
//                       }}
//                       startIcon={
//                         loading && (
//                           <CircularProgress color="inherit" size={"16px"} />
//                         )
//                       }
//                     >
//                       {buttonName}
//                     </Button>
//                   )}
//                   <span></span>
//                 </div>
//               </div>
//               {children}
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button, Card, Drawer } from '@mui/material';
import BackwardIcon from '../../../images/backward2.svg'
import QmLogo from '../../../images/respond.png'
import { CustomListItem } from '../sideBar/Modules';
import DropDown from '../navbar/DropDown';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function MainLayout({
  children,
  pageTitle,
  buttonName,
  onButtonClick,
  loading,
  // selectedName,
  // setSelectedName
}) {

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const [user,setUser] = React.useState(JSON.parse(localStorage.getItem('userObj')))

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    if(!user){
      window.location.href = `${process.env.REACT_APP_ANGULAR_API_URL}/auth/login`;
      
    }
  },[])
  // const [selectedName,setSelectedName]=React.useState('Dashboard')
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{ backgroundColor: '#FFFFFF' }}>
        <Toolbar className='flex items-center justify-between'>
          <div className='flex items-center'>
            <button
              type="button"
              className='mr-5'
            >

              <img
                src={BackwardIcon}
                onClick={toggleDrawer}
                className="w-11 h-11 "
                style={{ ...(!open && { transform: "rotate(180deg)" }), }}
              />
            </button>
            <Typography noWrap component="div" className='!text-lg !font-medium' style={{ color: "#161616" }}>
              Vendor Portal
            </Typography>
           
          </div>

          <div className='flex items-center gap-3'>
            <a href={ localStorage.getItem('qual-type') == 'admin' ? `${process.env.REACT_APP_ANGULAR_API_URL}` : `${process.env.REACT_APP_ANGULAR_API_URL}/vendor` }>
          <Button variant="contained" className='!bg-[#0D3875] h-8 segoe-normal ' >
            
              Go To Vendor Onboarding
              </Button>
              </a>
            <div className='text-[#161616] text-sm'>
              <div>
              {user?.name}
              </div>
              <div className='text-[#5F6D7E] text-xs'>
                {user?.email}
              </div>
            </div>
          <DropDown>
            {/* <Avatar
              sx={{
                width: 35,
                height: 35,
                marginRight: `15px`,
                color: "#fff",
                background: "#0094AA",
              }}
            /> */}
            <div>
            <div
              className="cursor-pointer ml-[10px] w-10 h-10 aspect-square bg-[#F1F1F9] flex justify-center items-center text-[#4A429E] text-5 font-semibold uppercase rounded-full"
            >
              <PersonIcon/>
            </div>
          </div>
          </DropDown>
          </div>
         
          
        </Toolbar>
      </AppBar>
      <Drawer sx={{
        
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
        ...(!open && { display:'none' }),
      }} variant="persistent" anchor="left" open={open}>
        <DrawerHeader style={{ padding: '22px 60px' }}>
          <img src={QmLogo} style={{ width: '166px' }} />
        </DrawerHeader>
        <Divider />
        <List className=" pt-4">
          <CustomListItem
            title="Dashboard"
            pageTitle={pageTitle}
            // icon={CircleOutlinedIcon}
            // setSelectedName={setSelectedName}
            // selectedName={selectedName}
            path="/"
          // handleClick={handleClick}
          // open={open}
          />
          <CustomListItem
            pageTitle={pageTitle}
            title="My Information"
            // icon={CircleOutlinedIcon}
            // setSelectedName={setSelectedName}
            // selectedName={selectedName}
            path="/vendor"
          // handleClick={handleClick}
          // open={open}
          />
          <CustomListItem
            pageTitle={pageTitle}
            title="My Purchase Orders"
            // icon={CircleOutlinedIcon}
            // setSelectedName={setSelectedName}
            // selectedName={selectedName}
            path="/my-purchase-order"
          // handleClick={handleClick}
          // open={open}
          />
          <CustomListItem
            pageTitle={pageTitle}
            title="My Invoices"
            // icon={CircleOutlinedIcon}
            // setSelectedName={setSelectedName}
            // selectedName={selectedName}
            path="/invoice"
          // handleClick={handleClick}
          // open={open}
          />
          <CustomListItem
            pageTitle={pageTitle}
            title="My Payment Receipts"
            // icon={CircleOutlinedIcon}
            // setSelectedName={setSelectedName}
            // selectedName={selectedName}
            path="/my-payment-receipt"
            // handleClick={handleClick}
            open={open}
          />
        </List>
      </Drawer>
      {/* <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer> */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}
        style={{ background: '#F2F2F2', minHeight: '100vh' }}>
        <DrawerHeader />
        <Card style={{ padding: '24px 36px', borderRadius: "9px", boxShadow: "0px 10px 15px -3px rgba(16, 24, 40, 0.10), 0px 4px 6px -4px rgba(16, 24, 40, 0.10)" }}>
          {children}
        </Card>
      </Box>
    </Box>
  );
}

