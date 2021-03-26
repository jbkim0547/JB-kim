import React, { Fragment } from "react";
import ProviderDetails from "@components/providers/ProviderDetails";

export default function ProviderDetailsPage(props) {
  return (
    <Fragment>
      <ProviderDetails {...props} />
    </Fragment>
  );
}
