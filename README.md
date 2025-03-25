# Vue Bitcoin Dashboard

This is a simple one-page Vue application that fetches Bitcoin price data from the **CoinGecko API** and displays it using **ApexCharts**. Additionally, it includes a **user profile section** generated with Faker and a **date range picker** for selecting historical Bitcoin prices.

-**Date Range Restriction:** The free tier of the API restricts fetching data to a maximum range of one year from the current date. If you need to fetch data for a longer historical period, you may need to upgraded subscription plans.

Also you can view the live demo of this application here: [Travel Station Demo](https://travelstation.netlify.app/)


## Features

- **User Profile Card**: Displays randomly generated user details using `faker.js`
- **Bitcoin Price Chart**: Fetches historical Bitcoin data from the `CoinGecko API` and displays it using `ApexCharts`
- **Date Range Picker**: Allows users to select a date range for fetching Bitcoin price history
- **Error Handling**: Handles API failures gracefully with proper messages
- **Unit Testing**: Includes tests using Jest/Mocha for component verification
- **Responsive Design**: Fully optimized for mobile and desktop

---

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/VKaramanis95/TravelStationProject.git

2. Install dependencies:
    npm install

3. Start the development server:
    npm run serve

4. Open in browser:
    http://localhost:8080


## API Integration
This project uses CoinGecko API to fetch Bitcoin historical price data.

# API Endpoint Used:
    https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range

## Project Structure

/src
│── /components
│   ├── UserProfile.vue   # Displays fake user profile
│   ├── DateRangePicker.vue # Date range selection
│   ├── BitcoinChart.vue  # Bitcoin price chart
│── App.vue              
│── main.js 
── /test
│   ├── BitcoinChart.test.js  
│   ├── DateRangePicker.test.js 
│   ├── UserProfileCard.test.js


## Testing
# Run unit tests using Jest:
    npm run test

## Dependencies

- **Vue 3 - Frontend framework**
- **Axios - API calls**
- **ApexCharts - Chart visualization**
- **Vue Date Range Picker**
- **Faker.js - Generate fake user profile data**
- **Jest - Testing framework**






