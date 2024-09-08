
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import InvestorList from './pages/Investor/InvestorList';
import Home from './pages/Home/Home';
import SidebarComp from './components/Navbar/SidebarComp';
import InvestorForm from './components/Investor/InvestorForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import GenerateBillForm from './components/Bill/GenerateBillForm';
import BillList from './pages/Bill/BillList';
import InvestorDetail from './pages/Investor/InvestorDetail';

function App() {
  return (
  <>
  
    <ToastContainer />
   <Router>

<Routes>
  <Route path="/" element={<Home />}>
  
  </Route>
  <Route path="/investor" element={<InvestorList />}></Route>
  <Route path="/newinvestor" element={<InvestorForm />}></Route>
  {/* InvestorDetail */}
  <Route path="/bill" element={<BillList />}></Route>
  <Route path="/investordetail/:id" element={<InvestorDetail />}></Route>
</Routes>
</Router>
  </>
  
   
  );
}

export default App;
