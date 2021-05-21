// This is a test component

import React from "react";
import FileUploader from "./FileUpload";
import logger from "sabio-debug";

const _logger = logger.extend("FileUploadExample");

const FileUploadTester = () => {
  const uploadSuccess = (response) => {
    _logger(response);
  };

  return <FileUploader isMultiple={true} onUploadSuccess={uploadSuccess} buttonText=""/>;
};

export default FileUploadTester;
