import React from "react";
import "./UserComponent.css";
import { Accordion } from 'react-bootstrap';

function UserComponent(props) {
    // Initializing the user information from parent component
    const items = props.items;

    return (
        <div className="row gx-2">
            {
                items.map((todo, index) => {
                    let ageDifMs = Date.now() - new Date(todo.date_birth).getTime();
                    let ageDate = new Date(ageDifMs);
                    let age = Math.abs(ageDate.getUTCFullYear() - 1970);

                    return (
                        <div className="col-12 col-md-6 card-sec" key={index}>
                            <div className="card-header">{todo.customer_number} - {todo.first_name}, {todo.last_name}</div>
                            <div className="card-body">
                                <p>Date of Birth: {todo.date_birth}</p>
                                <p>SSN: {todo.ssn}</p>
                                <p>Age: {age}</p>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Click for more details</Accordion.Header>
                                        <Accordion.Body>
                                            <p>Email address: {todo.email}</p>
                                            <p>Primary address: {todo.primary_address.address_line_1}, {todo.primary_address.city}, {todo.primary_address.state}, {todo.primary_address.zip_code}</p>
                                            <p>Mobile phone number: {todo.mobile_phone_number}</p>
                                            <p>Join date: {todo.join_date}</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default UserComponent;