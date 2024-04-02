[![CodeQL](https://github.com/synjan/f1app/actions/workflows/codeql.yml/badge.svg)](https://github.com/synjan/f1app/actions/workflows/codeql.yml)
# F1App

F1App is a web application built with React that provides information about the current Formula 1 season. It allows users to view the race schedule, countdown to upcoming races, and see key race results.

## Features

- Displays a list of races for the current Formula 1 season
- Shows race information including name, location, and date
- Provides a countdown timer for upcoming races
- Allows users to click on a race to view detailed information
- Fetches race results for finished races and displays the winner and other key information
- Automatically scrolls to the next upcoming race on initial load
- Restores scroll position when navigating back from race details

## Technologies Used

- React: JavaScript library for building user interfaces
- Axios: Promise-based HTTP client for making API requests
- date-fns: Library for manipulating and formatting dates
- Ergast API: API providing Formula 1 data

## Getting Started

To run the F1App locally on your machine, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/synjan/f1app.git
   ```

2. Navigate to the project directory:
   ```
   cd f1app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to see the app running.

## Project Structure

The project structure is as follows:

```
f1app/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/
  │   │   ├── RaceCard.js
  │   │   ├── RaceCard.css
  │   │   ├── RaceDetail.js
  │   │   └── RaceDetail.css
  │   ├── App.js
  │   ├── App.css
  │   └── index.js
  ├── .gitignore
  ├── package.json
  └── README.md
```

- `public/`: Contains the public assets and the HTML template.
- `src/`: Contains the source code of the application.
  - `components/`: Contains reusable components used in the app.
    - `RaceCard.js`: Component for displaying a race card with basic information.
    - `RaceCard.css`: Styles for the `RaceCard` component.
    - `RaceDetail.js`: Component for displaying detailed information about a race.
    - `RaceDetail.css`: Styles for the `RaceDetail` component.
  - `App.js`: The main component that fetches data and renders the race list and details.
  - `App.css`: Styles for the `App` component.
  - `index.js`: The entry point of the application.
- `.gitignore`: Specifies files and directories to be ignored by Git.
- `package.json`: Contains project metadata and dependencies.
- `README.md`: Provides information and instructions about the project.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [Create React App](https://create-react-app.dev/)
- [Ergast API](http://ergast.com/mrd/)
- [date-fns](https://date-fns.org/)
- [Axios](https://axios-http.com/)

