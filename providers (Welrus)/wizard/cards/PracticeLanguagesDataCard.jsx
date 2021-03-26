import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("PracticeLanguagesDataCard");

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

function PracticeLanguagesDataCard({ references, languages, ...props }) {
  _logger("rendering", props);

  const columns = [
    { field: "id", headerName: "Id", width: 70 },
    { field: "languageId", headerName: " Language Id", width: 140 },
    {
      field: "code",
      headerName: "Code",
      width: 120,
      valueGetter: (params) =>
        `${getCode(params.getValue("languageId")) || ""}`,
    },
    {
      field: "name",
      headerName: "Language",
      width: 240,
      valueGetter: (params) =>
        `${getName(params.getValue("languageId")) || ""}`,
    },
  ];

  const rows = languages;

  const getCode = (id) => {
    let code = "error";
    if (id && references.languages) {
      const item = findIdInList(id, references.languages);
      code = item?.code ?? null;
    }
    return code;
  };

  const getName = (id) => {
    const item = findIdInList(id, references.languages);
    const name = item?.name ?? null;
    return name;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={10} />
    </div>
  );
}

PracticeLanguagesDataCard.propTypes = {
  references: PropTypes.shape({
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        code: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  languages: PropTypes.arrayOf(
    PropTypes.shape({ languageId: PropTypes.number })
  ),
};

export default PracticeLanguagesDataCard;
