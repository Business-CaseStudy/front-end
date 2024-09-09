import React, { useEffect, useState } from 'react';
import { Table, Button, Card, CardTitle } from 'reactstrap';
import SidebarComp from '../../components/Navbar/SidebarComp';
import api from '../../api';
import GenerateBillForm from '../../components/Bill/GenerateBillForm';
import { useNavigate } from 'react-router-dom';
import { RiAiGenerate } from 'react-icons/ri';

export default function InvestorList() {
    const [investors, setInvestors] = useState([]);
    const [selectedInvestor, setSelectedInvestor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        api.get('/investor/api/investors/')
            .then(response => { 
                setInvestors(response.data);
            })
            .catch(error => console.error('Error fetching investors:', error));
    }, []);



    const handleRadioChange = (investor) => {
        setSelectedInvestor(investor);
        //setSelectedInvestor(prevId => prevId === investor.id ? null : investor.id);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleGenerateBill = () => {
        if (selectedInvestor) {
            toggleModal();
        }
    };

    const handleFormSubmit = (data) => {
        console.log('Form data:', data);
        // Implement form submission logic here
        toggleModal(); // Close modal after submission
    };
    const handleUsernameClick = (id) => {
        navigate(`/investordetail/${id}`); // Navigate to investor detail page
    };
    return (
        <>
            <div style={{ display: 'flex' }}>  
                <SidebarComp />
                <div className="container">
                <div style={{ flex: 1, padding: '20px' }}>
                <Card>
                                <Card body>
                                <CardTitle tag="h5">Inverstor List</CardTitle>
                    <div className="table-responsive" style={{ flex:1  , padding: '20px' }}>
                        <Table  bordered className="text-center">
                            <thead>
                                <tr>
                                    <th>Select</th> {/* Add a header for the radio button column */}
                                    {/* <th>#</th> */}
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>IBAN</th>
                                    {/* <th>Investment Amount</th>
                                    <th>Investment Date</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {investors.map(investor => (
                                    <tr key={investor.id}>
                                      <td>
                            <input
                                type="checkbox"
                                name="investor"
                                value={investor.id}
                                checked={selectedInvestor?.id === investor.id}
                                onChange={() => handleRadioChange(investor)}
                            />
                        </td>
                                        {/* <th scope="row">{investor.id}</th> */}
                                        <td>
                                            <Button color="link" onClick={() => handleUsernameClick(investor.id)}>
                                                {investor.name}
                                            </Button>
                                        </td>
                                        <td>{investor.email}</td>
                                        <td>{investor.iban}</td>
                                        {/* <td>{investor.investment_amount}</td>
                                        <td>{investor.investment_date}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Card footer>
                        <Button color="primary" onClick={handleGenerateBill} disabled={!selectedInvestor}>
                        <RiAiGenerate />  Generate Bill
                        </Button>
                        </Card>
                        
                    </div>
                    </Card>
                    </Card>
                    </div>
                </div>
            </div>
            <GenerateBillForm
                isOpen={modalOpen}
                toggle={toggleModal}
                selectedInvestor={selectedInvestor}
                onSubmit={handleFormSubmit}
            />
        </>
    );
}
