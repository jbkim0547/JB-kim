import React from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import scheduleService from "@services/scheduleService";
import ScheduleDialog from "@components/schedules/ScheduleDialog";
import { Grid, IconButton, Tooltip } from "@material-ui/core";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import debug from "sabio-debug";
import ScheduleDropdown from "./ScheduleDropdown";
import ScheduleAddButton from "./ScheduleAddButton";
import providerDetailsService from "@services/providerDetailsService";
import practiceService from "@services/practiceService";
const _logger = debug.extend("CalendarsFullWidthBasic");

let allViews = Object.keys(Views).map((k) => Views[k]);

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "#eaf6ff",
    },
    // className: "bg-midnight-bloom rounded"
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

const MyCalendar = (props) => {
  const isFirstRender = React.useRef(true);
  const [newEvents, setNewEvents] = React.useState([]);
  const [newNewEvents, setNewNewEvents] = React.useState([]);
  const [state, setState] = React.useState({});
  const [scheduleIdState, setScheduleIdState] = React.useState(0);
  const [changingScheduleIdState, setChangingScheduleIdState] = React.useState(
    0
  );
  const [scheduleIdList, setScheduleIdList] = React.useState([]);
  const [schedule, setSchedule] = React.useState("");
  const [providerDetails, setProviderDetails] = React.useState([]);
  const [practiceId, setPracticeId] = React.useState(0);
  const [scheduleId, setScheduleId] = React.useState(0);
  const [oldParams, setOldParams] = React.useState({});
  const [addedNewSchedule, setAddedNewSchedule] = React.useState({});
  let tempId = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };
  const crypto = require("crypto");
  const randomIdGenerator = crypto.randomBytes(16).toString("hex");

  React.useEffect(() => {
    _logger("useEffect Firing getById");
    getById();
  }, [changingScheduleIdState]);

  const getById = () => {
    providerDetailsService
      .getById(props?.fullProps?.location?.state?.providerId)
      .then(onGetByIdSuccess)
      .catch(onGetByIdError);
  };

  const onGetByIdSuccess = (res) => {
    let [newProviderDetails] = res.item;
    _logger(
      "-----------------------PROVIDER DETAILS FROM API",
      newProviderDetails
    );

    setProviderDetails(newProviderDetails);
  };

  const onGetByIdError = (err) => {
    _logger(err);
  };

  React.useEffect(() => {
    if (practiceId !== 0 && scheduleId !== 0) {
      updatePractice();

      setPracticeId(0);
      setScheduleId(0);
    }
  }, [practiceId, scheduleId]);

  const updatePractice = () => {
    let params = {
      id: practiceId,
      payload: {
        Id: practiceId,
        scheduleId: scheduleId,
      },
    };
    practiceService
      .updateScheduleId(params)
      .then(onUpdateScheduleIdSuccess)
      .catch(onUpdateScheduleIdError);
  };

  const onUpdateScheduleIdSuccess = (params) => {
    _logger(params);
    setOldParams(params);
  };

  const onUpdateScheduleIdError = (err) => {
    _logger(err);
  };

  React.useEffect(() => {
    //Note with Schedules*
    //if we want to add in multiple schedules for a provider, might be nice to through
    //in pagination 1,1 so the provider can *change which schedule he wants* ie: normal sched, holiday sched, etc
    //in that case, I'm keeping DateCreated/DateModified in the middle tier in case we decide to be able to edit schedules in that manner

    getScheduleByProviderId();
  }, [changingScheduleIdState]);

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
    _logger("onGetScheduleByProviderIdSuccess", res);

    setScheduleIdList(res.item);
  };

  const onGetScheduleByProviderIdError = (err) => {
    _logger(err);

    Swal.fire(
      "Uh Oh",
      "It seems like you do not have a schedule yet. Please click on the location icon to create your first schedule.",
      "question"
    );
  };

  React.useEffect(() => {
    _logger("NEW EVENTS CALLBACK", newEvents);
  }, [newEvents]);

  React.useEffect(() => {
    if (!isFirstRender.current) {
      let newScheduleIdArray = providerDetails.practices.filter((practice) => {
        let result = false;

        result = practice.id === oldParams.id;

        return result;
      });

      _logger(newScheduleIdArray);

      let newItemIntoDropdown = newScheduleIdArray.map(
        mapPracticeIntoScheduleStructure
      );

      let combineArrays = scheduleIdList.concat(newItemIntoDropdown);

      setScheduleIdList(combineArrays);
    }
  }, [oldParams]);

  const mapPracticeIntoScheduleStructure = (practice) => {
    let newPracticeStructure = {
      // createdBy: 11,
      id: oldParams.payload.scheduleId,
      practices: {
        adaAccessible: practice.adaAccessible,
        email: practice.email,
        facilityTypeId: practice.facilityTypeId,
        fax: practice.fax,
        genderAccepted: practice.genderAccepted,
        id: practice.id,
        insuranceAccepted: practice.insuranceAccepted,
        location: {
          city: practice.location.city,
          id: practice.location.id,
          latitude: practice.location.latitude,
          lineOne: practice.location.lineOne,
          lineTwo: practice.location.lineTwo,
          locationType: {
            id: practice.location.locationType.id,
            name: practice.location.locationType.name,
          },

          longitude: practice.location.longitude,
          state: {
            code: practice.location.state.code,
            id: practice.location.state.id,
            name: practice.location.state.name,
          },
          zip: practice.location.zip,
        },
        name: practice.name,
        phone: practice.phone,
        scheduleId: practice.scheduleId,
        siteUrl: practice.siteUrl,
      },
      providerId: props.fullProps.location.state.providerId,
    };

    return newPracticeStructure;
  };

  React.useEffect(() => {
    if (!isFirstRender.current) {
      getScheduleAvailabilityById();
    }
  }, [scheduleIdState]);

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

    _logger("post-GET newEvents", newEvents);
  };

  const onGetScheduleAvailabilityByIdError = (err) => {
    _logger(err);
    setNewEvents([]);
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

  React.useEffect(() => {
    if (!isFirstRender.current) {
      _logger("STATE useEffect CALLBACK", state);
      addScheduleAvailability();
    }
  }, [state]);

  const addScheduleAvailability = () => {
    _logger("adding to Schedules CALL /////////", state);
    scheduleService
      .addScheduleAvailability(state)
      .then(onAddScheduleAvailabilitySuccess)
      .catch(onAddScheduleAvailabilityError);
  };

  const onAddScheduleAvailabilitySuccess = (data) => {
    _logger(
      "onAddScheduleAvailabilitySuccess//////////////////////////////////",
      data
    );
    let newEventId = data.item;
    _logger("new event id", newEventId);

    let tempEventIndex = newEvents.findIndex(
      (event) => event.id === randomIdGenerator
    );
    _logger("WHERE IS", randomIdGenerator);
    let tempEvent = newEvents.splice(tempEventIndex, 1);
    _logger(tempEvent);

    const mappingTempEvent = (event) => {
      let newTempEvent = {
        id: newEventId,
        title: "Available",
        start: new Date(event.start),
        end: new Date(event.end),
        status: event.status,
      };

      return newTempEvent;
    };

    let newTempEvent = tempEvent.map(mappingTempEvent);

    _logger("newTempEvent", newTempEvent);

    let updatedNewEvents = newEvents.concat(newTempEvent);
    setNewEvents(updatedNewEvents);
    _logger("INVALID PROP ERRORDELETED FILTER ARRAY", updatedNewEvents);
    _logger("updatedNewEvents", updatedNewEvents);
    _logger("post-Click newEvents", newEvents);
  };

  const onAddScheduleAvailabilityError = (err) => {
    _logger(err);
  };

  React.useEffect(() => {
    isFirstRender.current = false; //toggles flag after first render/mounting
  }, []);

  const handleChange = (event) => {
    let chosenScheduleId = event.target.value;

    setSchedule(chosenScheduleId);

    _logger(chosenScheduleId);

    setScheduleIdState(chosenScheduleId);
  };

  const handleConfirm = (e) => {
    _logger(e);
    addSchedule();

    setOpen(false);
  };

  const addSchedule = (newPracticeId) => {
    setPracticeId(newPracticeId);

    const payLoad = {
      providerId: props.fullProps.location.state.providerId,
      createdBy: props.fullProps.currentUser.id,
    };
    scheduleService
      .addSchedule(payLoad)
      .then(onAddScheduleSuccess)
      .catch(onAddScheduleError);
  };

  const onAddScheduleSuccess = (res) => {
    _logger(res);

    let scheduleId = res.item;

    setScheduleId(scheduleId);
  };

  const onAddScheduleError = (err) => {
    _logger(err);
  };

  const onSelectSlotClicked = (e) => {
    _logger("SELECTING TIME SLOT", e);

    let newEventObject = {
      id: randomIdGenerator,
      title: "Available",
      start: new Date(e.start),
      end: new Date(e.end),
      status: 1,
    };
    _logger("newEventObject", newEventObject);

    let addingToMappedNewEventArray = [];
    addingToMappedNewEventArray.push(newEventObject);

    let newestMappedNewEventArray = newEvents.concat(
      addingToMappedNewEventArray
    );

    setNewEvents(newestMappedNewEventArray);
    _logger("newestMappedNewEventArray", newestMappedNewEventArray);
    _logger("post-Click newEvents", newEvents);

    mapScheduleTimesIntoUsableData(e);
  };

  const mapScheduleTimesIntoUsableData = (clicked) => {
    let formattedClicked = {
      DayOfWeek: `${clicked.start.toLocaleString()}`,
      StartTime: `${clicked.start.toLocaleString()}`,
      EndTime: `${clicked.end.toLocaleString()}`,
      //22/07/2018, 07:22:13 FORMAT
    };
    let arrClicked = [];

    arrClicked.push(formattedClicked);

    setState({
      scheduleId: scheduleIdState,
      createdBy: props.fullProps.currentUser.id,
      scheduleTimes: arrClicked,
    });
    _logger("STATE //////////////////////////////////////////", state);
  };

  const onSelectEventHandler = (e) => {
    _logger(e);

    if (props.providerId) {
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          scheduleService
            .deleteScheduleAvailabilityById(e.id)
            .then(onDeleteScheduleAvailabilityByIdSuccess)
            .catch(onDeleteScheduleAvailabilityByIdError);
          let timerInterval;
          Swal.fire({
            title: "Schedule Availability has been deleted",
            timer: 700,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              timerInterval = setInterval(() => {
                const content = Swal.getContent();
                if (content) {
                  const b = content.querySelector("b");
                  if (b) {
                    b.textContent = Swal.getTimerLeft();
                  }
                }
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        }
      });
    }
  };

  const onDoubleClickHandler = (e) => {
    _logger(e);
    scheduleService
      .deleteScheduleAvailabilityById(e.id)
      .then(onDeleteScheduleAvailabilityByIdSuccess)
      .catch(onDeleteScheduleAvailabilityByIdError);
  };

  const onDeleteScheduleAvailabilityByIdSuccess = (id) => {
    _logger(id);

    let deletedEventArr = newEvents.filter((event) => event.id !== id);

    _logger("INVALID PROP ERRORDELETED FILTER ARRAY", deletedEventArr);
    setNewEvents(deletedEventArr);

    _logger("post-Delete newEvents", newEvents);
  };

  const onDeleteScheduleAvailabilityByIdError = (err) => {
    _logger(err);
  };

  return (
    <div>
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
        toggleDialog={props.toggleDialog}
        setToggleDialogFunc={props.setToggleDialogFunc}
      />
      <Grid container style={{ flexGrow: 1 }}>
        <Grid item>
          <ScheduleDropdown
            handleChange={handleChange}
            schedule={schedule}
            scheduleIdList={scheduleIdList}
            setAddedNewSchedule={setAddedNewSchedule}
            addedNewSchedule={addedNewSchedule}
          />
        </Grid>
        <Grid item>
          <ScheduleAddButton
            addSchedule={addSchedule}
            handleConfirm={handleConfirm}
            {...props}
            providerDetails={providerDetails}
            addedNewSchedule={addedNewSchedule}
          />
        </Grid>
      </Grid>
      <Calendar
        localizer={localizer}
        views={allViews}
        step={30}
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 22, 0, 0)}
        showMultiDayTimes
        defaultDate={new Date()}
        components={{
          timeSlotWrapper: ColoredDateCellWrapper,
        }}
        events={newEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ minHeight: 650 }}
        onSelectSlot={onSelectSlotClicked}
        selectable={true}
        onSelectEvent={onSelectEventHandler}
        //onSelectEvent={onDoubleClickHandler}
        onDoubleClickEvent={onDoubleClickHandler}
        // slotPropGetter={(event, start, end, isSelected) => {
        //   return {
        //     className: "bg-skim-blue",
        //   };
        // }}
        //still using this for development purposes^
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

MyCalendar.propTypes = {
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
  toggleDialog: PropTypes.bool,
  setToggleDialogFunc: PropTypes.func,
};

export default MyCalendar;
