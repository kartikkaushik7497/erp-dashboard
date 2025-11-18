import "./DataTable.css";

export default function DataTable({ rows = [] }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Product</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => (
          <tr key={r._id}>
            <td>{new Date(r.date).toLocaleDateString()}</td>
            <td>{r.product}</td>
            <td>{r.category}</td>
            <td>₹{r.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
