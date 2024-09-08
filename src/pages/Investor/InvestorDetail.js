import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardText, CardTitle, Col, Row, Table, Alert, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import SidebarComp from '../../components/Navbar/SidebarComp';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { ButtonGroup } from 'react-bootstrap';
import CapitalCallInfo from '../../components/CapitalCall/CapitalCallInfo';
import CapitalCallList from '../../components/CapitalCall/CapitalCallList';
import { RiAiGenerate } from 'react-icons/ri';

const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'warning';
        case 'validated':
            return 'success'; 
        case 'paid':
            return 'primary'; 
        case 'sent':
            return 'secondary'; 
        default:
            return 'danger'; 
    }
};

export default function InvestorDetail() {
    const { id } = useParams();
    const [investor, setInvestor] = useState(null);
    const [selectedBills, setSelectedBills] = useState([]);
    const [showValidateButton, setShowValidateButton] = useState(false);
    const [alert, setAlert] = useState(null);
    const [done, setDone] = useState(false);
    const [generatedCapital, setGeneratedCapital] = useState([]);
    const [capitalDone, setCapitalDone] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [billsPerPage] = useState(10); // Number of bills per page

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleCheckboxChange = (e, bill) => {
        const updatedSelectedBills = e.target.checked 
            ? [...selectedBills, bill] 
            : selectedBills.filter(selectedBill => selectedBill.id !== bill.id);
        
        setSelectedBills(updatedSelectedBills);

        const hasUnvalidatedBill = updatedSelectedBills.some(selectedBill => selectedBill.bill_status !== 'validated');
        setShowValidateButton(hasUnvalidatedBill);
    };

    const handleValidateBills = () => {
        const billIds = selectedBills.map(bill => bill.id);
        setDone(false);
        api.post('/bill/validate-bill/', { bill_ids: billIds })
            .then(response => {
                setAlert({ type: 'success', message: 'Bills validated successfully!' });
                setInvestor({
                    ...investor,
                    bills: investor.bills.map(bill =>
                        billIds.includes(bill.id)
                            ? { ...bill, bill_status: 'validated' }
                            : bill
                    )
                });
                setDone(true);
                setSelectedBills([]);
                setShowValidateButton(false);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.errors?.join(', ') || 'An error occurred while validating bills.';
                setAlert({ type: 'danger', message: errorMessage });
                setSelectedBills([]);
            });
    };

    const hasValidatedBills = selectedBills.some(bill => bill.bill_status === 'validated');

    const handleGenerateCapitalCall = async () => {
        try {
            console.log('Generating capital call for bills:', selectedBills);
            const billIds = selectedBills.map(bill => bill.id);
            const response = await api.post(`/capitalcall/generate-capital-call/${id}/`, { bill_ids: billIds });
            console.log(response.data);
            setGeneratedCapital(response.data);
            setCapitalDone(true);
            setAlert({ type: 'success', message: 'Capital call generated successfully.' });
            toggleModal();
            setSelectedBills([]);
        } catch (error) {
            console.error('Error generating bill:', error);
            setAlert({ type: 'danger', message: error.response.data.detail });
            setSelectedBills([]);
        }
    };

    useEffect(() => {
        api.get(`/bill/investor/${id}/bills/`)
            .then(response => setInvestor(response.data))
            .catch(error => console.error('Error fetching investor details:', error));
    }, [id, done, capitalDone]);

    // Pagination logic
    const indexOfLastBill = currentPage * billsPerPage;
    const indexOfFirstBill = indexOfLastBill - billsPerPage;
    const currentBills = investor?.bills?.slice(indexOfFirstBill, indexOfLastBill);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div style={{ display: 'flex' }}>
                <SidebarComp />
                <div className="container">
                    <div style={{ flex: 1, padding: '20px' }}>
                        {alert && (
                            <Alert color={alert.type} toggle={() => setAlert(null)}>
                                {alert.message}
                            </Alert>
                        )}
                        <Card>
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle tag="h5">Investor Name</CardTitle>
                                    <CardText>{investor?.name}</CardText>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle tag="h5">Investment Amount</CardTitle>
                                    {/* <CardText>{investor?.investment_amount}£</CardText> */}
                                </Card>
                            </Col>
                        </Row>
                        
                        </Card>
                   

                        <div style={{ flex: 1, padding: '20px' }}>
                             
                                <Card>
                                <Card body>
                                <CardTitle tag="h5">Bill List</CardTitle>
                                <div className="table-responsive">
                                <ButtonGroup className="my-2">
                                

                                {showValidateButton && (
                                    <Button color="primary" onClick={handleValidateBills}>
                                        Validate Bill(s)
                                    </Button>
                                )}
                                {hasValidatedBills && (
                                    <Button color="primary" onClick={handleGenerateCapitalCall}>
                                       <RiAiGenerate />  Generate Capital Call
                                    </Button>
                                )}
                          </ButtonGroup>
                                <Table bordered className="text-center">
                                    <thead>
                                        <tr>
                                            <th>Select</th>
                                            <th>Reference</th>
                                            <th>BILL TYPE</th>
                                            <th>BILL STATUS</th>
                                            <th>AMOUNT</th>
                                            <th>DUE DATE</th>
                                            <th>CREATED DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentBills?.map(bill => (
                                            <tr key={bill.id}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        value={bill.id}
                                                        onChange={(e) => handleCheckboxChange(e, bill)}
                                                    />
                                                </td>
                                                <th scope="row">{bill.id}</th>
                                                <td>{bill.bill_type}</td>
                                                <td>
                                                <Badge color={getStatusColor(bill.bill_status)} pill>
                                                        {bill.bill_status}
                                                    </Badge>
                                                </td>

                                                <td>{bill.amount}</td>
                                                <td>{bill.due_date}</td>
                                                <td>{bill.created_date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <div className="d-flex justify-content-end">
                                <Pagination >
                                    {Array.from({ length: Math.ceil(investor?.bills?.length / billsPerPage) }).map((_, index) => (
                                        <PaginationItem key={index} active={index + 1 === currentPage}>
                                            <PaginationLink onClick={() => paginate(index + 1)}>
                                                {index + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                </Pagination>
                                </div>
                                </div>
                                </Card>
                                </Card>
                            <CapitalCallInfo 
                                   isOpen={modalOpen}
                                   toggle={toggleModal}
                                capitalData={generatedCapital}/>

                                        <div>
                                        <CapitalCallList />
                                        </div>
                        </div>
        
                    </div>
                </div>                                
            </div>
        </>
    );
}
