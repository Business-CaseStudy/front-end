import React, { useEffect, useState } from 'react';
import { Card, CardTitle, Table, Pagination } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import api from '../../api';
import { FaEdit } from 'react-icons/fa';
import { Badge, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FiSend } from 'react-icons/fi';
import { VscPreview } from 'react-icons/vsc';
import { getCapitalcallDetail, updateCapitalcallStatus } from '../../services/capitalcallApi';

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

export default function CapitalCallList({ refreshTrigger, loadCapital }) {
    const [capitalcalls, setCapitalcalls] = useState([]);
    const [selectedCapitalCall, setSelectedCapitalCall] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4; 

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openEditModal = (capitalCall) => {
        setSelectedCapitalCall(capitalCall);
        toggleModal();
    };

    useEffect(() => {
        getCapitalcallDetail(id).then(response => { 
                console.log(response.data);
                setCapitalcalls(response.data);
            })
            .catch(error => console.error('Error fetching investors:', error));
    }, [ loadCapital]);

    const handleStatusChange = (e) => {
        setSelectedCapitalCall({ ...selectedCapitalCall, status: e.target.value });
    };

    const saveStatusChange = () => {
        if (selectedCapitalCall) {
            updateCapitalcallStatus(selectedCapitalCall.id, { status: selectedCapitalCall.status })
                .then(response => {
                    setCapitalcalls(capitalcalls.map(cc => cc.id === selectedCapitalCall.id ? { ...cc, status: selectedCapitalCall.status } : cc));
                    toggleModal();
                })
                .catch(error => console.error('Error updating capital call status:', error));
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCapitalCalls = capitalcalls.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(capitalcalls.length / itemsPerPage);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Card>
                <Card.Body>
                    <CardTitle>Capital Call List</CardTitle>
                    {capitalcalls && (
                        <div className="table-responsive">
                            <Table bordered className="text-center">
                                <thead>
                                    <tr>
                                        <th className="align-middle">Reference</th>
                                        <th className="align-middle">Total Amount</th>
                                        <th className="align-middle">Capital Call Status</th>
                                        <th className="align-middle">Bills</th>
                                        <th className="align-middle">Created Date</th>
                                        <th className="align-middle">Change Status</th>
                                        <th className="align-middle">Preview Capital call</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCapitalCalls.map(data => (
                                        <tr key={data.id}>
                                            <th scope="row">{data.id}</th>
                                            <td>{data.total_amount}</td>
                                            <td>
                                                <Badge color={getStatusColor2(data.status)} pill>
                                                    {data.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <Table border="1" cellPadding="5" className="text-center">
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
                                            <Link  to={"/previewcapitalCall/"+data?.id} ><VscPreview /></Link>
                                              
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-end">
                            <Pagination>
                                {[...Array(totalPages)].map((_, i) => (
                                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                            </div>
                        </div>
                    )}
                </Card.Body>
            </Card>
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
        </>
    );
}
