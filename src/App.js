import logo from './logo.svg';
import './App.css';
import { GET_COMPTES, CREATE_TRANSACTION, CREATE_COMPTE, DELETE_COMPTE } from './graphql/queries'
import { useQuery } from '@apollo/client';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import Tableab from './Tableab';




function App() {

  const [id, setid] = useState("");
  const [type, settype] = useState("DEPOT");
  const [amount, setamount] = useState(0);
  const [trigger, setTrigger] = useState(false);


  const { loading, error, data } = useQuery(GET_COMPTES);


 
  const handleAmount = (e) => {
    setamount(e.target.value);
  }
  const handleID = (e) => {
    setid(e.target.value);
  }
  const handleType = (e) => {
    settype(e.target.value);
  }

  const [createTransaction] = useMutation(CREATE_TRANSACTION);
  const [saveCompte] = useMutation(CREATE_COMPTE);
  const [deleteCompte] = useMutation(DELETE_COMPTE);


  const handleCreateTransaction = async () => {
    // Prepare the variables
    const variables = {
      transactionInput: {
        amount: Number(amount),
        type: type, 
        transactionDate: new Date().toISOString(), 
      },
      compteId: id, 
    };
  
    console.log("Creating transaction with variables:", variables); 
  
    try {
      await createTransaction({ variables });
      console.log("Transaction created successfully"); 
  
      alert('Transaction Created');
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert('Error creating transaction:', error.message); 
    }
  };



  const [solde, setsolde] = useState(0);

  const handleSolde = (e) => {
    setsolde(e.target.value);
    console.log(e.target.value);
  }

  const [comptetype, setcpt] = useState("COURANT")

  const handlecomptetype = (e) => {
    setcpt(e.target.value)
  }
  const getCurrentDateFormatted = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adds leading zero if month < 10
    const day = date.getDate().toString().padStart(2, '0'); // Adds leading zero if day < 10
    return `${year}/${month}/${day}`;
  };



  const handleCreateCompte = async () => {
    const dateCreation = getCurrentDateFormatted();
    try {
      await saveCompte({
        variables: {
          solde: parseFloat(solde), // Example value
          dateCreation: dateCreation, // Example date
          type: comptetype, // Example type
        },
      });
      alert("Compte added successfully!");
    } catch (err) {
      console.error("Error adding compte:", err);
    }
  };


  const handleDeleteCompte = async (id) => {
    try {
      await deleteCompte({ variables: { id } });
      alert("Compte deleted successfully!");
    } catch (err) {
      alert("Error deleting compte:", err);
    }
  };






  if (loading) return <p>Loading comptes...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <Container>
      <Row>
        <h1>Comptes:</h1>
      </Row>
      <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Sold:</Form.Label>
          <Form.Control type="text" value={solde} onChange={handleSolde} />
          <Form.Select aria-label="Default select example" onChange={handlecomptetype}>
            <option value="COURANT">COURANT</option>
            <option value="EPARGNE">EPARGNE</option>
          </Form.Select>
        </Form.Group>
        <Button variant="success" style={{ width: 200 }} onClick={handleCreateCompte}>Ajouter compte</Button>
      </Row>
      <Row>
        {data.allComptes.map((compte) => (
          <Card style={{ width: '18rem', margin: 10 }}>
            <Card.Body>
              <Card.Title>Compte id : {compte.id}</Card.Title>
              <Card.Text>
                Solde : {compte.solde} <br />
                Date de creation : {compte.dateCreation} <br/>
                Type : {compte.type}
              </Card.Text>
              <Button variant="danger" onClick={() => handleDeleteCompte(compte.id)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </Row>

      <br /><br /><br /><br /><br /><br /><br />


      <Row>
        <h1>Transactions:</h1>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Compte id:</Form.Label>
            <Form.Control type="text" value={id} onChange={handleID} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>type: </Form.Label>
            <Form.Select aria-label="Default select example" onChange={handleType}>
              <option value="DEPOT">DEPOT</option>
              <option value="RETRAIT">RETRAIT</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Montant:</Form.Label>
            <Form.Control type="text" value={amount} onChange={handleAmount} />
          </Form.Group>
          <Button onClick={handleCreateTransaction} variant="success" style={{ width: 200 }}>Add transaction</Button>
        </Form>





      </Row>
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Row>
        <Tableab />


      </Row>
    </Container >
    // <div>
    //   <h2>Comptes List</h2>
    //   <ul>
    //     {data.allComptes.map((compte) => (
    //       <li key={compte.id}>
    //         <strong>{compte.id}</strong>: ${compte.solde}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default App;
