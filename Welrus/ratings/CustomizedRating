import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import styles from "../../assets/styles/blog.module.css";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Useless",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Poor",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Ok",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Good",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Excellent",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

class CustomizedRatings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
  }

  onChangeActive = (event, newHover) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        hover: newHover,
      };
    });
  };

  getLabel = () => {
    const labels = Object.values(customIcons).map((icon) => icon.label);
    const { hover } = this.state;
    const { value } = this.props;
    return labels[hover !== -1 ? hover - 1 : value - 1];
  };

  getLabelText = (value) => {
    if (!this.props.readOnly) {
      return customIcons[value].label;
    }
  };

  render() {
    return (
      <div className={styles.ratingWrapper}>
        <Rating
          style={{ color: this.props.color }}
          readOnly={this.props.readOnly}
          name="hover-feedback"
          value={this.props.value}
          getLabelText={this.getLabelText}
          IconContainerComponent={IconContainer}
          onChange={this.props.onChange}
          onChangeActive={this.onChangeActive}
        />
        {this.props.showLabel && this.props.value !== null && (
          <Box ml={2} className={styles.ratingLabel}>
            {this.getLabel()}
          </Box>
        )}
      </div>
    );
  }
}

CustomizedRatings.defaultProps = {
  showLabel: true,
  color: "#1976d2",
};

CustomizedRatings.propTypes = {
  showLabel: PropTypes.bool,
  color: PropTypes.string,
  value: PropTypes.number,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CustomizedRatings;
