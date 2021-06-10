import "./Profile.scss";
import {
  Grid,
  Card,
  Input,
  Header,
  Button,
  Icon,
  Modal,
  Form,
} from "semantic-ui-react";
import { Redirect } from 'react-router-dom';
import { useState, useEffect } from "react";
import Axios from 'axios';
import useToken from '../../../utils/customHooks/token'
import HamburgerMenu from '../../../components/HamburgerMenu/index'

const items = [
  {
    header: "Teacher name",
    description: "Designation",
  },
];

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [batchInfo, setBatchInfo] = useState([{}]);
  const [currentInfo, setCurrentInfo] = useState({ gmail: '', batchno: '' })
  const [userReq, setUserReq] = useState({
    loading: true,
    user: false
  })
  const { getToken } = useToken();
  const saveBatchInfo = () => {
    setOpen(false);
    batchInfo.push(currentInfo);
    setCurrentInfo({
      gmail: '',
      batchno: ''
    });
    console.log(batchInfo);
  }

  const saveCurrentBatch = (e) => {
    setCurrentInfo({
      ...currentInfo,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await Axios.get(
          'http://localhost:5000/profile',
          {
            headers: {
              Authorization: token,
            },
          }
        )
        setUserReq({ loading: false, user: true })
      } catch (error) {
        console.log(error);
        setUserReq({ loading: false, user: false })
      }
    }
    fetchData();
  }, [])

  return (
    <div>
      {userReq.loading && <div>Loading...</div>}
      {!userReq.loading && !userReq.user && <Redirect to="/login"></Redirect>}
      {!userReq.loading && userReq.user &&
        <HamburgerMenu>
          <div className="profile__page">
            <div className="profile__page__info">
              <Grid columns={1}>
                <Grid.Column>
                  <Card.Group centered items={items} />
                  <Header as="h3">Email: this is the user test emil</Header>
                  <Header as="h3">School: this is the user test school</Header>
                </Grid.Column>
              </Grid>
            </div>
            <div className="profile__page__batch">
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button Icon floated="right"><Icon name="add" />Add Batch</Button>}
              >
                <Modal.Header>Batch Information</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label> Enter the group email</label>
                      <input placeholder="enter group email" name="gmail" onChange={(e) => saveCurrentBatch(e)} />
                      <label>Enter batch no</label>
                      <input placeholder="Enter no" name="batchno" onChange={(e) => saveCurrentBatch(e)} />
                    </Form.Field>
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setOpen(false)}>Cancel</Button>
                  <Button Icon onClick={() => saveBatchInfo()} positive>
                    <Icon name="save" />
              Save
            </Button>
                </Modal.Actions>
              </Modal>
              {batchInfo.map((ele, index) => <Card fluid color='green' header={ele.gmail} />)}
              {/* {batchInfo.map((ele, index) => <Card.Group style={{width: "100vw"}} centered items={[{header: ele.gmail , description: ele.batchno }]} ></Card.Group>)} */}
            </div>
          </div>
        </HamburgerMenu>
      }
    </div>
  );
};

export default Profile;
