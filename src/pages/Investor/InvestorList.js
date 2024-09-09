import React, { useEffect, useState } from 'react';
import { Table, Button, Card, CardTitle, CardBody, CardFooter, Input } from 'reactstrap';
import SidebarComp from '../../components/Navbar/SidebarComp';
import GenerateBillForm from '../../components/Bill/GenerateBillForm';
import { useNavigate } from 'react-router-dom';
import { RiAiGenerate } from 'react-icons/ri';
import { getInvestor } from '../../services/investorApi';

const ITEMS_PER_PAGE = 10; 

export default function InvestorList() {
    const [investors, setInvestors] = useState([]);
    const [filteredInvestors, setFilteredInvestors] = useState([]);
    const [selectedInvestor, setSelectedInvestor] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [billGenerated,setBillGenerated]= useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getInvestor().then(response => { 
                setInvestors(response.data);
                setFilteredInvestors(response.data);
            })
            .catch(error => console.error('Error fetching investors:', error));
    }, []);

    useEffect(() => {
        const results = investors.filter(investor =>
            investor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredInvestors(results);
        setCurrentPage(1);
    }, [searchQuery, investors,billGenerated]);

    const handleRadioChange = (investor) => {
        setSelectedInvestor(investor);
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
        toggleModal(); 
    };

    const handleUsernameClick = (id) => {
        navigate(`/investordetail/${id}`); 
    };

    const totalPages = Math.ceil(filteredInvestors.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentInvestors = filteredInvestors.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div style={{ display: 'flex' }}>  
                <SidebarComp />
                <div className="container">
                    <div style={{ flex: 1, padding: '20px' }}>
                        <Card>
                            <CardBody>
                                <CardTitle tag="h5">Investor List</CardTitle>
                                <Input
                                    type="text"
                                    placeholder="Search by investor name"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ marginBottom: '20px' }}
                                />
                                <div className="table-responsive" style={{ flex: 1, padding: '20px' }}>
                                    <Table bordered className="text-center">
                                        <thead>
                                            <tr>
                                                <th>Select</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>IBAN</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentInvestors.map(investor => (
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
                                                    <td>
                                                        <Button color="link" onClick={() => handleUsernameClick(investor.id)}>
                                                            {investor.name}
                                                        </Button>
                                                    </td>
                                                    <td>{investor.email}</td>
                                                    <td>{investor.iban}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <CardFooter>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Button 
                                                color="primary" 
                                                onClick={handleGenerateBill} 
                                                disabled={!selectedInvestor}
                                            >
                                                <RiAiGenerate /> Generate Bill
                                            </Button>
                                            <div>
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <Button
                                                        key={index}
                                                        color="secondary"
                                                        onClick={() => handlePageChange(index + 1)}
                                                        active={currentPage === index + 1}
                                                    >
                                                        {index + 1}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </CardFooter>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            <GenerateBillForm
                isOpen={modalOpen}
                toggle={toggleModal}
                selectedInvestor={selectedInvestor}
                setGeneratedBills={setBillGenerated}
                onSubmit={handleFormSubmit}
            />
        </>
    );
}
