import React from "react";
import "./Profile.scss";
import {
  Grid,
  Card,
  Input,
  Header,
  Button,
  Icon,
  Modal,
} from "semantic-ui-react";

const items = [
  {
    header: "Teacher name",
    description: "Designation",
  },
];

const Profile = () => {
  const [open, setOpen] = React.useState(false);

  return (
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
          <Modal.Content image>
              
            <Modal.Description>
              <p>Would you like to upload this image?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button Icon onClick={() => setOpen(false)} positive>
                <Icon name="save" />
              Save
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;
