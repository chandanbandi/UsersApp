import React, { useEffect, useState } from "react";
import "./AllUsersComponent.css";
import AddUserComponent from "./AddUserComponent";
import UserComponent from "./UserComponent";


function AllUsersComponent() {
    
    // State defined for data response of api get call
    const [data, setData] = useState([]);
    // State for intializing active pagination element
    const [currentPage, setcurrentPage] = useState(1);
    // State for initializing items in pagination page
    const [itemsInPage, setitemsInPage] = useState(6);
    // State for initializing limit for pagination page
    const [pageNumberLimit, setpageNumberLimit] = useState(6);
    // State for initializing minimum elements per pagination page
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
    // State for initializing maximum elements per pagination page
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(6);
    
    // Click action handler for pagination button
    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    // Initializing pagination numbers in an array for the component
    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsInPage); i++) {
        pages.push(i);
    }

    // Declaring the index of last item in pagination component
    const indexOfLastItem = currentPage * itemsInPage;
    // Declaring the index of first item in pagination component
    const indexofFirstItem = indexOfLastItem - itemsInPage;
    // Declaring the index of first item in pagination component
    const currentItems = data.slice(indexofFirstItem, indexOfLastItem);
    
    // Component for rendering the pagination numbers list
    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number} id={number} className={currentPage === number ? "active" : null} onClick={handleClick}>
                    {number}
                </li>
            );
        } else {
            return null;
        }
    })

    // Executing an async call for api to grab all users information
    useEffect(() => {
        fetch('https://my.api.mockaroo.com/customers.json?key=e95894a0&size=100')
            .then((resp) => resp.json())
            .then((json) => setData(json));
    }, []);

    // Click action handler for next button in paginaton
    const handleNext = () => {
        setcurrentPage(currentPage + 1);
        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }

    // Click action handler for previous button in paginaton
    const handlePrev = () => {
        setcurrentPage(currentPage - 1);
        if ((currentPage - 1) % minPageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    // Updating the data to child component when a new user is added
    const onChange = (newData) => {
        setData(newData);
    }

    // Initializing the component for the increment ellipsis button
    let pageIncrementBtn = null;
    if (currentPage !== pages[pages.length - 1]) {
        pageIncrementBtn = <li onClick={handleNext}> &hellip; </li>;
    }

    // Initializing the component for the decrement ellipsis button
    let pageDecrementBtn = null;
    if (currentPage !== pages[0]) {
        pageDecrementBtn = <li onClick={handlePrev}> &hellip; </li>;
    }
    
    return (
        <div className="card-parent">
            <AddUserComponent items={data} onDataChange={onChange} />
            <UserComponent items={currentItems} />
            <ul className="pageNumbers">
                <li className="previous">
                    <button onClick={handlePrev} disabled={currentPage === pages[0] ? true : false}>Prev</button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li className="next">
                    <button onClick={handleNext} disabled={currentPage === pages[pages.length - 1] ? true : false}>Next</button>
                </li>
            </ul>
        </div>
    );
}

export default AllUsersComponent;
