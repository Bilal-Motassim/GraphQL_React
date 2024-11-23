import { gql } from '@apollo/client';

export const GET_COMPTES = gql`
  query AllComptes {
    allComptes {
        id
        solde
        dateCreation
        type
    }
}
`;


export const DELETE_COMPTE = gql`
  mutation DeleteCompte($id: ID) {
    deleteCompte(id: $id)
  }
`;


export const CREATE_COMPTE = gql`
  mutation SaveCompte($solde: Float, $dateCreation: String, $type: TypeCompte) {
    saveCompte(compte: { solde: $solde, dateCreation: $dateCreation, type: $type }) {
      id
      solde
      dateCreation
      type
    }
  }
`;






export const GET_TANSACTIONS = gql`
query GetTransactions {
  getTransactions {
    id
    amount
    type
    transactionDate
    compte {
      id
      solde
    }
  }
}`;


export const GET_TRANSACTIONS_BY_COMPTE = gql`
  query GetTransactionsByCompte($compteId: ID!) {
    getTransactionsByCompte(id: $compteId) {
      id
      amount
      type
      transactionDate
    }
  }
`;




export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($transactionInput: TransactionInput!, $compteId: ID!) {
    createTransaction(transactionInput: $transactionInput, compteId: $compteId) {
      id
      amount
      type
      transactionDate
      compte {
        id
        solde
      }
    }
  }
`;


export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID) {
    deleteTransaction(id: $id)
  }`;





