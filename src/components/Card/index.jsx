import "./Card.scss";
import React from "react";
import { useHistory } from "react-router";
import { Card, Label, Button, Header, Icon } from "semantic-ui-react";
import Axios from "axios";
import useToken from "../../utils/customHooks/token";
import { NavLink } from "react-router-dom";

const CardReactComponent = (props) => {
  const { data, id } = props.quizInfo;
  const history = useHistory();
  const { getToken } = useToken();
  const deleteQuiz = async (quizId) => {
    const token = getToken();
    const endpoint =
      "https://offquiz-backend.herokuapp.com/dashboard/delete/" + quizId;
    try {
      await Axios.get(endpoint, {
        headers: {
          Authorization: token,
        },
      });
      window.location.reload();
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card>
      {data.isCirculated ? (
        <Label color={"green"} key={"orange"}>
          Circulated
        </Label>
      ) : (
        <Label color={"red"} key={"orange"}>
          Not circulated
        </Label>
      )}
      {!!data.title ? (
        <Card.Content
          header={
            <Header as="h2">
              <Icon name="book" />
              <Header.Content>
                {data.title}
                <Header.Subheader> Quiz made at OfffQuiz</Header.Subheader>
              </Header.Content>
            </Header>
          }
        />
      ) : (
        <Card.Content header="Quiz" />
      )}
      <Card.Content>
        <p>Date: {data.date}</p>
        <p>StartTime: {data.time}</p>
        <p>EndTime: {data.endtime}</p>
        <p>Responses: {data.phno}</p>
        <Button
          icon="trash"
          primary
          floated="right"
          onClick={() => deleteQuiz(id)}
        />
        <NavLink exact activeClassName="current" to={`/dashboard/view/${id}`}>
          <Button icon="eye" primary floated="right" />
        </NavLink>
      </Card.Content>
    </Card>
  );
};

export default CardReactComponent;
