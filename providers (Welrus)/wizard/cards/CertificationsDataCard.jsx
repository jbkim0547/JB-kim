import React from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@material-ui/data-grid";

import debug from "sabio-debug";
const _logger = debug.extend("CertificationsDataCard");

const findIdInList = (idToFind, listToSearch) => {
  const result = listToSearch.find((singleRecord) => {
    return singleRecord.id === idToFind;
  });
  return result;
};

function CertificationsDataCard({ references, certifications, ...props }) {
  _logger("rendering", props);

  const columns = [
    { field: "certificationId", headerName: "Id", width: 70 },
    {
      field: "name",
      headerName: "Certification",
      width: 450,
      valueGetter: (params) =>
        `${getName(params.getValue("certificationId")) || ""}`,
    },
  ];

  const rows = certifications;

  const getName = (id) => {
    const item = findIdInList(id, references.certifications);
    const name = item?.name ?? null;
    return name;
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}

CertificationsDataCard.propTypes = {
  references: PropTypes.shape({
    certifications: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
  }),
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      certificationId: PropTypes.number,
    })
  ),
};

export default CertificationsDataCard;
