import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import logger from "sabio-debug";
import PropTypes from "prop-types";

const _logger = logger.extend("FileModal");

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 1),
    borderRadius: "6px",
  },
}));

export default function FilesModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  _logger(props);
  let url = props.uploadedValues.uploadedUrl;
  let type = props.uploadedValues.uploadedFileType;

  let fileUrl = url.replace(/\s/g, "%20");
  let fileType = type.toLowerCase();

  _logger("Modal Firing", fileUrl, fileType);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {fileType === "jpg" ||
      fileType === "png" ||
      fileType === "jpeg" ||
      fileType === "bmp" ||
      fileType === "gif" ? (
        <>
          <p
            type="button"
            onClick={handleOpen}
            style={{ fontWeight: "bold", fontSize: "12px" }}
          >
            View Image
          </p>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <img
                  style={{ maxWidth: "60vw", maxHeight: "50vh" }}
                  src={fileUrl ? fileUrl : null}
                  alt="src"
                />
              </div>
            </Fade>
          </Modal>{" "}
        </>
      ) : (
        false
      )}
    </div>
  );
}

FilesModal.propTypes = {
  uploadedValues: PropTypes.shape({
    uploadedFileType: PropTypes.string.isRequired,
    uploadedUrl: PropTypes.string.isRequired,
  }),
};
