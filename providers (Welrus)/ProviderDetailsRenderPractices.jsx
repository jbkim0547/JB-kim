import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, ListItem, Tooltip } from "@material-ui/core";
import debug from "sabio-debug";
const _logger = debug.extend("ProviderDetailsRenderPractices");

const ProviderDetailsRenderPractices = (props) => {
  _logger("rendering Practices");

  return (
    <ListItem className="hover-show-hide-container d-flex justify-content-between align-items-center py-3 border-0">
      <div className="font-weight-bold flex-grow-1">
        <div className="text-second font-size-lg">{props.practices.name}</div>
        <div className="text-center">
          <div className="font-weight-bold text-second">
            {`Address: 
                      ${props.practices.location.lineOne} 
                      ${props.practices.location.lineTwo} 
                      ${props.practices.location.city} 
                      ${props.practices.location.zip}, 
                      ${props.practices.location.state.name}`}
          </div>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.phone}</b>
            {props.practices.fax}
          </span>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.siteUrl}</b>
            {props.practices.email}
          </span>
        </div>
        <div>
          <span className="opacity-8">
            <FontAwesomeIcon icon={["far", "user"]} className="mr-1" />
            <b className="pr-1">{props.practices.scheduleId}</b>
            {props.practices.email}
          </span>
        </div>
      </div>
      <div className="text-right hover-hide-wrapper">
        <div className="font-weight-bold text-second">{`Insurance Accepted: ${props.practices.insuranceAccepted}`}</div>
        <span className="opacity-7">{`ADA Accessible: ${props.practices.adaAccessible}`}</span>
      </div>

      <div className="text-right hover-show-wrapper">
        <Tooltip arrow title="View details">
          <IconButton className="bg-white text-first d-40 rounded-circle p-0 ml-1">
            <FontAwesomeIcon
              icon={["far", "user"]}
              className="font-size-md mx-auto"
            />
          </IconButton>
        </Tooltip>
        <Tooltip arrow title="Remove">
          <IconButton className="bg-white text-danger d-40 rounded-circle p-0 ml-1">
            <FontAwesomeIcon
              icon={["fas", "times"]}
              className="font-size-md mx-auto"
            />
          </IconButton>
        </Tooltip>
      </div>
    </ListItem>
  );
};


// import React, { Fragment } from 'react';
// import PropTypes from "prop-types";

// import {
//   Grid,
//   Avatar,
//   LinearProgress,
//   Card,
//   Button,
//   List,
//   ListItem,
//   Divider
// } from '@material-ui/core';

// import CountUp from 'react-countup';

