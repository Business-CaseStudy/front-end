import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { generatebill } from '../../api';  // Adjust the import path as necessary

export default function GenerateBillForm({ isOpen, toggle, selectedInvestor, onSubmit }) {
  const [billType, setBillType] = useState('membership');
  const [amount, setAmount] = useState(null);
  const [investment_amount, setInvestment_amount] = useState();
  const [investment_date, setInvestment_date] = useState(null);
  const handleBillTypeChange = (event) => {
    setBillType(event.target.value);
  };
  const handleInvAmountChange = (event) => {
    setInvestment_amount(event.target.value);
  };
  const handleInvDateChange = (event) => {
    setInvestment_date(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
       // amount: formData.get('amount'),
        // description: formData.get('description'),
        investment_amount:investment_amount,
        investment_date:investment_date,
        bill_type: billType,
        fee_percentage: billType !== 'membership' ? formData.get('fee_percentage') : null,
        date: formData.get('date')
    };

    try {
        console.log("investor_id",selectedInvestor.id)
      const response = await generatebill(selectedInvestor.id, data); 
      setAmount(response.data.amount); // Set the returned amount
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
    <ModalHeader toggle={toggle}>Generate Bill for {selectedInvestor?.name}</ModalHeader>
    <ModalBody>
      <form onSubmit={handleSubmit}>
      <FormGroup>
            <Label for="investment_amount">Investment Amount</Label>
            <Input
              id="investment_amount"
              name="investment_amount"
              type="number"
              step="0.01"
              placeholder="Investment amount"
              value={investment_amount}
              onChange={handleInvAmountChange}
            //   onBlur={formik.handleBlur}
            />
            {/* {formik.touched.investment_amount && formik.errors.investment_amount ? (
              <div style={{ color: 'red' }}>{formik.errors.investment_amount}</div>
            ) : null} */}
          </FormGroup>
          <FormGroup>
            <Label for="investment_date">Investment Date</Label>
            <Input
              id="investment_date"
              name="investment_date"
              type="date"
              placeholder="Investment date placeholder"
              value={investment_date}
              onChange={handleInvDateChange}
              //onBlur={handleBlur}
            />
            {/* {formik.touched.investment_date && formik.errors.investment_date ? (
              <div style={{ color: 'red' }}>{formik.errors.investment_date}</div>
            ) : null} */}
          </FormGroup> 
        <FormGroup>
          <Label for="bill_type">Bill Type</Label>
          <Input
            id="bill_type"
            name="bill_type"
            type="select"
            value={billType}
            onChange={handleBillTypeChange}
          >
            <option value="membership">Membership</option>
            <option value="upfront">Upfront Fees</option>
            <option value="yearly">Yearly Fees</option>
          </Input>
        </FormGroup>

        {/* Conditionally render fee_percentage field */}
        {billType !== 'membership' && (
          <FormGroup>
            <Label for="fee_percentage">Fee Percentage</Label>
            <Input
              id="fee_percentage"
              name="fee_percentage"
              type="number"
              step="0.01"
              placeholder="Enter fee percentage"
              //value={fee_percentage}
            //   onChange={(e) => setFeePercentage(e.target.value)}
              required
            />
          </FormGroup>
        )}

        {/* <FormGroup>
          <Label for="amount">Amount</Label>
          <Input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            readOnly
          />
        </FormGroup> */}

        <FormGroup>
          <Label for="date">Date</Label>
          <Input
            id="date"
            name="date"
            type="date"
            placeholder="Enter date"
            // value={date}
            // onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <ModalFooter>
          <Button type="submit" color="primary">Submit</Button>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </form>
      {amount !== null && (
          <div>
            <h5>Generated Bill Amount: {amount}</h5>
          </div>
        )}
    </ModalBody>
  </Modal>
  );
}
