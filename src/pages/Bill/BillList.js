import React, { useEffect, useState } from 'react';
import SidebarComp from '../../components/Navbar/SidebarComp';
import { Card, CardTitle, Table, Input, Button, Alert } from 'reactstrap';

import { groupBills } from '../../services/billApi';

const ITEMS_PER_PAGE = 10; // Number of items per page

export default function BillList() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        groupBills().then(response => {
                console.log(response.data);
                setData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const results = data.filter(item =>
            item.investor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.investor_iban.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(results);
        setCurrentPage(1); 
    }, [searchQuery, data]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
                            <Card body>
                                <CardTitle tag="h5">Group Bills by Investor</CardTitle>
                                <Input
                                    type="text"
                                    placeholder="Search by investor name or IBAN"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{ marginBottom: '20px' }}
                                />
                                <div className="table-responsive">
                                    {currentData.length === 0 ? (
                                        <Alert color="info">
                                            No bills found matching "{searchQuery}"
                                        </Alert>
                                    ) : (
                                        <Table bordered>
                                            <thead>
                                                <tr>
                                                    <th>Investor Name</th>
                                                    <th>Investor IBAN</th>
                                                    <th>Total Amount</th>
                                                    <th>Bill Count</th>
                                                    <th>Pending Bill Count</th>
                                                    <th>Validated Bill Count</th>
                                                    <th>Paid Bill Count</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentData.map(item => (
                                                    <tr key={item.id}>
                                                        <td>{item.investor_name}</td>
                                                        <td>{item.investor_iban}</td>
                                                        <td>{item.total_amount}</td>
                                                        <td>{item.bill_count}</td>
                                                        <td>{item.pending_count}</td>
                                                        <td>{item.validated_count}</td>
                                                        <td>{item.paid_count}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <Button
                                                key={index}
                                                color="secondary"
                                                onClick={() => handlePageChange(index + 1)}
                                                active={currentPage === index + 1}
                                                style={{ margin: '0 5px' }}
                                            >
                                                {index + 1}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
