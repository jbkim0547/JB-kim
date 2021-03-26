import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import PracticeDetails from "./subforms/PracticeDetails";
import Practices from "./cards/Practices";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderPractices");

const newPracticeIndexStartPoint = 90200000;

class ProviderPractices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      practiceList: this.loadPracticeList(),
      maxPracticeTempId: newPracticeIndexStartPoint,
      currentPractice: this.getDefaultPractice(),
      shouldResetForm: false,
      isEditing: false,
    };
    _logger("constructor", this.state);
  }

  // --------------------------------- Constructor / Init Methods
  loadPracticeList = () => {
    let practiceList = [];
    if (this.props.practices && this.props.practices.length > 0) {
      practiceList = this.props.practices.map(this.addTempPracticeId);
    }
    return practiceList;
  };

  addTempPracticeId = (currentPractice) => {
    if (!currentPractice.tempPracticeId) {
      currentPractice.tempPracticeId = currentPractice.id;
    }
    return currentPractice;
  };

  getDefaultPractice = () => {
    return {
      tempLocationId: 0,
      tempPracticeId: 0,
      name: "",
      facilityTypeId: 0,
      phone: "",
      fax: "",
      email: null,
      siteUrl: null,
      scheduleId: null,
      adaAccessible: false,
      insuranceAccepted: false,
      genderAccepted: null,
    };
  };

  findMaxId = (list) => {
    let maxId = 0;
    if (list && Array.isArray(list)) {
      const listLength = list.length;
      for (let i = 0; i < listLength; i++) {
        if (list[i].tempLocationId) {
          const itemId = list[i].id;
          if (itemId && itemId > maxId) {
            maxId = itemId;
          }
        }
      }
    }
    return maxId;
  };

  componentDidMount() {
    const maxPracticeTempId = Math.max(
      this.findMaxId(this.state.practiceList),
      this.state.maxPracticeTempId
    );
    _logger("componentDidMount", maxPracticeTempId);
    this.setState((prevState) => {
      return { ...prevState, maxPracticeTempId };
    });
  }

  // --------------------------------- Event Handlers
  onEdit = (values) => {
    _logger("onEdit", values);
    this.loadPractice(values);
  };

  loadPractice = (aPractice) => {
    _logger("loadPractice", aPractice);
    this.setState((prevState) => {
      return { ...prevState, currentPractice: aPractice, isEditing: true };
    });
  };

  onRemove = (data) => {
    const removeIndex = this.findIndexInList(data.id, this.state.practiceList);
    if (removeIndex > -1) {
      let practiceList = [...this.state.practiceList];
      _logger("removing ", practiceList[removeIndex]);
      practiceList.splice(removeIndex, 1);

      this.setState((prevState) => {
        return { ...prevState, practiceList };
      }, this.onReset);
    } else {
      _logger("not removing", removeIndex);
      // toastr: unable to remove item
    }
  };

  findIndexInList = (id, list) => {
    _logger("findIndexInList", id, list);
    let result = -1;
    if (id && list && Array.isArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
          result = i;
          break;
        }
      }
    }
    return result;
  };

  onReset = () => {
    this.setState({
      isEditing: false,
      currentPractice: this.getDefaultPractice(),
      shouldResetForm: false,
    });
  };

  onAddorSaveEdit = (values) => {
    _logger("onAddorSaveEdit", values);
    if (this.state.isEditing) {
      this.saveEdits(values);
    } else {
      this.onAdd(values);
    }
  };

  saveEdits = (values) => {
    _logger("saveEdits", values.id);

    const editIndex = this.findIndexInList(values.id, this.state.practiceList);
    if (editIndex > -1) {
      _logger("saving", editIndex);
      let practiceList = [...this.state.practiceList];
      practiceList.splice(editIndex, 1, values);

      this.setState((prevState) => {
        return {
          ...prevState,
          practiceList,
          isEditing: false,
          shouldResetForm: true,
        };
      });
    } else {
      _logger("save of edits failed");
      // snackbar here
    }
  };

  onAdd = (values) => {
    _logger("onAdd", values);

    let maxPracticeTempId = this.state.maxPracticeTempId + 1;
    if (!values.id) {
      values.id = maxPracticeTempId;
    }
    values.tempPracticeId = values.id;

    let practiceList = [...this.state.practiceList];
    practiceList.push(values);

    this.setState((prevState) => {
      return {
        ...prevState,
        practiceList,
        maxPracticeTempId,
        shouldResetForm: true,
      };
    });
  };

  afterFormReset = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        currentLocation: this.getDefaultPractice(),
        shouldResetForm: false,
      };
    });
  };

  onDiscard = () => {
    this.exitView();
  };

  exitView = () => {
    _logger("on exit from ProviderPractices", this.state.practiceList);
    this.props.onNext({
      practices: this.state.practiceList,
    });
  };

  onPrevious = () => {
    _logger("on exit Previous from ProviderPractices", this.state.practiceList);
    if (this.state.practiceList.length > 0) {
      this.props.mergeNow({
        practices: this.state.practiceList,
      });
    }
    this.props.onBack();
  };

  render() {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={6}>
          <div className={"m-3"}>
            <PracticeDetails
              practice={this.state.currentPractice}
              listCount={
                this.state.practiceList ? this.state.practiceList.length : 0
              }
              onAddorSave={this.onAddorSaveEdit}
              onPrevious={this.onPrevious}
              onDiscard={this.onDiscard}
              resetComplete={this.afterFormReset}
              shouldResetForm={this.state.shouldResetForm}
              hasReset={this.onReset}
              isEditing={this.state.isEditing}
              // reference props:
              references={this.props.references}
              locations={this.props.locations}
              // outer component text:
              setTopText={this.props.setTopText}
              setSubHeadingText={this.props.setSubHeadingText}
              // Loki props:
              backLabel={this.props.backLabel}
              cantBack={this.props.cantBack}
              onNext={this.props.onNext}
              nextLabel={this.props.nextLabel}
            />
          </div>
        </Grid>

        {this.state.practiceList.length > 0 && (
          <Practices
            practices={this.state.practiceList}
            locations={this.props.locations}
            references={this.props.references}
            onEdit={this.onEdit}
            onRemove={this.onRemove}
            showButtons={true}
          />
        )}
      </Grid>
    );
  }
}

