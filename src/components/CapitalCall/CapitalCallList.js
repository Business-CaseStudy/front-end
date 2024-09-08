import React, { useEffect, useState } from 'react'
import { Card, CardTitle, Table } from 'react-bootstrap'
import {  useParams } from 'react-router-dom';
import api from '../../api';
import { FaEdit } from 'react-icons/fa';
import { Badge, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FiSend } from 'react-icons/fi';

const getStatusColor2 = (status) => {
    switch (status) {
        case 'pending':
            return 'warning'; // Yellow badge
        case 'validated':
            return 'success'; // Green badge
        case 'paid':
            return 'primary'; // Blue badge
        case 'sent':
            return 'secondary'; // Blue badge
        default:
            return 'danger'; // Grey badge for any other status
    }
};
export default function CapitalCallList({refreshTrigger }) {
    const [capitalcalls, setCapitalcalls] = useState([]);
    const [selectedCapitalCall, setSelectedCapitalCall] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openEditModal = (capitalCall) => {
        setSelectedCapitalCall(capitalCall);
        toggleModal();
    };


    useEffect(() => {
        api.get(`/capitalcall/capital-calls/${id}/`)
            .then(response => { 
                console.log(response.data)
                setCapitalcalls(response.data);
            })
            .catch(error => console.error('Error fetching investors:', error));
    }, []);
    const handleStatusChange = (e) => {
        setSelectedCapitalCall({ ...selectedCapitalCall, status: e.target.value });
    };

    const saveStatusChange = () => {
        if (selectedCapitalCall) {
            api.post(`/capitalcall/capitalcall/${selectedCapitalCall.id}/update-status/`, { status: selectedCapitalCall.status })
                .then(response => {
                    
                    setCapitalcalls(capitalcalls.map(cc => cc.id === selectedCapitalCall.id ? { ...cc, status: selectedCapitalCall.status } : cc));
                    toggleModal();
                })
                .catch(error => console.error('Error updating capital call status:', error));
        }
    };
  return (
    <>
<Card>

    <Card.Body>
        <CardTitle>Capital Call List</CardTitle>
    {capitalcalls &&(

<div className="table-responsive">
    <Table bordered className="text-center">
        <thead>
            <tr>
                {/* <th className="align-middle">Select</th> */}
                <th className="align-middle">Reference</th>
                <th className="align-middle">total amount</th>
                <th className="align-middle">capital call STATUS</th>
                <th className="align-middle">Bills</th>
                <th className="align-middle">CREATED DATE</th>
                <th className="align-middle">CHANGE STATUS</th>
                <th className="align-middle">SEND EMAIL</th>
            </tr>
        </thead>
        <tbody>
            {capitalcalls?.map(data => (
                <tr key={data.id}>
                   
                    <th scope="row">{data.id}</th>
                    <td>{data.total_amount}</td>
                   
                    <td>
                    <Badge color={getStatusColor2(data.status)} pill>
                        {data.status}
                    </Badge>
                    
                    </td>
                    <td>
                              <Table border="1" cellPadding="5"  className="text-center">
                                  <thead>
                                      <tr>
                                          <th>Bill ID</th>
                                          <th>Bill Type</th>
                                          <th>Bill Status</th>
                                          <th>Amount</th>
                                          <th>Due Date</th>
                                          <th>Created Date</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {data.bills.map(bill => (
                                          <tr key={bill.id}>
                                              <td>{bill.id}</td>
                                              <td>{bill.bill_type}</td>
                                              <td>
                                              <Badge color={getStatusColor2(bill.bill_status)} pill>
                                              {bill.bill_status}       
                                              </Badge>
                    
                                                </td>
                                              <td>{bill.amount}</td>
                                              <td>{bill.due_date}</td>
                                            <td>{bill.created_date.split('T')[0]}</td>

                                          </tr>
                                      ))}
                                  </tbody>
                              </Table>
                          </td>
                    <td>{data.created_date.split('T')[0]}</td>
                    <td onClick={() => openEditModal(data)} style={{ cursor: 'pointer' }}>
                                                <FaEdit />
                    </td>
                    <td>
                    <FiSend />
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    {selectedCapitalCall && (
                <Modal isOpen={isModalOpen} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Edit Capital Call Status</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="statusSelect">Capital Call Status</Label>
                                <Input
                                    id="statusSelect"
                                    name="select"
                                    type="select"
                                    value={selectedCapitalCall.status}
                                    onChange={handleStatusChange}
                                >
                                    <option value="validated">Validated</option>
                                    <option value="sent">Sent</option>
                                    <option value="paid">Paid</option>
                                    <option value="overdue">Overdue</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={saveStatusChange}>Save</Button>
                        <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            )}
</div>

  )}
    </Card.Body>

</Card>
 
  
    </>

  )
}
