# UsersApp

## Create an application to view all customers of a company and to add new ones. This application will be used by employees of the company and will use a Mock API with randomly generated data.

## You are required to use Bootstrap. You can optionally use any combination of JavaScript, TypeScript, jQuery, Angular, React, or Vue.It should work in both mobile and desktop browsers.

## You are free to use any colors, animations, etc. that you think would be aesthetically pleasing and beneficial to the application’s purpose.

### Mock API
Get All Customers (GET)
URL: https://my.api.mockaroo.com/customers.json?key=e95894a0
This always returns a random list of 1000 customers.
You can pass an optional size parameter to limit the number of results.
Example: https://my.api.mockaroo.com/customers.json?key=e95894a0&size=5
Create Customer (POST)
URL: https://my.api.mockaroo.com/customers.json?key=e95894a0
This always returns a 201 status.

### This is not a real API so no customer is actually created. You can always assume the request was successful. If you are persisting the data client-side, you can add this new customer manually.
1. All Customers View
2. Display the information below for all customers.
>> Customer number (five digit random number)
>> First Name
>> Last Name
>> Date of Birth
>> Last 4 of SSN
>> Age (calculated from Date of Birth)
3. For each customer, the user should be able to view some additional information (listed below) in a popover or similar view.
>> Email address
>> Primary address
>> Mobile phone number
>> Join date (when they became customers of the company)
4. Create New Customer View
5. Create a link to display a form that will allow the user to create a new customer with the information below. Once the user clicks “Submit,” they will see the “All Customers“ view again.