import React, { Fragment, Component } from "react";
import { WrapperSimple } from "../../layouts";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  Input,
  Button,
  FormHelperText,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { Link } from "react-router-dom";
import FormsEditor from "./FormsEditor";
import { Formik } from "formik";
import logger from "sabio-debug";
import styles from "../../assets/styles/blog.module.css";
import * as blogService from "../../services/blogService";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import Alert from "../../assets/components/Alert";
import PropTypes from "prop-types";
import DateFnsUtils from '@date-io/date-fns';
import FileUpload from "../../components/files/FileUpload";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const _logger = logger.extend("BlogForm");

class PostBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarShow: false,
      severity: "success",
      barMessage: "",
      formData: {
        blogTypeId: 0,
        title: "",
        subject: "",
        content: "",
        imageUrl: [],
        datePublish: new Date(),
        isPublished: null,
      },
      editorState: EditorState.createEmpty(),
      open: false
    };
  }

  componentDidMount() {
    this.editBlogForm();
  }

  editBlogForm = () => {
    const editBlogPayload = this.props?.location?.state?.payload;

    if (editBlogPayload) {
      this.setState((prevState) => {
        return {
          ...prevState,
          formData: {
            ...editBlogPayload
          },
        }
      })
    }
  }

  getBlogSuccess = (response) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: response.item,
      };
    });
  };

  getBlogError = (errResponse) => {
    _logger(errResponse.message);
  };

  handleSubmit = (values, { resetForm }) => {
    debugger
    const editBlogPayload = this.props?.location?.state?.payload;
    _logger("-----submit button is firing----");

    const payload = {
      blogTypeId: values.blogTypeId,
      title: values.title,
      subject: values.subject,
      content: values.content,
      isPublished: values.isPublished === "true" ? true : false,
      imageUrl: String(values.imageUrl),
      datePublish: new Date().toISOString(),
    };

    const editPayload = {
      id: parseInt(values.id),
      blogTypeId: values.blogTypeId,
      title: values.title,
      subject: values.subject,
      content: values.content,
      isPublished: values.isPublished === "true" ? true : false,
      imageUrl: String(values.imageUrl),
      datePublish: new Date().toISOString(),
    };

    if (editBlogPayload) {
      blogService
        .updateBlog(editPayload)
        .then(this.updateBlogSuccess)
        .catch(this.updateBlogError)
    } else {

      blogService
        .postBlog(payload)
        .then(this.postBlogSuccess)
        .catch(this.postBlogError);
    }

    resetForm(this.state.formData);
  };

  mapImage = (url) => {
    return <img src={url} />
  }

  postBlogSuccess = (response) => {
    _logger("post blog success", response);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "New blog posted.",
        severity: "success",
      };
    });
  };

  postBlogError = (err) => {
    _logger("New blog err", err);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  updateBlogSuccess = (response) => {
    _logger("update blog success", response);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Blog updated successfully.",
        severity: "success",
      };
    });
  };

  updateBlogError = (err) => {
    _logger("Update blog err", err);
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: true,
        barMessage: "Encountered Error",
        severity: "error",
      };
    });
  };

  getFormHelperText = (errorField, touchedField) => {
    if (errorField && touchedField) {
      return <FormHelperText>You must enter a value</FormHelperText>;
    }
    return <FormHelperText>&nbsp;</FormHelperText>;
  };

  getRadioButtonHelperText = (errorField, touchedField) => {
    if (errorField && touchedField) {
      return <FormHelperText>You must select an option</FormHelperText>;
    }
    return <FormHelperText>&nbsp;</FormHelperText>;
  };

  fileUploadResponse = (response, setFieldValue) => {
    const urls = response.map(this.mapFileUrl);
    _logger(response)
    setFieldValue('imageUrl', urls);
  }

  mapFileUrl = (file) => {
    return file.url;
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState((prevState) => {
      return {
        ...prevState,
        snackbarShow: false,
      };
    });
  };

  editorChange = (editorState, setFieldValue) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        editorState,
      };
    });
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setFieldValue("content", content);
  };

  datePickerStatus = (status) => {
    this.setState(prevState => {
      return {
        ...prevState,
        open: status
      }
    });
  }

  datePickerOnClick = () => {
    this.datePickerStatus(true)
  }

  datePickerOnClose = () => {
    this.datePickerStatus(false)
  }

  onDraftClicked = () => {
    return (
      <Link to="/blog/drafts">
        <Button variant="contained" color="secondary" size="medium">
          <FolderOpenIcon />
          <span>Drafts</span>
        </Button>
      </Link>
    );
  };

  render() {
    return (
      <Fragment>
        <WrapperSimple
          sectionHeading="Post Blog"
          rightContent={this.onDraftClicked()}
        >
          <Formik
            enableReinitialize="true"
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
          >
            {(formikProps) => {
              const {
                values,
                touched,
                errors,
                handleSubmit,
                handleChange,
                setFieldValue,
                isSubmitting,
              } = formikProps;
              return (
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <div className={styles.formControlWrapper}>
                    <FormControl
                      fullWidth
                      error={errors.blogTypeId && touched.blogTypeId}
                    >
                      <InputLabel htmlFor="blogTypeId">Blog Type</InputLabel>
                      <Select
                        id="blogTypeId"
                        value={values.blogTypeId}
                        fullWidth
                        name="blogTypeId"
                        onChange={handleChange}
                      >
                        <MenuItem value={1}>Health</MenuItem>
                        <MenuItem value={2}>Life Style</MenuItem>
                        <MenuItem value={3}>Fitness</MenuItem>
                      </Select>
                      <FormHelperText>
                        {this.getFormHelperText(errors.blogTypeId, touched.blogTypeId)}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className={styles.formControlWrapper}>
                    <FormControl
                      fullWidth
                      error={errors.title && touched.title}
                    >
                      <InputLabel htmlFor="blogTitle">Title</InputLabel>
                      <Input
                        id="blogTitle"
                        name="title"
                        fullWidth
                        value={values.title}
                        onChange={handleChange}
                      />
                      {this.getFormHelperText(errors.title, touched.title)}
                    </FormControl>
                  </div>
                  <div className={styles.formControlWrapper}>
                    <FormControl
                      fullWidth
                      error={errors.subject && touched.subject}
                    >
                      <InputLabel htmlFor="subject">Subject</InputLabel>
                      <Input
                        id="subject"
                        name="subject"
                        fullWidth
                        value={values.subject}
                        onChange={handleChange}
                      />
                      {this.getFormHelperText(errors.subject, touched.subject)}
                    </FormControl>
                  </div>
                  <FileUpload onUploadSuccess={(response) => this.fileUploadResponse(response, setFieldValue)} isMultiple={true} />
                  <div>
                    {
                      values.imageUrls ? values.imageUrls.map(this.mapImage) : <img src={values.imageUrl} />
                    }
                  </div>
                  <div className={styles.editorWrapper}>
                    <FormsEditor
                      editorState={this.state.editorState}
                      onChange={(state) => this.editorChange(state, setFieldValue)}
                    />
                  </div>
                  <div className={styles.formControlWrapper}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="datePublish"
                        autoOk
                        label="Date Publish"
                        value={values.datePublish}
                        open={this.state.open}
                        onChange={(value) => setFieldValue("datePublish", value)}
                        onClick={this.datePickerOnClick}
                        onClose={this.datePickerOnClose}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }} />
                    </MuiPickersUtilsProvider>
                  </div>
                  <FormControl component="fieldset" error={errors.isPublished && touched.isPublished}>
                    <FormLabel component="legend">Select an option:</FormLabel>
                    <RadioGroup aria-label="publishOption" name="isPublished" value={values.isPublished} onChange={handleChange}>
                      <FormControlLabel value="true" control={<Radio />} label="Post Blog" />
                      <FormControlLabel value="false" control={<Radio />} label="Save as Draft" />
                    </RadioGroup>
                    {this.getRadioButtonHelperText(errors.isPublished, touched.isPublished)}
                  </FormControl>
                  <div>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      Submit
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
          onClose={this.handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={this.state.severity}>{this.state.barMessage}</Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

PostBlog.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      blogId: PropTypes.number
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      payload: PropTypes.shape({
        id: PropTypes.string,
        blogTypeId: PropTypes.number,
        title: PropTypes.string,
        subject: PropTypes.string,
        content: PropTypes.string,
        imageUrl: PropTypes.string,
        isPublished: PropTypes.bool,
        avatarUrl: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      }),
      type: PropTypes.string
    }),
  })
};

export default PostBlog;
