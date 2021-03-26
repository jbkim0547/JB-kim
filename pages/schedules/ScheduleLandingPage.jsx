import React, { Fragment } from "react";

import Schedules from "@components/schedules/Schedules";
export default function ScheduleLandingPage(props) {
  return (
    <Fragment>
      <Schedules {...props}/>
    </Fragment>
  );
}
