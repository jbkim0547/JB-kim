import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("SpecializationsDataCard");

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

const mapIds = (list) => {
  let output = "";
  const result = list.map((item) => {
    output += item.id;
    return item;
  });
  _logger(result);
  return output;
};

function SpecializationsDataCard({ references, specializations, ...props }) {
  _logger("rendering", props, mapIds(specializations));

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 70,
    },
    {
      field: "name",
      headerName: "Specialization",
      width: 400,
      valueGetter: (params) =>
        `${getName(params.getValue("specializationId")) || ""}`,
    },
    {
      field: "primary",
      headerName: "Is Primary",
      width: 240,
      valueGetter: (params) => `${getBool(params.getValue("isPrimary")) || ""}`,
    },
  ];

  const rows = specializations;

  const getName = (id) => {
    const item = findIdInList(id, references.specializations);
    const name = item?.name ?? null;
    return name;
  };

  const getBool = (value) => {
    let result = "no";
    if (value) {
      result = "YES";
    }
    return result;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      {/* Hellow */}
    </div>
  );
}

SpecializationsDataCard.propTypes = {
  specializations: PropTypes.arrayOf(
    PropTypes.shape({
      specializationId: PropTypes.number,
      isPrimary: PropTypes.bool,
    })
  ),
  references: PropTypes.shape({
    specializations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default SpecializationsDataCard;
