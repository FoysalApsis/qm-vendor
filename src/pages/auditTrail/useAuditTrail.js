import { AuditActionIcon } from "../../utils/Icons";

const useAuditTrail = () => {
  const columns = [
    {
      field: "request_number",
      headerName: "No.",
      headerAlign: "center",
      width: "150",
      cellClassName: "ps-3",
    },
    {
      field: "createdby_dn",
      headerName: "Requester",
      headerAlign: "center",
      width: "250",
      cellClassName: "ps-3",
    },
    {
      field: "created_at",
      headerName: "Request Date",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
    },
    {
      field: "Status.name",
      headerName: "Status",
      headerAlign: "center",
      width: "300",
      cellClassName: "ps-3",
    },
    {
      field: "amount",
      headerName: "Amount (CHF)",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-end",
      renderCell: (params) => {
        return (
          <>
            <p className="m-0">{params?.row?.amount?.toFixed(2)}</p>
          </>
        );
      },
    },
    {
      field: "audit_trail",
      headerName: "Audit Trail",
      headerAlign: "center",
      width: "150",
      cellClassName: "justify-content-center",
      renderCell: (params) => {
        return (
          <>
            <a href={`/audit-trail/${params.row.id}`}>
              <AuditActionIcon />
            </a>
          </>
        );
      },
    },
  ];

  return { columns };
};

export default useAuditTrail;
