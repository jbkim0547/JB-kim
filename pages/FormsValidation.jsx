import React, { Fragment } from "react";
import { PageTitle } from "@layout-components";
import { WrapperSimple } from "@layout-components";
import FormsValidationBasic from "@components/forms/FormsValidationBasic";
import debug from "sabio-debug";

const _logger = debug.extend("FormsValidation");

export default function FormsValidation() {
  _logger("rendering");
  return (
    <Fragment>
      <PageTitle
        titleHeading="Validation"
        titleDescription="Inline validation is very easy to implement using our UI framework."
      />
      <WrapperSimple sectionHeading="Basic">
        <FormsValidationBasic />
      </WrapperSimple>
    </Fragment>
  );
}
