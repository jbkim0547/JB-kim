import React, { Component } from "react";
import PropTypes from "prop-types";
import providerDetailsService from "@services/providerDetailsService";
import Swal from "sweetalert2";
// icons
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import InfoIcon from "@material-ui/icons/Info";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import CollectionsBookmarkOutlinedIcon from "@material-ui/icons/CollectionsBookmarkOutlined";
import HdrStrongIcon from "@material-ui/icons/HdrStrong";
import BusinessIcon from "@material-ui/icons/Business";
import LanguageIcon from "@material-ui/icons/Language";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import StarsIcon from "@material-ui/icons/Stars";
import StarIcon from "@material-ui/icons/Star";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";
// wizard controller
import Loki from "react-loki";
// in wizard order:
import WizardInfo from "@components/providers/wizard/WizardInfo";
import ProviderDetails from "@components/providers/wizard/ProviderDetails";
import PracticeLocations from "@components/providers/wizard/PracticeLocations";
import ProviderPractices from "@components/providers/wizard/ProviderPractices";
import LicenseDetails from "@components/providers/wizard/subforms/LicenseDetails";
import CertificationDetails from "@components/providers/wizard/subforms/CertificationDetails";
import SpecializationDetails from "@components/providers/wizard/subforms/SpecializationDetails";
import ExpertiseDetails from "@components/providers/wizard/subforms/ExpertiseDetails";
import AffiliationDetails from "@components/providers/wizard/subforms/AffiliationDetails";
import ProviderLanguageDetails from "@components/providers/wizard/subforms/ProviderLanguageDetails";
import PracticeLanguageDetails from "@components/providers/wizard/subforms/PracticeLanguageDetails";
import Verify from "@components/providers/wizard/Verify";

import debug from "sabio-debug";
const _logger = debug.extend("ProviderForm");

class ProviderForm extends Component {
  constructor(props) {
    super(props);
    _logger("rendering");
    this.state = {
      provider: {
        providerId: 0,
        userProfileId: 0,
        // final wizard data verification
        hasVerified: false,
        // details
        titleTypeId: 0,
        genderTypeId: 0,
        phone: "",
        fax: "",
        networks: "",
        npi: "",
        genderAccepted: 0,
        isAccepting: false,
        // lists
        affiliations: [],
        certifications: [],
        expertise: [],
        languages: [],
        licenses: [],
        locations: [],
        practices: [],
        practiceLanguages: [],
        specializations: [],
      },
    };
  }

  componentDidMount() {
    // must create a user profile before creating a provider profile
    if (this.props?.currentUser?.id && this.props.currentUser.profileId) {
      this.setState((prevState) => {
        return {
          ...prevState,
          provider: {
            ...prevState.provider,
            userProfileId: this.props.currentUser.profileId,
          },
        };
      }, this.checkProvider);
    } else {
      this.notifyUserCannotStartWizard();
    }
  }

  //--------------------------------------- LOKI WIZARD ACTIONS
  getLimitedProvider = () => {
    const providerDetails = {
      titleTypeId: this.state.provider.titleTypeId,
      genderTypeId: this.state.provider.genderTypeId,
      phone: this.state.provider.phone,
      fax: this.state.provider.fax,
      networks: this.state.provider.networks,
      npi: this.state.provider.npi,
      genderAccepted: this.state.provider.genderAccepted,
      isAccepting: this.state.provider.isAccepting,
    };
    _logger("provider details object", providerDetails);
    return providerDetails;
  };

  _mergeValues = (values) => {
    if (values) {
      _logger("mergeValues", values);
      if (values.networks) {
        _logger("providerDetails found");
        this.updateProviderDetails(values);
      } else {
        this.setState({
          provider: {
            ...this.state.provider,
            ...values,
          },
        });
      }
    }
  };

  updateProviderDetails = (values) => {
    _logger("updateProviderDetails values", values);

    this.setState((prevState) => {
      return {
        ...prevState,
        provider: {
          ...prevState.provider,
          titleTypeId: values.titleTypeId,
          genderTypeId: values.genderTypeId,
          phone: values.phone,
          fax: values.fax,
          networks: values.networks,
          npi: values.npi,
          genderAccepted: values.genderAccepted,
          isAccepting: values.isAccepting,
        },
      };
    });
  };

  _goBack = () => {
    _logger("back button", this.state.provider);
    return;
  };

  onFormSubmit = () => {
    if (this.state.provider.providerId > 0) {
      _logger("finishWizard, editing provider");
    } else {
      _logger("finishWizard, adding provider");
      this.addProvider();
    }
  };

  _finishWizard = () => {
    _logger("navigating away");
    this.notifyUserCreateProviderSuccess();
  };

  //--------------------------------------- SERVICE CALLS
  checkProvider = () => {
    providerDetailsService
      .getCurrentProvider()
      .then(this.checkProviderIdSuccess)
      .catch(this.checkProviderIdError);
  };

  checkProviderIdSuccess = (data) => {
    _logger("checkProviderIdSuccess", data);
    if (data.item.id > 0) {
      // if the provider already has a providerId, don't let them use wizard
      this.notifyUserCannotUseWizard(data.item.id);
    }
  };

  checkProviderIdError = (err) => {
    _logger("checkProviderIdSuccess", err);
    // This is the expected path if the provider does not have a providerId
    // This will need to be re-wickered so the response to continue is a controlled positive response
  };

  addProvider = () => {
    _logger("initiating add request", this.state.provider);

    providerDetailsService
      .add(this.state.provider)
      .then(this.onAddSuccess)
      .catch(this.onAddError);
  };

