import "./Card.scss"
import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const description = [
  'Amy is a violinist with 2 years experience in the wedding industry.',
  'She enjoys the outdoors and currently resides in upstate New York.',
].join(' ')

const CardReactComponent = (props) => {

  const { data, id } = props.quizInfo;

  return(
  <Card>
    {(!!data.title) ? <Card.Content header={data.title} />:<Card.Content header="Quiz" /> }
    <Card.Content>
      <p>date: {data.date}</p>
      <p>Time: {data.time}</p>
    </Card.Content>
  </Card>)
}

export default CardReactComponent;