import React from "react";
import PropTypes from "prop-types";
import scheduleService from "@services/scheduleService";
import ScheduleDialog from "@components/schedules/ScheduleDialog";
import { IconButton, Tooltip } from "@material-ui/core";
import Swal from "sweetalert2";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import debug from "sabio-debug";
const _logger = debug.extend("UserCalendar");

let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "#eaf6ff",
    },
  });

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const UserCalendar = (props) => {
  const [newEvents, setNewEvents] = React.useState([]);
  const [newNewEvents, setNewNewEvents] = React.useState([]);
  const [state, setState] = React.useState({});
  const [scheduleIdState, setScheduleIdState] = React.useState(0);
  const [changingScheduleIdState, setChangingScheduleIdState] = React.useState(
    0
  );

  let tempId = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  const crypto = require("crypto");

  const randomIdGenerator = crypto.randomBytes(16).toString("hex");

  //////////////////////////////////////////////////////////////////////////GETTING SCHEDULE ID
  const getScheduleByProviderId = () => {
    let providerId = null;

    if (props.providerId) {
      providerId = props.providerId;
    } else {
      providerId = props.fullProps.location.state.providerId;
    }

    scheduleService
      .getScheduleByProviderId(providerId)
      .then(onGetScheduleByProviderIdSuccess)
      .catch(onGetScheduleByProviderIdError);
  };

  const onGetScheduleByProviderIdSuccess = (res) => {
    _logger(res);

    let schedule = res.item.shift();

    let scheduleId = schedule.id;

    setScheduleIdState(scheduleId);
  };

  const onGetScheduleByProviderIdError = (err) => {
    _logger(err);

    addSchedule();
  };

  const addSchedule = () => {
    _logger("NO SCHEDULE EXISTS IN DATABSE SO ADD SCHEDULE IS FIRING");
    const payLoad = {
      providerId: props.fullProps.location.state.providerId,
      createdBy: props.fullProps.currentUser.id,
    };
    //createdBy is hard-coded until login/roles/userId is fully implemented and passed into state
    scheduleService
      .addSchedule(payLoad)
      .then(onAddScheduleSuccess)
      .catch(onAddScheduleError);
  };

  const onAddScheduleSuccess = (res) => {
    _logger(res);

    let scheduleId = res.item;

    setScheduleIdState(scheduleId);
  };

  const onAddScheduleError = (err) => {
    _logger(err);
  };

  React.useEffect(() => {
    //Note with Schedules*
    //if we want to add in multiple schedules for a provider, might be nice to through
    //in pagination 1,1 so the provider can *change which schedule he wants* ie: normal sched, holiday sched, etc
    //in that case, I'm keeping DateCreated/DateModified in the middle tier in case we decide to be able to edit schedules in that manner

    getScheduleByProviderId();
  }, [changingScheduleIdState]);

  //////////////////////////////////////////////////////////////////////////GETTING SCHEDULE ID

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      getScheduleAvailabilityById();
    }
  }, [scheduleIdState]);

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  React.useEffect(() => {
    _logger(
      "NEW EVENTS CALLBACKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",
      newEvents
    );
  }, [newEvents]);

  const getScheduleAvailabilityById = () => {
    let params = { id: scheduleIdState, pageIndex: 0, pageSize: 2000 };

    scheduleService
      .getScheduleAvailabilityById(params)
      .then(onGetScheduleAvailabilityByIdSuccess)
      .catch(onGetScheduleAvailabilityByIdError);
  };

  const onGetScheduleAvailabilityByIdSuccess = (res) => {
    _logger(res);
    _logger(
      "onGetScheduleAvailabilitySuccess//////////////////////////////////",
      res.item.pagedItems
    );
    const newEventArray = res.item.pagedItems;

    let mappedNewEventArray = newEventArray.map(mappingToEventFormat);

    setNewEvents(mappedNewEventArray);
    _logger("ONGET /////////// mappedNewEventArray", mappedNewEventArray);
    _logger("post-GET newEvents", newEvents);
  };

  const mappingToEventFormat = (schedule) => {
    if (schedule.status !== 2) {
      if (schedule.id) {
        let mappedSchedule = {
          id: schedule.id,
          title: "Available",
          start: new Date(schedule.startTime),
          end: new Date(schedule.endTime),
          status: schedule.status,
        };

        return mappedSchedule;
      } else {
        let mappedSchedule = {
          id: tempId(),
          title: "Available",
          start: new Date(schedule.start),
          end: new Date(schedule.end),
          status: schedule.status,
        };

        return mappedSchedule;
      }
    } else {
      if (schedule.id) {
        let mappedSchedule = {
          id: schedule.id,
          title: "Booked",
          start: new Date(schedule.startTime),
          end: new Date(schedule.endTime),
          status: schedule.status,
        };

        return mappedSchedule;
      } else {
        let mappedSchedule = {
          id: tempId(),
          title: "Booked",
          start: new Date(schedule.start),
          end: new Date(schedule.end),
          status: schedule.status,
        };

        return mappedSchedule;
      }
    }
  };

  const onGetScheduleAvailabilityByIdError = (err) => {
    _logger(err);
  };

  const onSelectEventHandler = (e) => {
    _logger(e);

    //first, need to update schedule availability to change status
    changeStatusOfSchedule(e);

    //then, add it into appointments
  };

  const updateStatusScheduleAvailability = (params) => {
    scheduleService
      .updateStatusScheduleAvailability(params)
      .then(onUpdateStatusScheduleAvailabilitySuccess)
      .catch(onUpdateStatusScheduleAvailabilityError);
  };

  const onUpdateStatusScheduleAvailabilitySuccess = (res) => {
    _logger(res);
  };

  const onUpdateStatusScheduleAvailabilityError = (err) => {
    _logger(err);
  };

  const changeStatusOfSchedule = (e) => {
    // Swal.fire({
    //   // customClass: {container: },
    //   // target: document.getElementById('form-modal'),
    //   title: 'Are you sure you want to book an appointment?',
    //   text: "If you ever need to cancel an appointment, please let providers know 24 hours ahead of appointed time",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Book it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Thank you!',
    //       'You will be receiving a confirmation email shortly.',
    //       'success'
    //     )
    //   }
    // })

    let params = {
      id: e.id,
      payload: {
        Status: 2,
      },
    };

    updateStatusScheduleAvailability(params);

    let oldEventIndex = newEvents.findIndex((event) => event.id === e.id);

    newEvents[oldEventIndex] = {
      id: e.id,
      title: "Booked",
      start: new Date(e.start),
      end: new Date(e.end),
      status: 2,
    };
    //based on status, change the name/color of event?

    _logger("changing status and name of schedule", newEvents[oldEventIndex]);
  };

  return (
    <div>
      <div className="card-header--actions">
        <Tooltip placement="right" title="Add Openings to Schedule">
          <IconButton size="medium" color="primary">
            <ScheduleDialog
              fullProps={props.fullProps}
              newEvents={newEvents}
              setNewEvents={setNewEvents}
              newNewEvents={newNewEvents}
              setNewNewEvents={setNewNewEvents}
              state={state}
              setState={setState}
              randomIdGenerator={randomIdGenerator}
              scheduleIdState={scheduleIdState}
            />
          </IconButton>
        </Tooltip>
      </div>
      <Calendar
        localizer={localizer}
        views={allViews}
        step={30}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        showMultiDayTimes
        defaultDate={new Date()}
        defaultView={"week"}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        events={newEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 650 }}
        //onSelectSlot={onSelectSlotClicked}
        selectable={true}
        onSelectEvent={onSelectEventHandler}
        eventPropGetter={(event, start, end, isSelected) => {
          let newStyle = {
            backgroundColor: "#000070",
            color: "white",
            borderRadius: "0px",
            border: "none",
          };

          if (event.status !== 2) {
            // newStyle.backgroundColor = "blue"
            return { className: "bg-midnight-bloom rounded", style: newStyle };
          }

          return {
            className: "bg-skim-blue rounded",
            style: newStyle,
          };
        }}
      />
    </div>
  );
};

UserCalendar.propTypes = {
  fullProps: PropTypes.shape({
    currentUser: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    location: PropTypes.shape({
      state: PropTypes.shape({
        providerId: PropTypes.number,
      }),
    }),
  }),
  scheduleId: PropTypes.number,
  providerId: PropTypes.number,
};

export default UserCalendar;
