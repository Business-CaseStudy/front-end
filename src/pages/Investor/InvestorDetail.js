import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardText, CardTitle, Col, Row, Table, Alert } from 'reactstrap';
import SidebarComp from '../../components/Navbar/SidebarComp';
import { useParams } from 'react-router-dom';
import api from '../../api';
import { ButtonGroup } from 'react-bootstrap';
import CapitalCallInfo from '../../components/CapitalCall/CapitalCallInfo';
import CapitalCallList from '../../components/CapitalCall/CapitalCallList';
const getStatusColor = (status) => {
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

export default function InvestorDetail() {
    const { id } = useParams();
    const [investor, setInvestor] = useState(null);
    const [selectedBills, setSelectedBills] = useState([]);
    const [showValidateButton, setShowValidateButton] = useState(false);
    const [alert, setAlert] = useState(null);
    const [done, setDone] = useState(false);
    const[generatedCapital,setGeneratedCapital] = useState([]);
    const[capitalDone,setCapitalDone] = useState(false);
    const handleCheckboxChange = (e, bill) => {
        const updatedSelectedBills = e.target.checked 
            ? [...selectedBills, bill] 
            : selectedBills.filter(selectedBill => selectedBill.id !== bill.id);
        
        setSelectedBills(updatedSelectedBills);

        // Check if any selected bill has a status other than 'validated'
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
                setSelectedBills([]); // Clear selected bills after validation
                setShowValidateButton(false);
            })
            .catch(error => {
                const errorMessage = error.response?.data?.errors?.join(', ') || 'An error occurred while validating bills.';
                setAlert({ type: 'danger', message: errorMessage });
            });
    };
    const hasValidatedBills = selectedBills.some(bill => bill.bill_status === 'validated');
    const handleGenerateCapitalCall =async () => {
        try {
          console.log('Generating capital call for bills:', selectedBills);
          const billIds = selectedBills.map(bill => bill.id);
          const response = await api.post(`/capitalcall/generate-capital-call/${id}/`, { bill_ids: billIds }); 
          console.log(response.data); // capital call data
          setGeneratedCapital(response.data)
          setCapitalDone(true)
          setAlert({ type: 'success', message: 'Capital call generated successfully.' });
        } catch (error) {
          console.error('Error generating bill:', error);
          setAlert({ type: 'danger', message: error.response.data.detail });
        } 

    };
    useEffect(() => {
        api.get(`/bill/investor/${id}/bills/`)
            .then(response => setInvestor(response.data))
            .catch(error => console.error('Error fetching investor details:', error));
    }, [id,done,capitalDone]);

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
                                    <CardText>{investor?.investment_amount}£</CardText>
                                </Card>
                            </Col>
                        </Row>
                        
                        </Card>
                   

                        <div style={{ flex: 1, padding: '20px' }}>
                            
                            
                                <Card>
                                <Card body>
                                <CardTitle tag="h5">Bill List</CardTitle>
                                <div className="table-responsive">
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
                                        {investor?.bills?.map(bill => (
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
                                </div>
                                </Card>
                                </Card>
                               
                         
                            <ButtonGroup className="my-2">
            

                            {showValidateButton && (
                                <Button color="primary" onClick={handleValidateBills}>
                                    Validate Bill(s)
                                </Button>
                            )}
                            {hasValidatedBills && (
                                <Button color="primary" onClick={handleGenerateCapitalCall}>
                                    Generate Capital Call
                                </Button>
                            )}
                            </ButtonGroup>
                            {capitalDone && (
                                <>
                                <CapitalCallInfo capitalData={generatedCapital}/>
                              
                                </>

                                )}
                             
                                  <CapitalCallList />

                               
                        </div>
                    </div>
                </div>                                
            </div>
        </>
    );
}