  onAddSuccess = (data) => {
    _logger(data);
    this.setState((prevState) => {
      return {
        ...prevState,
        provider: { ...prevState.provider, providerId: data.item },
      };
    }, this._finishWizard);
  };

  onAddError = (err) => {
    _logger("adding provider error:", err);
    this.notifyUserCreateProviderFailure(err);
  };

  //--------------------------------------- USER ALERTS
  notifyUserCannotUseWizard = (id) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        "You have already loaded your inital provider info. The Provider Dashboard will have tools that will let you edit and add more info to your provider profile.. Redirecting you now.",
      // timer: 8000,
    }).then(() => {
      this.props.history.push(`/provider/${id}/dashboard`);
    });
  };

  notifyUserCannotStartWizard = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        "You need to load your user profile information before entering provider info. Redirecting you now.",
      timer: 5000,
    }).then((result) => {
      this.props.history.push("/users/profiles/new");
    });
  };

  notifyUserCreateProviderFailure = (errors) => {
    Swal.fire({
      icon: "error",
      title: "Unable to load provider info, you can edit and try again",
      text: errors,
      confirmButtonText: `Ok`,
    }).then((result) => {});
  };

  notifyUserCreateProviderSuccess = () => {
    const inputOptions = {
      schedule: "Next Step: Scheduler",
      dashboard: "Dashboard",
      details: "Customer View",
    };

    Swal.fire({
      icon: "success",
      title: "Provider details successfully loaded. Where to next?",
      input: "radio",
      value: "route",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      },
    }).then((result) => {
      _logger("swal radio", result);
      let nextRoute = "/";

      if (result.value === "dashboard") {
        nextRoute = `/provider/${this.state.provider.providerId}/dashboard`;
      } else if (result.value === "details") {
        nextRoute = `/provider/${this.state.provider.providerId}/details`;
      } else if (result.value === "schedule") {
        nextRoute = `/schedule`;
      }

      this.props.history.push(nextRoute, {
        type: "PROVIDER_ADD_DETAILS",
        providerId: this.state.provider.providerId, // temp reference until gaining pages can adjust to payload reference
        payload: { provider: this.state.provider },
      });
    });
  };

  //--------------------------------------- UI, RENDERING, and LOKI

  render() {
    const steps = [
      {
        // FINAL ORDER: 1
        label: "Provider Details Verification",
        icon: <InfoIcon />,
        component: (
          <WizardInfo
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 2
        label: "Provider Contact Details",
        icon: <LocalPhoneIcon />,
        component: (
          <ProviderDetails
            providerDetails={this.getLimitedProvider()}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 3
        label: "Provider: Languages",
        icon: <LanguageIcon />,
        component: (
          <ProviderLanguageDetails
            languages={this.state.provider.languages}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 4
        label: "Provider: Practice Locations",
        icon: <AddLocationIcon />,
        component: (
          <PracticeLocations
            locations={this.state.provider.locations}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 5
        label: "Provider: Practice Details",
        icon: <BusinessIcon />,
        component: (
          <ProviderPractices
            practices={this.state.provider.practices}
            references={this.props.references}
            locations={this.state.provider.locations}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 6
        label: "Practice: Languages",
        icon: <LanguageIcon />,
        component: (
          <PracticeLanguageDetails
            practiceLanguages={this.state.provider.practiceLanguages}
            practices={this.state.provider.practices}
            locations={this.state.provider.locations}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 7
        label: "Provider: License Details",
        icon: <StarsIcon />,
        component: (
          <LicenseDetails
            licenses={this.state.provider.licenses}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 8
        label: "Provider: Certification Details",
        icon: <CollectionsBookmarkOutlinedIcon />,
        component: (
          <CertificationDetails
            certifications={this.state.provider.certifications}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 9
        label: "Provider: Specialization Details",
        icon: <StarIcon />,
        component: (
          <SpecializationDetails
            specializations={this.state.provider.specializations}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 10
        label: "Provider: Expertise Details",
        icon: <HdrStrongIcon />,
        component: (
          <ExpertiseDetails
            expertise={this.state.provider.expertise}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 11
        label: "Provider: Affiliation Details",
        icon: <SupervisedUserCircleIcon />,
        component: (
          <AffiliationDetails
            affiliations={this.state.provider.affiliations}
            references={this.props.references}
            mergeNow={this._mergeValues}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
          />
        ),
      },
      {
        // FINAL ORDER: 12
        label: "Provider Details Verification",
        icon: <OfflinePinIcon />,
        component: (
          <Verify
            hasVerified={this.state.provider.hasVerified}
            currentUser={this.props.currentUser}
            provider={this.state.provider}
            providerDetails={this.getLimitedProvider()}
            affiliations={this.state.provider.affiliations}
            certifications={this.state.provider.certifications}
            licenses={this.state.provider.licenses}
            locations={this.state.provider.locations}
            practices={this.state.provider.practices}
            references={this.props.references}
            setTopText={this.props.setTopText}
            setSubHeadingText={this.props.setSubHeadingText}
            handleFinish={this.onFormSubmit}
          />
        ),
      },
    ];

    return (
      <Loki
        steps={steps}
        onNext={this._mergeValues}
        onBack={this._goBack}
        onFinish={this._finishWizard}
        noActions
      />
    );
  }
}

export default ProviderForm;

ProviderForm.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    profileId: PropTypes.number,
  }),
  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
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
  setTopText: PropTypes.func.isRequired,
  setSubHeadingText: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
