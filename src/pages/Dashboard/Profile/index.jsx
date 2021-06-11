import "./Profile.scss";
import {
  Grid,
  Card,
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
import Loader from '../../../components/Loader/index'

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [Link, setLink] = useState();
  const [openLinkBox, setLinkBox] = useState(false);
  const [batchInfo, setBatchInfo] = useState([{}]);
  const [currentInfo, setCurrentInfo] = useState({ gmail: '', batchno: '' })
  const [userInfo, setUserInfo] = useState({ email: '', institute: '', name: '' })
  const [userReq, setUserReq] = useState({
    loading: true,
    user: false
  })
  const { getToken } = useToken();
  const saveBatchInfo = async () => {
    setOpen(false);
    batchInfo.push(currentInfo);
    try {
      const token = getToken();
      const response = await Axios.post(
        "http://localhost:5000/profile/setbatch",
        currentInfo,
        {
          headers:{
              Authorization: token,
          }
        }
      )
      setLink(`http://localhost:3000/formRegister/${response.data.token}/${currentInfo.batchno}`)
      setLinkBox(true);
    } catch (error) {
      console.log(error.message);
      setLink("OOPS!! Some Error Occured")
    }
    setCurrentInfo({
      gmail: '',
      batchno: ''
    });
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
        setUserInfo({ name: response.data.name, email: response.data.email, institute: response.data.institution });
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
      {userReq.loading && <Loader />}
      {!userReq.loading && !userReq.user && <Redirect to="/login"></Redirect>}
      {!userReq.loading && userReq.user &&
        <HamburgerMenu>
          <div className="profile__page">
            <div className="profile__page__info">
              <Grid columns={1}>
                <Grid.Column>
                  <Header as="h3">Name: {userInfo.name}</Header>
                  <Header as="h3">Email: {userInfo.email}</Header>
                  <Header as="h3">Institute : {userInfo.institute}</Header>
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
                      <input placeholder="Enter Batch email or If you want to send form using link keep it blank" name="gmail" onChange={(e) => saveCurrentBatch(e)} />
                      <label>Enter batch Name</label>
                      <input placeholder="Enter Batch Name" name="batchno" onChange={(e) => saveCurrentBatch(e)} />
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
              <Modal
                onClose={() => setLinkBox(false)}
                onOpen={() => setLinkBox(true)}
                open={openLinkBox}
              >
                <Modal.Header>Form Link</Modal.Header>
                <Modal.Content>
                  <div>{Link} <Button  onClick={() => {navigator.clipboard.writeText(Link)}}><Icon name="copy" size='large'/></Button></div>
                  <p>Copy Above Link and share it with the batch of student whom you want to collect the number</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setLinkBox(false)}>Close</Button>
                </Modal.Actions>
              </Modal>
              <div className="profile__page__batch__display">
              {batchInfo.filter(element => !!element.batchno || !!element.gmail ).map((ele, index) => <Card fluid color='green' header={ (!!ele.gmail) ? "Batch mail " + ele.gmail : "Batch " + ele.batchno } />)}
              </div>
            </div>
          </div>
        </HamburgerMenu>
      }
    </div>
  );
};

export default Profile;
