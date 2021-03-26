import React, { Component } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import PropTypes from 'prop-types';


class Alert extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      return <MuiAlert elevation={6} variant="filled" {...this.props} />;
    }
  
  
  }
  
  Alert.propType = {
    severity:PropTypes.string
}

  export default Alert;