export default ProviderPractices;

ProviderPractices.propTypes = {
  practices: PropTypes.arrayOf(
    PropTypes.shape({
      tempLocationId: PropTypes.number,
      name: PropTypes.string,
      facilityTypeId: PropTypes.number,
      phone: PropTypes.string,
      fax: PropTypes.string,
      email: PropTypes.string,
      siteUrl: PropTypes.string,
      adaAccessible: PropTypes.bool,
      insuranceAccepted: PropTypes.bool,
      genderAccepted: PropTypes.number,
    })
  ),
  locations: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ).isRequired,
    // certifications missing from lookup references currently
    certifications: PropTypes.arrayOf(PropTypes.shape({})),
    genderTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    facilityTypes: PropTypes.arrayOf(PropTypes.shape({})),
    languages: PropTypes.arrayOf(PropTypes.shape({})),
    locationTypes: PropTypes.arrayOf(PropTypes.shape({})),
    serviceTypes: PropTypes.arrayOf(PropTypes.shape({})),
    specializations: PropTypes.arrayOf(PropTypes.shape({})),
    states: PropTypes.arrayOf(PropTypes.shape({})),
    titleTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),

  // Loki bybass merge
  mergeNow: PropTypes.func,

  setTopText: PropTypes.func,
  setSubHeadingText: PropTypes.func,

  // Loki props
  backLabel: PropTypes.string,
  onBack: PropTypes.func,
  cantBack: PropTypes.bool,
  onNext: PropTypes.func,
  nextLabel: PropTypes.string,
};
