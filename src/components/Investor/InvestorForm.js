import React, { useState } from 'react';
import SidebarComp from '../Navbar/SidebarComp';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { createInvestor } from '../../api';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

// Validation Schema with Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  name: Yup.string().required('Required'),
  iban: Yup.string().required('Required'),
  investment_amount: Yup.number()
    .typeError('Must be a number')
    .required('Required')
    .positive('Must be positive')
    .test('decimal', 'Must be a valid decimal', value => value === undefined || /^[0-9]+(\.[0-9]{1,2})?$/.test(value)),
  investment_date: Yup.date().required('Required'),
});

export default function InvestorForm() {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      iban: '',
      investment_amount: '',
      investment_date: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        await createInvestor(values);
        toast.success('Investor created successfully');
        // Reset the form
        resetForm();
      } catch (err) {
        // Handle error
        console.error('Error creating investor:', err);
        setError('Failed to create investor. Please try again.');
        toast.error('Failed to create investor. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComp />
      <div style={{ flex: 1, padding: '20px' }}>
        <h1>Create New Investor</h1>
        <Form onSubmit={formik.handleSubmit}>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="with a placeholder"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div style={{ color: 'red' }}>{formik.errors.email}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="name placeholder"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div style={{ color: 'red' }}>{formik.errors.name}</div>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="iban">IBAN</Label>
            <Input
              id="iban"
              name="iban"
              placeholder="IBAN example"
              value={formik.values.iban}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.iban && formik.errors.iban ? (
              <div style={{ color: 'red' }}>{formik.errors.iban}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="investment_amount">Investment Amount</Label>
            <Input
              id="investment_amount"
              name="investment_amount"
              type="number"
              step="0.01"
              placeholder="Investment amount"
              value={formik.values.investment_amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.investment_amount && formik.errors.investment_amount ? (
              <div style={{ color: 'red' }}>{formik.errors.investment_amount}</div>
            ) : null}
          </FormGroup>
          <FormGroup>
            <Label for="investment_date">Investment Date</Label>
            <Input
              id="investment_date"
              name="investment_date"
              type="date"
              placeholder="Investment date placeholder"
              value={formik.values.investment_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.investment_date && formik.errors.investment_date ? (
              <div style={{ color: 'red' }}>{formik.errors.investment_date}</div>
            ) : null}
          </FormGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
        </Form>
      </div>
    </div>
  );
}
