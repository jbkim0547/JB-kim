import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Grid,
  Fab,
  IconButton,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Tooltip,
  Divider,
} from "@material-ui/core";

import CalendarsFullWidthBasic from "@components/schedules/CalendarsFullWidthBasic";
import scheduleService from "@services/scheduleService";
import debug from "sabio-debug";
const _logger = debug.extend("Schedules");

const Schedules = (props) => {
  _logger("Schedule recieved Props:", props);
  const [isSidebarMenuOpen, setIsSidebarMenuOpen] = useState(false);
  const [toggleDialog, setToggleDialog] = useState(false);

  const toggleSidebarMenu = () => setIsSidebarMenuOpen(!isSidebarMenuOpen);


  

  const onAddButtonClicked = () => {setToggleDialog(!toggleDialog);}

  return (
    <Fragment>
      <div className="app-inner-content-layout">
        <div className="d-flex d-lg-none p-4 order-0 justify-content-between align-items-center">
          <Fab onClick={toggleSidebarMenu} color="primary" size="small">
            <FontAwesomeIcon
              icon={["fas", "ellipsis-v"]}
              className="font-size-sm"
            />
          </Fab>
        </div>
        <div
          className={clsx(
            "app-inner-content-layout--sidebar app-inner-content-layout--sidebar__lg bg-secondary border-right",
            { "layout-sidebar-open": isSidebarMenuOpen }
          )}
        >
          <PerfectScrollbar>
            <div className="px-4 pt-4 pb-3 bg-white">
              <Typography
                color="primary"
                component="div"
                className="d-flex align-items-center"
              >
                <div className="text-first font-weight-bold">
                  Calendar Events
                </div>
                <div className="ml-auto font-size-xs">
                  <Fab size="small" color="secondary">
                    <FontAwesomeIcon
                      icon={["fas", "plus-circle"]}
                      onClick={onAddButtonClicked}
                    />
                  </Fab>
                </div>
              </Typography>
            </div>
            <Divider />
            <div className="p-4">
              <Typography
                color="primary"
                component="div"
                className="d-flex align-items-center"
              >
                <div className="text-first font-weight-bold">
                  Upcoming Appointments
                </div>
              </Typography>
            </div>
          </PerfectScrollbar>
        </div>
        <div className="app-inner-content-layout--main bg-white p-0 card-box">
          <div className="app-inner-content-layout--main__header rounded-0 card-header bg-white p-4 border-bottom">
            <div className="card-header--title">
              <small>Schedules</small>
              <b className="font-size-lg">Scheduling Calendar</b>
            </div>
          </div>
          <PerfectScrollbar>
            <div className="p-4">
              <CalendarsFullWidthBasic
                fullProps={props}
                toggleDialog={toggleDialog}
                setToggleDialogFunc={onAddButtonClicked}
              />
            </div>
          </PerfectScrollbar>
        </div>
        <div
          onClick={toggleSidebarMenu}
          className={clsx("sidebar-inner-layout-overlay", {
            active: isSidebarMenuOpen,
          })}
        />
      </div>
    </Fragment>
  );
};

Schedules.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      providerId: PropTypes.number.isRequired,
    }),
  }),
};

export default Schedules;
