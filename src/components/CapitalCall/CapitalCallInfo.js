import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Card, CardBody, CardText, CardTitle } from 'reactstrap'

export default function CapitalCallInfo({capitalData}) {
    useEffect(() => {
        console.log("__capitalcall",capitalData)

    }, [capitalData])
    
  return (
  <>
   <Card className="my-2">
    <CardBody>
      <CardTitle tag="h5">
        Capital Call 
      </CardTitle>
      <CardText>
        {/* This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. */}
      </CardText>
      <CardText>
    <Container>
      <Row  className="justify-content-md-center">
        <Col xs lg="1">IBAN</Col>
        <Col md="auto"> {capitalData?.investor_iban}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">DUE DATE</Col>
        <Col md="auto"> {capitalData?.investor_iban}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="1">From</Col>
        <Col md="auto"> ARCHIMED SAS</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="1">TO</Col>
        <Col md="auto"> {capitalData?.investor_name}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">EMAIL</Col>
        <Col md="auto"> {capitalData?.investor_email}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">TOTAL AMOUNT</Col>
        <Col md="auto"> {capitalData?.total_amount}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">DATE</Col>
        <Col md="auto"> {capitalData?.Date}</Col>
      </Row>
    </Container>
      </CardText>
    </CardBody>

  </Card>
  </>
  )
}
