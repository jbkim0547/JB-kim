import React, { Fragment, useState,useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import ListSubheader from "@material-ui/core/ListSubheader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Fab,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
  Grid,
  Card,
  Checkbox,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import ComposeModal from "./ComposeModal";
import CssBaseline from '@material-ui/core/CssBaseline';
import { id } from "date-fns/locale";
import { getMessage } from "services/contactFormService";
import debug from "sabio-debug";
const _logger = debug.extend("AdminDashInbox");

const AdminDashInbox = (props) => {
  const [messages, setMessages] = React.useState([])
 
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [isSidebarMenuOpen2, setIsSidebarMenuOpen2] = useState(false);
 

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);
  const toggleSidebarMenu2 = () => setIsSidebarMenuOpen2(!isSidebarMenuOpen2);

  console.log(props);
  const useStyles = makeStyles((theme) => ({
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    paper: {
      paddingBottom: 50,
    },
    list: {
      marginBottom: theme.spacing(2),
    },
    subheader: {
     backgroundColor: theme.palette.background.paper,
    background: 'linear-gradient(5deg,#9FA8DA 25%,#7986CB 55%)',

    border: 10,
    boxShadow:'0 1px 1px 1px #7986CB',
    borderRadius: 3,
    height: 50,
    padding: '0% 85% 3% 0px',
    color: 'white',

    },
    // Checkbox:{
    //   background:'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //   height: 45,
    //   padding: '0 20px',
    // },
    appBar: {
      top: "auto",
      bottom: 0,
    },
    grow: {
      flexGrow: 1,
    },
  }));
  
  
 
  useEffect(() => {
    getMessage()
    .then(
      (response)=>
      {
        if (response.items.length > 0 && messages.length === 0) {
          setMessages(response.items.reverse())
        }
      
         
      }, [messages])});

// function inboxMesseges(response){
//   if (response.items.length > 0 && messages.length === 0) {
//     setMessages(response.items)
//   }
// };
   const classes = useStyles();
  return (
    <React.Fragment>
        <div className="d-flex d-lg-none p-4 order-0 justify-content-between align-items-center">
          <Fab onClick={toggleSidebarMenu} size="small" color="primary">
            <FontAwesomeIcon icon={["fas", "ellipsis-v"]} />
          </Fab>
          <Fab onClick={toggleSidebarMenu2} size="small" color="primary">
            <FontAwesomeIcon icon={["fas", "bars"]} />
          </Fab>
        </div>
        <Grid item xs={12} sm={12} md={12} className="Test">
          <Card className="card-box mb-6" style={{ height: "500px" }}>
            <div
              className=" text-black card-header--title py-2 font-size-lg font-weight-bold"
              style={{ textAlignLast: "center" }}
            >
              <Grid container spacing={0}>
              
                <Card className="card-box mb-2" style={{ height: "500px" }}>
                  <div
                    className={clsx(
                      "app-inner-content-layout--sidebar bg-secondary app-inner-content-layout--sidebar__sm border-right",
                      { "layout-sidebar-open": isSidebarMenuOpen }
                    )}
                  >
                    <div className="p-4 bg-white">
                      <span className="btn-wrapper--label">

                      <ComposeModal />
                      </span>
                    </div>
                    <Divider />
                
                    {/* <List >
                      <ListItem button className="rounded-sm pl-1">
                        <span className="nav-link-icon opacity-4">
                          <FontAwesomeIcon
                            icon={["far", "file-alt"]}
                            className="mx-auto"
                          />
                        </span>
                        Messages
                      </ListItem>

                      <ListItem button className="rounded-sm pl-1">
                        <span className="nav-link-icon opacity-4">
                          <FontAwesomeIcon
                            icon={["far", "trash-alt"]}
                            className="mx-auto"
                          />
                        </span>
                        Delete
                      </ListItem>
                    </List>
                    <ListItem button className="rounded-sm pl-1">
                      <span className="nav-link-icon opacity-4">
                        <FontAwesomeIcon
                          icon={["far", "file-alt"]}
                          className="mx-auto"
                        />
                      </span>
                      Drafts
                    </ListItem> */}
                  
                  </div>
                </Card>
              

                <Grid item xs={10} sm={9}  md={9}>

                  <Card className="card-box overflow-hidden  text-dark">
                    <div
                      className=" text-black card-header--title py-2 font-size-lg font-weight-bold"
                      style={{ textAlignLast: "center" }}
                      // variant="h5" gutterBottom
                    >
                      {" "}
                      Inbox
                      <div className="p-3">
                       
                        <TextField
                          fullWidth
                          margin="dense"
                          variant="outlined"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="scroll-area" style={{ height: "375px" }}>
                      
                      <Card className="card-box mb-2"  >
                     
                        <Divider />
                        <CssBaseline />
                  <List className={classes.list}>
                        {messages.map((message) => (
                            <React.Fragment key={message.id}>
                            
                        
                              {message.id === 22  && (<ListSubheader className={classes.subheader}><Checkbox className="align-self-center mr-3" />Today</ListSubheader> )}
                              {message.id === 5  && ( <ListSubheader className={classes.subheader}><Checkbox className="align-self-center mr-3" />Yesterday</ListSubheader> )}
                              {message.id === 6  && (<ListSubheader className={classes.subheader}><Checkbox className="align-self-center mr-3" /> 17<sup>th</sup> July</ListSubheader> )}
                              {message.id === 7  && (<ListSubheader className={classes.subheader}><Checkbox className="align-self-center mr-3" /> 30<sup>th</sup> May</ListSubheader> )}
                      
                        <Divider />
                        <div className="align-box-row">
                          <Checkbox className="align-self-center mr-3" />
                        </div>
                        <ListItem button>
                          <div className="rounded-6 p-2">
                            <div>
                              <div className= "d-flex align-items-center w-25">
                              <div className="avatar-icon-wrapper avatar-icon-sm mb-2 ">
                                <span className="badge-circle badge badge-success">
                                  Online
                                </span>
                                <div className="avatar-icon rounded-circle "></div>
                                </div>
                              </div>
                              <ListItemText>
                              <div>
                                <div className="d-flex justify-content-between text-black-50">
                                  <div> {message.name}</div>
                                  <span className="opacity-7 ">{message.DateCreated}</span>
                                </div>
                                <div className="font-weight-bold my-2">
                                  {message.title}
                                </div>
                                <p className="font-size-xs mb-0">
                                 {message.message}
                                </p>
                              </div>
                              </ListItemText>
                            </div>
                            
                          </div>
                          
                        </ListItem>
                         </React.Fragment>
                         ))}
                        <Divider />
                        </List>
                      </Card>
                     
                    </div>
                    
                  </Card>
                </Grid>
              </Grid>
            </div>
          </Card>
        </Grid>
        <div
          onClick={toggleSidebarMenu}
          className={clsx("sidebar-inner-layout-overlay", {
            active: isSidebarMenuOpen,
          })}
        />
        <div
          onClick={toggleSidebarMenu2}
          className={clsx("sidebar-inner-layout-overlay", {
            active: isSidebarMenuOpen2,
          })}
        />
    </React.Fragment>
  );
};
AdminDashInbox.propTypes = {
  viewModal: PropTypes.func,
  message: PropTypes.string,
  name: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  DateCreated: PropTypes.datetime,
};

export default React.memo(AdminDashInbox);
