# Star Wars Quiz - UI

This project is created as part of interview process in Preezie. 
## Run the project

In the project directory, run:
`yarn start`

## Feature Overview

* All fields are dynamically generated from API.
* After each answer, the data is sent to backend for persistence.
* The app is for single user. All answers are remembered until backend is restarted.

## Development Notes
* This app is based on [CRA](https://github.com/facebook/create-react-app) and relies on many of its built-in capability, such as bundling and environment variable support. 

* For simplicity, only minimal error handling / validation is done. But the project should demonstrate the concept of using RXjs as a pipeline to allow seemless data flow that facilates loose coupling between components.
  
* While the pages are responsive, only basic layout and styling is applied.
