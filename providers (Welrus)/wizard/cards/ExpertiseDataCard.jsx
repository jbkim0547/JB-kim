import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("ExpertiseDataCard");

function ExpertiseDataCard({ expertise, ...props }) {
  _logger("rendering", props);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
    },
    { field: "name", headerName: "Expertise", width: 400 },
    {
      field: "description",
      headerName: "Description",
      width: 600,
    },
  ];

  const rows = expertise;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

ExpertiseDataCard.propTypes = {
  expertise: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

export default ExpertiseDataCard;
