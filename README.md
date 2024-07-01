## swm-code-test

This project is a code test which demonstates creating React.js components, communicating between parent and child components and using css to manage responsive media queries.

I have setup an AWS S3 bucket to store the data on AWS. I have also written a Python lambda to communicate with a REST API setup in API Gateway to pull the data.

## Components

Article - This component is a reusable component that takes in the boolean values to manage what is displayed in each article card, **displayImage**, **displayTeaser**, **displayByline**. It also takes in the **article** data and a **className**.

Header - This component is designed to be used for the main header article. It takes in the **article** data.

App - This is the parent component. In this component is where an AWS call is made using axios to get the news data. The data is then set to a state object and passed onto the relevant components to be displayed.

## Cloning and Running the Application

Clone the repository and then run **npm install** to install all relevant npm packages.

Run **npm start** to run the application on localhost:3000.

## Live Application

The application is running on http://3.27.163.131/.
