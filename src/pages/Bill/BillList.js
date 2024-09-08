import React, { useEffect, useState } from 'react'
import SidebarComp from '../../components/Navbar/SidebarComp'
import { Table } from 'reactstrap';
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
    <div style={{ flex: 1, padding: '20px' }}>
    <div>BillList</div>
    <Table bordered>
                    <thead>
                        <tr>
                            <th>#</th>
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
                                // key={investor.id}
                                // onClick={() => handleRowClick(investor)}
                                // style={{ cursor: 'pointer', backgroundColor: selectedInvestor?.id === investor.id ? '#e9ecef' : '' }}
                            >
                                <th scope="row"></th>
                                <td>{item.investor_name}</td>
                                <td>{item.investor_iban}</td>
                                <td>{item.total_amount}</td>
                                <td>{item.bill_count}</td>
                                <td>{item.pending_count}</td>
                                <td>{item.validated_count}</td>
                                <td>{item.paid_count}</td>
                                <td>
                                    {/* {selectedInvestor?.id === investor.id ? 'Selected' : ''} */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
    </div>
    </div>
    </>
 
  )
}
