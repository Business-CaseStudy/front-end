import React, { useEffect, useState } from 'react'
import SidebarComp from '../../components/Navbar/SidebarComp'
import { Card, CardTitle, Table } from 'reactstrap';
import api from '../../api';

export default function BillList() {
    const [data, setData] = useState([]);
    
    // const [selectedInvestor, setSelectedInvestor] = useState(null);
    // const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        api.get('/bill/group-bills/')
            .then(response =>{ 
                console.log(response.data);
                setData(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);


  return (
    <>
       <div style={{ display: 'flex' }}>  
    <SidebarComp />
    <div className="container">
                <div style={{ flex: 1, padding: '20px' }}>
                <Card>
                                <Card body>
                                <CardTitle tag="h5"> Group Bills by Investor</CardTitle>
    <div style={{ flex: 1, padding: '20px' }}>
   
    <Table bordered>
                    <thead>
                        <tr>
                          
                            <th>investor name</th>
                            <th>investor IBAN</th>
                            <th>Total Amount</th>
                            <th>bill count</th>
                            <th>pending bill count</th>
                            <th>valid bill count</th>
                            <th>paid bill count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map(item => (
                            <tr
                            
                            >
                               
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
    </div>
    </Card>
    </Card>
    </div>
    </div>
    </div>
    </>
 
  )
}
