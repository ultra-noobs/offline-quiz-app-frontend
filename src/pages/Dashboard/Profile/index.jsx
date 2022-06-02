import "./Profile.scss";
import {
  Grid,
  Card,
  Header,
  Button,
  Icon,
  Modal,
  Form,
  List,
  Segment,
} from "semantic-ui-react";
import { Redirect, NavLink } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import useToken from "../../../utils/customHooks/token";
import HamburgerMenu from "../../../components/HamburgerMenu/index";
import Loader from "../../../components/Loader/index";
import React from "react";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [Link, setLink] = useState();
  const [openLinkBox, setLinkBox] = useState(false);
  const [batchInfo, setBatchInfo] = useState([]);
  const [currentInfo, setCurrentInfo] = useState({ gmail: "", batchno: "" });
  const [userInfo, setUserInfo] = useState({
    email: "",
    institute: "",
    name: "",
  });
  const [userReq, setUserReq] = useState({
    loading: true,
    user: false,
  });
  const cardStyle = { marginTop: "10px" };
  const { getToken } = useToken();
  const token = getToken();
  const saveBatchInfo = async () => {
    setOpen(false);
    if (!currentInfo.batchno.trim()) return;
    try {
      const response = await Axios.post(
        "https://offquiz-backend.herokuapp.com/profile/setbatch",
        currentInfo,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLink(
        `https://offquiz-app.netlify.app/formRegister/${response.data.token}/${currentInfo.batchno}`
      );
      setLinkBox(true);
      fetchBatch();
    } catch (error) {
      console.log(error.message);
      setLink("OOPS!! Some Error Occured");
    }
    setCurrentInfo({
      gmail: "",
      batchno: "",
    });
  };

  const saveCurrentBatch = (e) => {
    setCurrentInfo({
      ...currentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const deleteBatch = async (batchId) => {
    await Axios.get(
      "https://offquiz-backend.herokuapp.com/profile/batch/delete/" +
        batchId,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    window.location.reload();
  };

  const fetchBatch = useCallback(() => {
    Axios.get("https://offquiz-backend.herokuapp.com/profile/getBatch", {
      headers: {
        Authorization: token,
      },
    }).then((response) => setBatchInfo(response.data.batch));
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "https://offquiz-backend.herokuapp.com/profile",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          institute: response.data.institution,
        });
        setUserReq({ loading: false, user: true });
      } catch (error) {
        console.log(error);
        setUserReq({ loading: false, user: false });
      }
    };
    fetchData();
    fetchBatch();
  }, [fetchBatch, token]);

  return (
    <div>
      {userReq.loading && <Loader />}
      {!userReq.loading && !userReq.user && <Redirect to="/login"></Redirect>}
      {!userReq.loading && userReq.user && (
        <HamburgerMenu>
          <div className="profile__page">
            <div className="profile__page__info">
              <Segment>
                <Grid columns={1}>
                  <Grid.Column>
                    <List>
                      <List.Item>
                        <List.Content>
                          <Header>
                            <Icon name="user" /> {userInfo.name}
                          </Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <Header>
                            <Icon name="mail" /> {userInfo.email}
                          </Header>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <Header>
                            <Icon name="building outline" />
                            {userInfo.institute}
                          </Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                </Grid>
              </Segment>
            </div>
            <div className="profile__page__batch">
              <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={
                  <Button
                    Icon
                    floated="right"
                    content="Add Batch"
                    color="green"
                    icon="add"
                  />
                }
              >
                <Modal.Header>Batch Information</Modal.Header>
                <Modal.Content>
                  <Form>
                    <Form.Field>
                      <label> Enter the group email</label>
                      <input
                        placeholder="Enter Batch email or If you want to send form using link keep it blank"
                        name="gmail"
                        onChange={(e) => saveCurrentBatch(e)}
                      />
                      <label>Enter batch Name</label>
                      <input
                        placeholder="Enter Batch Name"
                        name="batchno"
                        onChange={(e) => saveCurrentBatch(e)}
                      />
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
                  <div>
                    {Link}
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(Link);
                      }}
                    >
                      <Icon name="copy" size="large" />
                    </Button>
                  </div>
                  <p>
                    Copy Above Link and share it with the batch of student whom
                    you want to collect the number
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button onClick={() => setLinkBox(false)}>Close</Button>
                </Modal.Actions>
              </Modal>
              <div className="profile__page__batch__display">
                {batchInfo.map((ele, index) => {
                  return (
                    <Card fluid color="green" style={cardStyle}>
                      <Card.Content header={ele.batchName} />
                      <Card.Content>
                        <Header>
                          <Header.Content>
                            Form Link
                            <Header.Subheader> {ele.link}</Header.Subheader>
                          </Header.Content>
                        </Header>
                        <Header>Registered Student : {ele.size}</Header>
                        <Button
                          icon="trash"
                          warning
                          floated="right"
                          color="red"
                          onClick={() => deleteBatch(ele.batchName)}
                        />
                        <NavLink
                          exact
                          activeClassName="current"
                          to={`/dashboard/profile/batch/${ele.batchName}`}
                        >
                          <Button
                            primary
                            floated="right"
                            icon="users"
                            content="students"
                          />
                        </NavLink>
                      </Card.Content>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </HamburgerMenu>
      )}
    </div>
  );
};

export default Profile;
