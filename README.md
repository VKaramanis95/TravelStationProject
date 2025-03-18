# TravelStationProject

#Description
The goal for this assignment is to create a one page application that would consume data
from coindesk-api (https://www.coindesk.com/coindesk-api) and display it using apex charts.
Your application should support the following form
http://<your_ip_address

Your application should serve data from the coindesk-api and a store you will create with
data provided by npm package faker.
The page you will create should provide 3 different sections.
 Simple user profile section/card with data created by faker
 A daterange picker to select the dates you want to access bitcoin’s value history
 Chart to display bitcoin’s accessed data

#Functional Requirements
1. Proper state management via local state or Vue observable function
2. Proper error management from any possible API access failure
Technical
Use modern javascript syntax ES5/6 and provide some tests for verification of your solution.
Your page should be also responsive.
You can use any of the available packages from the NPM repository. Some suggested
packages to use :
 faker
 axios
 mocha / jest for testing the Vue application or even the supertest library to test your
connection with coindesk-api
 apexcharts
 vue date range picker
 Include at least a unit/component test
