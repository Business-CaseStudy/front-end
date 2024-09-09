import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import { generatebill } from '../../services/billApi';
import { toast } from 'react-toastify';


export default function GenerateBillForm({ isOpen, toggle, selectedInvestor, onSubmit,setGeneratedBills }) {
    const [billType, setBillType] = useState('membership');
    const [amount, setAmount] = useState(null);
    const [investment_amount, setInvestment_amount] = useState('');
    const [investment_date, setInvestment_date] = useState('');
  
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
      setGeneratedBills(false);
  
      const formData = new FormData(event.target);
      const data = {
        investment_amount: investment_amount,
        investment_date: investment_date,
        bill_type: billType,
        fee_percentage: billType !== 'membership' ? formData.get('fee_percentage') : null,
        date: formData.get('date')
      };
  
      try {
        const response = await generatebill(selectedInvestor.id, data);
        setAmount(response.data.amount);
        setGeneratedBills(true);
  
        // Clear the form fields after successful submission
        setInvestment_amount('');
        setInvestment_date('');
        setBillType('membership');
        event.target.reset();
        toast.success('bill is generated successfully ',amount);
        toggle();
  
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
              />
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
              />
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
  
            {billType !== 'membership' && (
              <FormGroup>
                <Label for="fee_percentage">Fee Percentage</Label>
                <Input
                  id="fee_percentage"
                  name="fee_percentage"
                  type="number"
                  step="0.01"
                  placeholder="Enter fee percentage"
                  required
                />
              </FormGroup>
            )}
  
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                placeholder="Enter date"
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
              <Label for="amount">Generated Bill Amount:</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                value={amount}
                disabled
              />
            </div>
          )}
        </ModalBody>
      </Modal>
    );
  }