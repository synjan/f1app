# F1App README

## Project Title

F1App - A React App for Displaying F1 Season 2024 Race Information

## Introduction

F1App is a React-based web application designed to provide users with detailed information about the Formula 1 season for the year 2024. It fetches data regarding race schedules, including practice and qualifying sessions, and displays this information in an easy-to-read format. The application integrates various technologies, including Axios for data fetching, xml2js for XML parsing, and custom React components for displaying race information.

## Table of Contents

- [F1App README](#f1app-readme)
  - [Project Title](#project-title)
  - [Introduction](#introduction)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Dependencies](#dependencies)
  - [Configuration](#configuration)
  - [Documentation](#documentation)
  - [Examples](#examples)
  - [Troubleshooting](#troubleshooting)
  - [Contributors](#contributors)
  - [License](#license)

## Installation

To install F1App, follow these steps:

1. Ensure you have Node.js and npm installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the project directory and install the dependencies by running:

```bash
npm install
```

This will install all necessary dependencies as listed in the `package.json` file.

## Usage

To run F1App, use the following npm scripts:

- **Start the development server:**

```bash
npm start
```

- **Build the application for production:**

```bash
npm run build
```

- **Run tests:**

```bash
npm test
```

After starting the development server, the application will be accessible at `http://localhost:3000/`.

## Features

- Fetches and displays the F1 season 2024 race schedule.
- Parses XML data received from the Ergast API (http://ergast.com/api/f1/2024).
- Provides detailed information for each race, including practice and qualifying sessions.
- Displays a countdown to each race session based on the user's local time zone.
- Utilizes React components for a modular and maintainable codebase.

## Dependencies

F1App relies on the following key dependencies:

- `@craco/craco` for custom webpack configuration.
- `axios` for promise-based HTTP requests.
- `react` and `react-dom` for building the user interface.
- `xml2js` for parsing XML data into JavaScript objects.
- Browserify shims like `buffer`, `stream-browserify`, and `timers-browserify` for compatibility in the browser environment.

## Configuration

Webpack configuration is customized using CRACO (Create React App Configuration Override) to include polyfills for Node.js core modules, which are not natively supported in the browser.

## Documentation

The application's source code is self-documented, with comments explaining key functionalities and decisions. For more detailed React documentation, visit [React official documentation](https://reactjs.org/docs/getting-started.html).

## Examples

See the `F1Season2024` and `RaceCard` components for examples of how to use Axios for data fetching, xml2js for parsing, and React hooks for managing state and effects.

## Troubleshooting

- If you encounter issues with starting the app, ensure all dependencies are correctly installed.
- For errors related to the API fetch, check the network requests in the browser's developer tools for clues.

## Contributors

To contribute to F1App, please fork the repository, make your changes, and submit a pull request. All contributions are welcome!

## License

This project is open-source and available under the MIT License. See the LICENSE file for more information.

