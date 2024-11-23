import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {GET_TRANSACTIONS_BY_COMPTE } from './graphql/queries'


export default function Tableab() {
    const [compteId, setCompteId] = useState('1'); // Default value as a string
    const { loading, error, data } = useQuery(GET_TRANSACTIONS_BY_COMPTE, {
        variables: { compteId }, // Pass the compteId as a variable to the query
    });
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error("Query Error:", error);
        return <p>Error: {error.message}</p>;
    }

    console.log("Fetched Data:", data);

    if (!data || !data.getTransactionsByCompte) {
        return <p>No transactions found for Compte ID: {compteId}</p>;
    }

    return (
        <div className="container my-4">
      <h2 className="mb-4">Transactions for Compte ID: {compteId}</h2>

      <div className="mb-3">
        <label htmlFor="compteId" className="form-label">Compte ID:</label>
        <input
          type="text"
          id="compteId"
          className="form-control w-50"
          value={compteId}
          onChange={(e) => setCompteId(e.target.value)}
        />
      </div>

      {data?.getTransactionsByCompte?.length > 0 ? (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {data.getTransactionsByCompte.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{new Date(transaction.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-warning">No transactions found for this Compte ID.</div>
      )}
    </div>
    );
}