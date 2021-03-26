import React from "react";
import logger from "sabio-debug";
import * as FaqService from "../../services/faqService";
import * as faqCategoryService from "../../services/faqCategoryService";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Formik } from "formik";

const Accordion = withStyles({
  root: {
    width: "65%",
    border: "1px solid rgba(0, 0, 10, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "dense",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 50,
    "&$expanded": {
      minHeight: 5,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiAccordionDetails);

const _logger = logger.extend("FaqDisplay");

class FaqDisplay extends React.Component {
  state = {
    faqs: "",
    faqCategory: { id: 0 },
  };

  componentDidMount() {
    FaqService.getAll().then(this.getAllSuccess).catch(this.getAllError);
    faqCategoryService
      .getAll()
      .then(this.faqCategoryServiceSuccess)
      .catch(this.faqCategoryServiceError);
  }

  faqCategoryServiceSuccess = (response) => {
    console.log(response.items);

    let faqCategoryData = response.items;

    this.setState(() => ({
      faqCategoryData,
      mappedFaqCategory: faqCategoryData.map(this.mapFaqCategoryPanel),
    }));
  };

  faqCategoryServiceError = (response) => {};

  mapFaqCategoryPanel = (singleFaqCategory) => {
    console.log("mapFaqPanel", singleFaqCategory);

    return (
      <MenuItem key={singleFaqCategory.id} value={singleFaqCategory.id}>
        {singleFaqCategory.name}
      </MenuItem>
    );
  };

  getAllSuccess = (response) => {
    let faqs = response.data.items;

    this.setState((prevState) => ({
      faqs,
      mappedFaqs: faqs.map(this.mapFaqPanel),
    }));
  };

  getAllError = (err) => {
    _logger(err);
  };

  mapFaqPanel = (singleFaq, index) => {
    _logger("mapFaqPanel", singleFaq, index);

    return (
      <div key={`faqp_${index}`}>
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography>{singleFaq.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{singleFaq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  };

  onfaqAdd = () => {
    this.props.history.push("/faqs/new");
  };

  onCategoryChange = (e) => {
    _logger(e.currentTarget.value);
    let catId = e.target.value;
    console.log(catId);

    this.setState((prev) => {
      return {
        mappedFaqs: prev.faqs
          .filter((f) => f.categoryId === parseInt(catId))
          .map(this.mapFaqPanel),
        faqCategory: { id: catId },
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={this.state.faqCategory}
          onSubmit={this.handleSubmit}
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
                <div className="float-center">
                  <FormControl fullWidth={"true"}>
                    <InputLabel htmlFor="categoryId">Category</InputLabel>
                    <Select
                      id="categoryId"
                      name="categoryId"
                      values={values.id}
                      onChange={this.onCategoryChange}
                    >
                      {this.state.mappedFaqCategory}
                    </Select>
                    <FormHelperText>Select a FAQ category</FormHelperText>
                  </FormControl>
                </div>
              </form>
            );
          }}
        </Formik>

        <div>{this.state.mappedFaqs ? this.state.mappedFaqs : "No Data "}</div>
        <Button
          type="submit"
          variant="contained"
          color="default"
          className="m-2"
          onClick={this.onfaqAdd}
        >
          Add FAQ
        </Button>
      </React.Fragment>
    );
  }
}

FaqDisplay.propTypes = {
  match: PropTypes.objectOf({
    params: PropTypes.shape({
      categoryId: PropTypes.number,
    }).isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FaqDisplay;