// const ProviderDetailsRenderPractices = (props) => {
//   return (
//     <Fragment>
//       <Grid container spacing={12}>
//         <Grid item xs={12} lg={12}>
//           <Card className="card-box mb-4">
//             <List className="py-0">
//               <ListItem className="py-3">
//                 <Grid container spacing={4}>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="d-flex align-items-center">
//                     <div className="d-flex align-items-center">
//                       <Avatar alt="..." src="" className="mr-2" />
//                       <div>
//                         <a
//                           href="#/"
//                           onClick={e => e.preventDefault()}
//                           className="font-weight-bold text-black"
//                           title="...">
//                           Shanelle Wynn
//                         </a>
//                         <span className="text-black-50 d-block">
//                           UI Engineer, Apple Inc.
//                         </span>
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="pt-1 pt-xl-0 d-flex align-items-center">
//                     <div className="align-box-row flex-grow-1">
//                       <div className="d-flex flex-column flex-grow-1">
//                         <div className="d-flex justify-content-between text-dark">
//                           <div className="ml-auto">
//                             <div className="font-weight-bold">
//                               <CountUp
//                                 start={0}
//                                 end={583}
//                                 duration={4}
//                                 separator=""
//                                 decimals={0}
//                                 decimal=","
//                                 prefix=""
//                                 suffix=""
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <LinearProgress color="primary" value={52} />
//                       </div>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="primary"
//                         className="ml-4">
//                         View
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <Divider />
//               <ListItem className="py-3">
//                 <Grid container spacing={4}>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="d-flex align-items-center">
//                     <div className="d-flex align-items-center">
//                       <Avatar alt="..." src="" className="mr-2" />
//                       <div>
//                         <a
//                           href="#/"
//                           onClick={e => e.preventDefault()}
//                           className="font-weight-bold text-black"
//                           title="...">
//                           Akeem Griffith
//                         </a>
//                         <span className="text-black-50 d-block">
//                           Manager, Google Inc.
//                         </span>
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="pt-1 pt-xl-0 d-flex align-items-center">
//                     <div className="align-box-row flex-grow-1">
//                       <div className="d-flex flex-column flex-grow-1">
//                         <div className="d-flex justify-content-between text-dark">
//                           <div className="ml-auto">
//                             <div className="font-weight-bold">
//                               <CountUp
//                                 start={0}
//                                 end={340}
//                                 duration={4}
//                                 separator=""
//                                 decimals={0}
//                                 decimal=","
//                                 prefix=""
//                                 suffix=""
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <LinearProgress
//                           className="progress-sm"
//                           color="primary"
//                           value={38}
//                         />
//                       </div>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="secondary"
//                         className="ml-4">
//                         View
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <Divider />
//               <ListItem className="py-3">
//                 <Grid container spacing={4}>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="d-flex align-items-center">
//                     <div className="d-flex align-items-center">
//                       <Avatar alt="..." src="" className="mr-2" />
//                       <div>
//                         <a
//                           href="#/"
//                           onClick={e => e.preventDefault()}
//                           className="font-weight-bold text-black"
//                           title="...">
//                           Abigayle Hicks
//                         </a>
//                         <span className="text-black-50 d-block">
//                           Project Manager, Spotify
//                         </span>
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="pt-1 pt-xl-0 d-flex align-items-center">
//                     <div className="align-box-row flex-grow-1">
//                       <div className="d-flex flex-column flex-grow-1">
//                         <div className="d-flex justify-content-between text-dark">
//                           <div className="ml-auto">
//                             <div className="font-weight-bold">
//                               <CountUp
//                                 start={0}
//                                 end={473}
//                                 duration={4}
//                                 separator=""
//                                 decimals={0}
//                                 decimal=","
//                                 prefix=""
//                                 suffix=""
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <LinearProgress
//                           className="progress-sm"
//                           color="secondary"
//                           value={34}
//                         />
//                       </div>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="secondary"
//                         className="ml-4">
//                         View
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <Divider />
//               <ListItem className="py-3">
//                 <Grid container spacing={4}>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="d-flex align-items-center">
//                     <div className="d-flex align-items-center">
//                       <Avatar alt="..." src="" className="mr-2" />
//                       <div>
//                         <a
//                           href="#/"
//                           onClick={e => e.preventDefault()}
//                           className="font-weight-bold text-black"
//                           title="...">
//                           Freya Nieves
//                         </a>
//                         <span className="text-black-50 d-block">
//                           Superviser, Walmart
//                         </span>
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="pt-1 pt-xl-0 d-flex align-items-center">
//                     <div className="align-box-row flex-grow-1">
//                       <div className="d-flex flex-column flex-grow-1">
//                         <div className="d-flex justify-content-between text-dark">
//                           <div className="ml-auto">
//                             <div className="font-weight-bold">
//                               <CountUp
//                                 start={0}
//                                 end={239}
//                                 duration={6}
//                                 deplay={2}
//                                 separator=""
//                                 decimals={0}
//                                 decimal=","
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <LinearProgress
//                           className="progress-sm"
//                           color="secondary"
//                           value={51}
//                         />
//                       </div>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="secondary"
//                         className="ml-4">
//                         View
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//               <Divider />
//               <ListItem className="py-3">
//                 <Grid container spacing={4}>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="d-flex align-items-center">
//                     <div className="d-flex align-items-center">
//                       <Avatar alt="..." src="" className="mr-2" />
//                       <div>
//                         <a
//                           href="#/"
//                           onClick={e => e.preventDefault()}
//                           className="font-weight-bold text-black"
//                           title="...">
//                           Elina Gould
//                         </a>
//                         <span className="text-black-50 d-block">
//                           Java Developer, Netflix
//                         </span>
//                       </div>
//                     </div>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     sm={6}
//                     className="pt-1 pt-xl-0 d-flex align-items-center">
//                     <div className="align-box-row flex-grow-1">
//                       <div className="d-flex flex-column flex-grow-1">
//                         <div className="d-flex justify-content-between text-dark">
//                           <div className="ml-auto">
//                             <span className="font-weight-bold">
//                               <CountUp
//                                 start={0}
//                                 end={345}
//                                 duration={6}
//                                 deplay={2}
//                                 separator=""
//                                 decimals={0}
//                                 decimal=","
//                               />
//                             </span>
//                           </div>
//                         </div>
//                         <LinearProgress
//                           className="progress-sm"
//                           color="primary"
//                           value={63}
//                         />
//                       </div>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         color="primary"
//                         className="ml-4">
//                         View
//                       </Button>
//                     </div>
//                   </Grid>
//                 </Grid>
//               </ListItem>
//             </List>
//           </Card>
//         </Grid>
//       </Grid>
//     </Fragment>
//   );
// }





ProviderDetailsRenderPractices.propTypes = {
  practices: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    fax: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    siteUrl: PropTypes.string.isRequired,
    facilityTypeId: PropTypes.number.isRequired,
    scheduleId: PropTypes.number.isRequired,
    adaAccessible: PropTypes.bool.isRequired,
    insuranceAccepted: PropTypes.bool.isRequired,
    genderAccepted: PropTypes.string.isRequired,
    location: PropTypes.shape({
      id: PropTypes.number.isRequired,
      locationType: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }),
      lineOne: PropTypes.string.isRequired,
      lineTwo: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      state: PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }),
  }),
};

export default ProviderDetailsRenderPractices;
