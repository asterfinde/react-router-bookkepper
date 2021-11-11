import { useParams, useNavigate } from "react-router-dom";
import { getInvoice, deleteInvoice } from "../data";

export default function Invoice() {
  let navigate = useNavigate();
  let params = useParams();

  // From: '<Route path=":invoiceId" element={<Invoice />} />' in main.jsx
  // where routing to corresponding components
  // To: 'params.invoiceId'
  let invoice = getInvoice(parseInt(params.invoiceId, 10));

  const onClickDeleteInvoice = () => {
    deleteInvoice(invoice.number);
    navigate("/invoices");
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h2>Total Due: {invoice.amount}</h2>
      <p>
        {invoice.name}: {invoice.number}
      </p>
      <p>Due Date: {invoice.due}</p>
      <p>
        <button
          onClick={ onClickDeleteInvoice }
        >
          Delete
        </button>
      </p>
    </main>
  );
}