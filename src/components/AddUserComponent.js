import React, { useState, useRef } from "react";
import { Modal, Form, Row } from 'react-bootstrap';
import "./AddUserComponent.css";


function AddUserComponent(props) {
    // Initializing the newly added user information
    const items = props.items;

    // Initializing the state for showing modal
    const [show, setShow] = useState(false);
    // Initializing the state for validating user form
    const [validated, setValidated] = useState(false);
    // Initializing the refernce for user form
    const formRef = useRef(null);

    // Initializing the states for user form elements
    const [customerNumber, setCustomerNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [ssn, setSsn] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    
    // Initializing the state for data response form asyn post call to api 
    const [data, setData] = useState([]);

    // Initializing the handler for closing the modal
    const handleClose = () => setShow(false);
    // Initializing the handler for showing the modal
    const handleShow = () => setShow(true);

    // Initializing the handler for form reset
    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
    };

    // Functionality for formatting SSN form value
    function formatSSN(value) {
        if (!value) return value;
        const ssnNumber = value.replace(/[^\d]/g, "");
        const ssnNumberLength = ssnNumber.length;

        if (ssnNumberLength < 4) return ssnNumber;

        if (ssnNumberLength < 7) {
            return `${ssnNumber.slice(0, 3)}-${ssnNumber.slice(3)}`;
        }

        return `${ssnNumber.slice(0, 3)}-${ssnNumber.slice(3, 5)}-${ssnNumber.slice(5, 9)}`;
    }

    // Functionality for formatting Mobile phone number form value
    function formatPhoneNumber(value) {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, "");
        const phoneNumberLength = phoneNumber.length;

        if (phoneNumberLength < 4) return phoneNumber;

        if (phoneNumberLength < 7) {
            return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
        }

        return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    }

    // Initalizing handler for customer number
    const handleChangeCustomerNumber = (e) => {
        let maxLength = e.target.maxLength;
        let valueLength = e.target.value.length;
        if (valueLength > maxLength) {
            return false;
        }
        setCustomerNumber(e.target.value);
    };

    // Initalizing handler for customer's zipcode
    const handleZipCode = (e) => {
        let maxLength = e.target.maxLength;
        let valueLength = e.target.value.length;
        if (valueLength > maxLength) {
            return false;
        }
        setZipCode(e.target.value);
    };

    // Initalizing handler for customer's ssn
    const handleChangeSSN = (e) => {
        const formattedSSN = formatSSN(e.target.value);
        setSsn(formattedSSN);
    };

    // Initalizing handler for customer's mobile phone number
    const handleChangePhonenumber = (e) => {
        const formattedPhonenumber = formatPhoneNumber(e.target.value);
        setMobilePhoneNumber(formattedPhonenumber);
    };

    // Initalizing handler for create user form submit
    const handleSubmit = (e) => {
        const form = e.currentTarget;
        handleReset();
        setValidated(true);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();
            setShow(false);

            const formData = {
                customer_number: Number(customerNumber),
                date_birth: dateOfBirth.split("-")[1] + "/" + dateOfBirth.split("-")[2] + "/" + dateOfBirth.split("-")[0],
                email: emailAddress,
                first_name: firstName,
                last_name: lastName,
                join_date: new Date().toLocaleDateString(),
                mobile_phone_number: mobilePhoneNumber,
                primary_address: { address_line_1: addressLine1, city: city, state: state, zip_code: zipCode },
                ssn: ssn
            };

            fetch('https://my.api.mockaroo.com/customers.json?key=e95894a0&size=100',
                {
                    method: 'POST',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                .then((resp) => resp.json())
                .then((json) => setData(json));
            items.push(formData);
            props.onDataChange(items);
        }

    };


    return (
        <div className="card-head">
            <div className="row my-4">
                <div className="col text-end">
                    <button className="btn btn-cta" onClick={handleShow}>Add New Customer</button>
                </div>

                <Modal show={show} onHide={handleClose} size="xl" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group className="col-12 col-lg-4" controlId="formCustomerNumber">
                                    <Form.Label>Customer Number</Form.Label>
                                    <Form.Control type="number" maxLength={5} value={customerNumber} required={true} onChange={(e) => handleChangeCustomerNumber(e)} placeholder="Enter Customer Number" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-4" controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={firstName} required={true} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-4" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={lastName} required={true} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="col-12 col-lg-3" controlId="formDateOfBirth">
                                    <Form.Label>Date of Birth</Form.Label>
                                    <Form.Control type="date" value={dateOfBirth} required={true} onChange={(e) => setDateOfBirth(e.target.value)} placeholder="Enter Date of Birth" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formSSN">
                                    <Form.Label>SSN</Form.Label>
                                    <Form.Control type="text" value={ssn} required={true} onChange={(e) => handleChangeSSN(e)} placeholder="Enter SSN" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" value={emailAddress} required={true} onChange={(e) => setEmailAddress(e.target.value)} placeholder="Enter Email Address" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formPhoneNumber">
                                    <Form.Label>Mobile Phone Number</Form.Label>
                                    <Form.Control type="text" value={mobilePhoneNumber} required={true} onChange={(e) => handleChangePhonenumber(e)} placeholder="Enter Mobile Phone Number" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group className="col-12 col-lg-3" controlId="formAddressLine1">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control type="text" value={addressLine1} required={true} onChange={(e) => setAddressLine1(e.target.value)} placeholder="Enter Address Line 1" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formCity">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" value={city} required={true} onChange={(e) => setCity(e.target.value)} placeholder="Enter City" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formState">
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" value={state} required={true} onChange={(e) => setState(e.target.value)} placeholder="Enter State" />
                                </Form.Group>

                                <Form.Group className="col-12 col-lg-3" controlId="formZipcode">
                                    <Form.Label>Zipcode</Form.Label>
                                    <Form.Control type="text" maxLength={5} value={zipCode} required={true} onChange={(e) => handleZipCode(e)} placeholder="Enter Zipcode" />
                                </Form.Group>
                            </Row>
                            <button className="btn btn-cta" type="submit">
                                Submit
                            </button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>

        </div>
    );
}

export default AddUserComponent;