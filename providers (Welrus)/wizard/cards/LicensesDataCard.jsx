import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("LicensesDataCard");

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function LicensesDataCard({ references, licenses, ...props }) {
  _logger("rendering", props);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
    },
    { field: "name", headerName: "License", width: 360 },
    {
      field: "licenseNumber",
      headerName: "Number",
      width: 200,
    },
    {
      field: "state",
      headerName: "State",
      width: 200,
      valueGetter: (params) =>
        `${getState(params.getValue("licenseStateId")) || ""}`,
    },
    {
      field: "expires",
      headerName: "Expiration Date",
      width: 200,
      valueGetter: (params) =>
        `${getDate(params.getValue("dateExpires")) || ""}`,
    },
  ];

  const rows = licenses;

  const getState = (id) => {
    const item = findIdInList(id, references.states);
    const name = item?.name ?? null;
    return name;
  };
  const getDate = (dateStr) => {
    let result = "invalid date";
    if (dateStr) {
      const date = new Date(dateStr);
      result = `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
    }
    return result;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

LicensesDataCard.propTypes = {
  licenses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      licenseStateId: PropTypes.number,
      licenseNumber: PropTypes.string,
      dateExpires: PropTypes.instanceOf(Date),
    })
  ),
  references: PropTypes.shape({
    states: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default LicensesDataCard;
