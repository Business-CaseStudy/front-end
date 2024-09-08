import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FiSend } from 'react-icons/fi'
import { Button, Card, CardBody, CardText, CardTitle, Modal, ModalBody, ModalFooter } from 'reactstrap'

export default function CapitalCallInfo({isOpen, toggle, capitalData}) {
    useEffect(() => {
        console.log("__capitalcall",capitalData)

    }, [capitalData])
    
  return (
  <>
      <Modal isOpen={isOpen} toggle={toggle}>
    <ModalBody>
        
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
        <Col xs lg="auto">IBAN</Col>
        <Col md="auto"> {capitalData?.investor_iban}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">DUE DATE</Col>
        <Col md="auto"> {capitalData?.investor_iban}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">From</Col>
        <Col md="auto"> ARCHIMED SAS</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">TO</Col>
        <Col md="auto"> {capitalData?.investor_name}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">EMAIL</Col>
        <Col md="auto"> {capitalData?.investor_email}</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">TOTAL AMOUNT</Col>
        <Col md="auto"> {capitalData?.total_amount} £</Col>
      </Row>
      <Row  className="justify-content-md-center">
        <Col xs lg="auto">DATE</Col>
        <Col md="auto"> {capitalData?.Date}</Col>
      </Row>
    </Container>
      </CardText>
    </CardBody>

  </Card>
  </ModalBody>
  <ModalFooter>
          <Button type="submit" color="primary"><FiSend />Send</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
  </Modal>

  </>
  )
}
