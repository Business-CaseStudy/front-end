import React, { useState } from 'react';
import SidebarComp from '../Navbar/SidebarComp';
import { Button, Card, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

import { createInvestor } from '../../services/investorApi';

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  name: Yup.string().required('Required'),
  iban: Yup.string().required('Required'),
//   investment_amount: Yup.number()
//     .typeError('Must be a number')
//     .required('Required')
//     .positive('Must be positive')
//     .test('decimal', 'Must be a valid decimal', value => value === undefined || /^[0-9]+(\.[0-9]{1,2})?$/.test(value)),
//   investment_date: Yup.date().required('Required'),
});

export default function InvestorForm() {
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      iban: '',

    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      setError(null);
      try {
        await createInvestor(values);
        toast.success('Investor created successfully');
        resetForm();
      } catch (err) {
        console.error('Error creating investor:', err);
        console.error(err?.response?.data?.iban[0])
        if(err?.response?.data?.iban[0]){
            setError(err?.response?.data?.iban[0]);
            toast.error(err?.response?.data?.iban[0]);
        }else {
            setError('Failed to create investor. Please try again.');
            toast.error('Failed to create investor. Please try again.');
        }
      
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComp />
      <div className="container">
      <div style={{ flex: 1, padding: '20px' }}>
      <Card>
                                <Card body>
                                <CardTitle tag="h5">Create New Investor</CardTitle>
      <div style={{ flex: 1, padding: '20px' }}>
       
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
         
          <Card footer>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>
          </Card>
        </Form>
      </div>
      </Card>
      </Card>
      </div>
      </div>
    </div>
  );
}
