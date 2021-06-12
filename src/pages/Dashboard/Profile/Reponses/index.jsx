import "./Response.scss";
import { React, useEffect, useState } from "react";
import { Icon, Label, Menu, Table, Container, Header } from "semantic-ui-react";
import { useLocation, Redirect } from "react-router-dom"
import useToken from '../../../../utils/customHooks/token'
import useAuthStatus from '../../../../utils/customHooks/user'
import Loader from '../../../../components/Loader/index'
import Axios from 'axios'

const ResponseTable = () => {
    const location = useLocation();
    const { getToken } = useToken();
    const { getStatus } = useAuthStatus();
    var [isLoading, setLoading] = useState(true);
    var [auth, setAuth] = useState();
    const [ currentBatch, setcurrentBatch ] = useState([{}]);
    
    useEffect( async () => {
      let documentId = location.pathname.substr(25, location.pathname.length - 25);
      let endpoint = "http://localhost:5000/profile/batch/" + documentId;
    //   console.log(location.pathname + " " + documentId);
      const token = getToken();
        const response = await Axios.get(endpoint, {
            headers:{
                Authorization: token,
            }
        });
        console.log(response.data);
        setcurrentBatch(response.data);
        const isAuthenticated = await getStatus();
        setAuth(isAuthenticated);
        setLoading(false);
    },[])

    const test = () =>{
        console.log("ye state hai ", currentBatch[0].students);
    }

  return (
      <Container>
    {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && (<div onClick={() => test()}>
          <Header as="h1">Students of batch XXXX</Header>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Sno</Table.HeaderCell>
          <Table.HeaderCell>Roll no</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Phonenumber</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      {currentBatch[0].students.map((element, index) => {
           <Table.Body>
           <Table.Row>
             <Table.Cell>{index}</Table.Cell>
             <Table.Cell>{element.id}</Table.Cell>
             <Table.Cell>{element.name}</Table.Cell>
             <Table.Cell>{element.phone}</Table.Cell>
           </Table.Row>
         </Table.Body>
      })}
    </Table>
    </div>
    )}
    </Container>

  );
};

export default ResponseTable;
