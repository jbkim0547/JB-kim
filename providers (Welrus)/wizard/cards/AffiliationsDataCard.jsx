import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("AffiliationsDataCard");

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

function AffiliationsDataCard({ references, affiliations, ...props }) {
  _logger("rendering", props);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
    },
    { field: "name", headerName: "Affiliation", width: 400 },
    {
      field: "type",
      headerName: "Affiliation Type",
      width: 240,
      valueGetter: (params) =>
        `${getType(params.getValue("affiliationTypeId")) || ""}`,
    },
  ];

  const rows = affiliations;

  const getType = (id) => {
    const item = findIdInList(id, references.affiliationTypes);
    const name = item?.name ?? null;
    return name;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

AffiliationsDataCard.propTypes = {
  references: PropTypes.shape({
    affiliationTypes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  affiliations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      affiliationTypeId: PropTypes.number,
    })
  ),
};

export default AffiliationsDataCard;
