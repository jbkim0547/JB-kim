import React, { Fragment, Component } from "react";
import { WrapperSimple } from "../../layouts";
import MuiAlert from "@material-ui/lab/Alert";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  Snackbar,
  TextField,
} from "@material-ui/core";
import faqSchema from "../../schema/faqSchema";
import { Formik } from "formik";
import logger from "sabio-debug";
import * as FaqService from "../../services/faqService";
import * as faqCategoryService from "../../services/faqCategoryService";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";

const _logger = logger.extend("AddFaqForm");

class AddFaq extends Component {
  state = {
    snackBarShowCategory: false,
    snackBarShow: false,
    snackBarShowCategoryList: false,
    severity: "success",
    barMessage: "",
    faqFormData: {
      SortOrder: 1,
      CreatedBy: 1,
      Question: "",
      Answer: "",
      categoryId: 0,
    },
    faqCategoryData: null,
    name: "",
    showFaqCategoryAdd: false,
    open: false,
  };

  componentDidMount() {
    faqCategoryService
      .getAll()
      .then(this.faqCategoryServiceSuccess)
      .catch(this.faqCategoryServiceError);
  }

  faqCategoryServiceSuccess = (response) => {
    _logger({ response: response.items });
    let faqCategoryData = response.items;

    this.setState(() => ({
      faqCategoryData,
      mappedFaqCategory: faqCategoryData.map(this.mapFaqPanel),
    }));
  };

  faqCategoryServiceError = (response) => {
    _logger({ error: response });

    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShowCategoryList: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  getFormHelperText = (errorField, touchedField) => {
    if (errorField && touchedField) {
      return <FormHelperText>Please correct error</FormHelperText>;
    }
    return <FormHelperText>&nbsp;</FormHelperText>;
  };

  handleSubmit = (values, { resetForm }) => {
    _logger(values);
    const payload = {
      ...values,
    };
    FaqService.add(payload).then(this.addSuccess).catch(this.addError);
    resetForm(this.state.faqFormData);
  };

  addSuccess = (response) => {
    _logger("post FAQ success", response.items);

    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "New FAQ posted.",
        severity: "success",
      };
    });
  };

  addError = (err) => {
    _logger("New FAQ err", err);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState((prevState) => {
      this.props.history.push("/faqs");
      return {
        ...prevState,
        snackbarShow: false,
      };
    });
  };

  handleCloseforCategory = (event, reason) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShowCategory: false,
      };
    });
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  categoryAdd = () => {
    this.setState({
      showFaqCategoryAdd: !this.state.showFaqCategoryAdd,
    });
  };

  onChangeFaqCategory = (e) => {
    let currentTarget = e.currentTarget;
    let newValue = currentTarget.value;
    let inputName = currentTarget.name;

    this.setState(() => {
      let newState = {};
      newState[inputName] = newValue;

      console.log("newState", newState.name);

      return newState;
    });
  };

  faqCategoryAdd = () => {
    let newCategory = { name: this.state.name };

    faqCategoryService
      .add(newCategory)
      .then(this.onFaqCategoryAddSuccess)
      .catch(this.onFaqCategoryAddError);
  };

  onFaqCategoryAddSuccess = (response) => {
    _logger({ response: response.data });
    let newCategory = { name: this.state.name, id: response.item };

    this.setState((prevState) => {
      let updatedCategory = null;

      updatedCategory = [...prevState.faqCategoryData, newCategory];

      return {
        ...prevState,
        snackBarShowCategory: true,
        barMessage: "New FAQ posted.",
        severity: "success",

        name: "",

        faqCategoryData: updatedCategory,
        mappedFaqCategory: updatedCategory.map(this.mapFaqPanel),
        showFaqCategoryAdd: !this.state.showFaqCategoryAdd,
      };
    });
  };

  onFaqCategoryAddError = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        snackBarShowCategory: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  mapFaqPanel = (singleFaqCategory) => {
    _logger("mapFaqPanel", singleFaqCategory);

    return (
      <MenuItem value={singleFaqCategory.id}>{singleFaqCategory.name}</MenuItem>
    );
  };

  render() {
    return (
      <Fragment>
        <WrapperSimple sectionHeading="Frequently Asked Questions">
          <Formik
            initialValues={this.state.faqFormData}
            onSubmit={this.handleSubmit}
            validationSchema={faqSchema}
          >
            {(formikProps) => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
              } = formikProps;
              return (
                <form validate autoComplete="off" onSubmit={handleSubmit}>
                  <div>
                    <FormControl fullWidth={"true"}>
                      <InputLabel htmlFor="categoryId">Category</InputLabel>
                      <Select
                        id="categoryId"
                        name="categoryId"
                        values={values.categoryId}
                        onChange={handleChange}
                      >
                        {this.state.mappedFaqCategory}
                      </Select>
                      <FormHelperText>Select a FAQ category</FormHelperText>
                    </FormControl>
                  </div>

                  <div style={{ flexDirection: "row" }}>
                    <Button
                      size="small"
                      variant="contained"
                      color="default"
                      className="m-2"
                      onClick={this.categoryAdd}
                    >
                      Add Category
                    </Button>

                    {this.state.showFaqCategoryAdd ? (
                      <React.Fragment>
                        <TextField
                          label="FaqCategory"
                          id="name"
                          name="name"
                          value={this.state.name}
                          onChange={this.onChangeFaqCategory}
                          size="small"
                        />
                        <Button
                          onClick={this.faqCategoryAdd}
                          variant="outlined"
                          size="small"
                        >
                          Create
                        </Button>
                      </React.Fragment>
                    ) : null}
                  </div>
                  <div>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="Question"
                        id="Question"
                        name="Question"
                        values={values.Question}
                        onChange={handleChange}
                        multiline={true}
                        rowsMax={2}
                        aria-label="Maximum Height"
                        placeholder="Enter question here"
                        helperText={touched.Question && errors.Question}
                        error={errors.Question}
                      />
                      <FormHelperText>
                        {this.getFormHelperText(
                          errors.Question,
                          touched.Question
                        )}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl fullWidth={true}>
                      <TextField
                        label="Answer"
                        id="Answer"
                        name="Answer"
                        values={values.Answer}
                        onChange={handleChange}
                        multiline={true}
                        rowsMax={4}
                        aria-label="Maximum Height"
                        placeholder="Enter answer here"
                        helperText={touched.Answer && errors.Answer}
                        error={errors.Answer}
                      />
                      <FormHelperText>
                        {this.getFormHelperText(errors.Answer, touched.Answer)}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl fullWidth={true}>
                      <div></div>
                    </FormControl>
                  </div>

                  <div>
                    <div>
                      <span></span>
                    </div>
                  </div>
                  <div style={{ flexDirection: "row" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="default"
                      className="m-2"
                    >
                      Add FAQ
                    </Button>
                  </div>
                </form>
              );
            }}
          </Formik>
        </WrapperSimple>

        <Snackbar
          open={this.state.snackbarShow}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert onClose={this.handleClose} severity="success">
            FAQ added successfully!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={this.state.snackBarShowCategory}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MuiAlert onClose={this.handleCloseforCategory} severity="success">
            FAQ Category added successfully!
          </MuiAlert>
        </Snackbar>
      </Fragment>
    );
  }
}

AddFaq.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.shape({
      categoryId: PropTypes.number,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default AddFaq;
