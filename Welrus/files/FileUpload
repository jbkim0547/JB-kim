import React, { useState } from "react";
import * as fileServices from "../../services/fileService";
import { Button } from "@material-ui/core";
import AddToPhotosOutlinedIcon from "@material-ui/icons/AddToPhotosOutlined";
import toastr from "toastr";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import FilesModal from "./FileModal";

const _logger = logger.extend("FileUpload");

const FileUploader = (props) => {
  _logger(props);

  const [uploadDetails, setUploadDetails] = useState(null);

  toastr.options = {
    onclick: null,
    fadeIn: 300,
    fadeOut: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    positionClass: "toast-top-center",
  };

  const onFileDrop = (e) => {
    _logger(e.target.files);
    onUpload(e.target.files);
  };

  const onUpload = (files) => {
    if (files.length > 10) {
      toastr.warning("Can only upload up to 10 files");
      return;
    } else if (files.length >= 1) {
      let formData = new FormData();
      for (let index = 0; index < files.length; index++) {
        const element = files[index];
        const fileNames = files[index].name;
        _logger(fileNames);

        formData.append(`files`, element);
      }
      fileServices
        .uploader(formData)
        .then(onFileUploadSuccess)
        .catch(onFileUploadError);
    }
  };

  const onFileUploadSuccess = (response) => {
    _logger("file upload success:", response.items);
    toastr.success("Upload Successful");

    props.onUploadSuccess(response.items);

    let uploadedFilesArr = response.items;
    let fileGroup = uploadedFilesArr.map(mapFiles);

    setUploadDetails(fileGroup);
  };

  const mapFiles = (arr) => {
    let uploadedUrl = arr.url;
    let uploadedFile = arr.fileName;
    let uploadedFileType = arr.fileType;
    let maxLength = 35;

    if (uploadedFile.length > maxLength) {
      uploadedFile = uploadedFile.substr(0, 35) + "...";
    }

    return (
      <div
        key={uploadedUrl}
        className="row"
        style={{
          float: "left",
          marginLeft: "15px",
          marginRight: "10px",
        }}
      >
        <div className="column">
          <div>
            {" "}
            {uploadedFile}
            <FilesModal uploadedValues={{ uploadedUrl, uploadedFileType }} />
          </div>
        </div>
      </div>
    );
  };

  const onFileUploadError = (err) => {
    toastr.error("Encountered Error Uploading");
    _logger("file upload error:", err);
  };

  return (
    <React.Fragment>
      {props.isMultiple ? (
        <>
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "rgb(59 62 96)",
                marginLeft: "10px",
                marginTop: "10px",
              }}
              component="span"
              startIcon={<AddToPhotosOutlinedIcon />}
            >
              {props.buttonText && props.buttonText !== "Upload"
                ? props.buttonText
                : "Upload"}
            </Button>
          </label>
          <input
            onChange={onFileDrop}
            type="file"
            id="icon-button-file"
            multiple
            hidden
          />
        </>
      ) : (
        <>
          <label htmlFor="icon-button-file">
            <Button
              variant="contained"
              style={{
                color: "white",
                fontWeight: "bold",
                backgroundColor: "rgb(59 62 96)",
              }}
              component="span"
              startIcon={<AddToPhotosOutlinedIcon />}
            >
              {props.buttonText && props.buttonText !== "Upload"
                ? props.buttonText
                : "Upload"}
            </Button>
          </label>
          <input
            onChange={onFileDrop}
            type="file"
            id="icon-button-file"
            hidden
          />
        </>
      )}

      {uploadDetails !== null ? (
        <div style={{ width: "50vw" }}>
          <label>
            <span
              style={{
                color: "#3b3e66",
                fontWeight: "bold",
                marginLeft: "15px",
              }}
            >
              Files Uploaded:
            </span>
            <div>{uploadDetails}</div>
          </label>{" "}
        </div>
      ) : (
        false
      )}
    </React.Fragment>
  );
};

FileUploader.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
};

export default FileUploader;
