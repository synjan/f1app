import React, { useState, useEffect } from "react";
// Remove this import if it's not used elsewhere
// import axios from 'axios';
import RaceCountdown from './RaceCountdown';
import RaceDetails from './RaceDetails';
import { formatDateTimeNordic } from '../utils/dateUtils';

// Simple component definitions
const Button = ({ children, className, ...props }) => (
  <button className={`px-4 py-2 rounded-md ${className}`} {...props}>{children}</button>
);
const Card = ({ children, className, ...props }) => (
  <div className={`bg-card text-card-foreground rounded-lg shadow-sm ${className}`} {...props}>{children}</div>
);
const CardHeader = ({ children, ...props }) => <div className="p-6" {...props}>{children}</div>;
const CardTitle = ({ children, ...props }) => <h3 className="text-lg font-semibold" {...props}>{children}</h3>;
const CardDescription = ({ children, ...props }) => <p className="text-sm text-muted-foreground" {...props}>{children}</p>;
const CardContent = ({ children, ...props }) => <div className="p-6 pt-0" {...props}>{children}</div>;

export default function Dashboard() {
  const [races, setRaces] = useState([])
  const [driverStandings, setDriverStandings] = useState([])
  const [constructorStandings, setConstructorStandings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [nextRace, setNextRace] = useState(null)
  const [selectedRace, setSelectedRace] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [racesResponse, driversResponse, constructorsResponse] = await Promise.all([
          fetch('https://ergast.com/api/f1/current.json'),
          fetch('https://ergast.com/api/f1/current/driverStandings.json'),
          fetch('https://ergast.com/api/f1/current/constructorStandings.json')
        ])

        const racesData = await racesResponse.json()
        const driversData = await driversResponse.json()
        const constructorsData = await constructorsResponse.json()

        setRaces(racesData.MRData.RaceTable.Races)
        setDriverStandings(driversData.MRData.StandingsTable.StandingsLists[0].DriverStandings.slice(0, 3))
        setConstructorStandings(constructorsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.slice(0, 3))

        // Set the next race
        const now = new Date()
        const nextRace = racesData.MRData.RaceTable.Races.find(race => new Date(`${race.date}T${race.time}`) > now)
        setNextRace(nextRace)

        // Remove the weather API call
        // if (nextRace) {
        //   const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
        //   const location = `${nextRace.Circuit.Location.locality},${nextRace.Circuit.Location.country}`;
        //   const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
        //   setWeatherData(weatherResponse.data.list.slice(0, 8));
        // }

      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getUpcomingRaces = () => {
    const today = new Date()
    return races.filter(race => new Date(`${race.date}T${race.time}`) > today).slice(0, 3)
  }

  const handleRaceClick = (race) => {
    setSelectedRace(selectedRace && selectedRace.round === race.round ? null : race)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-destructive">Error: {error}</div>
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
        <span className="text-2xl font-bold font-heading">F1</span>
        <Button className="bg-primary-foreground text-primary">
          <BellIcon className="h-4 w-4 mr-2" />
          Notifications
        </Button>
      </header>
      <main className="flex-1 p-6 md:p-10">
        <div className="grid gap-6">
          {nextRace && <RaceCountdown nextRace={nextRace} />}
          <section>
            <h2 className="text-2xl font-bold mb-4 font-heading">Upcoming Races</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {getUpcomingRaces().map(race => (
                <div key={race.round}>
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedRace && selectedRace.round === race.round ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleRaceClick(race)}
                  >
                    <CardHeader>
                      <CardTitle>{race.raceName}</CardTitle>
                      <CardDescription>{formatDateTimeNordic(race.date, race.time)}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://flagcdn.com/w80/${getCountryCode(race.Circuit.Location.country)}.png`}
                          width="80"
                          height="60"
                          alt={`Flag of ${race.Circuit.Location.country}`}
                          className="rounded-md object-cover"
                          style={{ aspectRatio: "4/3" }}
                        />
                        <div>
                          <p className="font-medium">{race.Circuit.circuitName}</p>
                          <p className="text-sm text-muted-foreground">{race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {selectedRace && selectedRace.round === race.round && (
                    <RaceDetails 
                      race={race} 
                      onClose={() => setSelectedRace(null)}
                      // Remove this line
                      // weatherData={race.round === nextRace.round ? weatherData : null}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 font-heading">Current Standings</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Driver Standings</CardTitle>
                  <CardDescription>Top 3 - Current Season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {driverStandings.map((driver, index) => (
                      <div key={driver.Driver.driverId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{driver.Driver.givenName} {driver.Driver.familyName}</p>
                            <p className="text-sm text-muted-foreground">{driver.Constructors[0].name}</p>
                          </div>
                        </div>
                        <div className="font-semibold">{driver.points} PTS</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Constructor Standings</CardTitle>
                  <CardDescription>Top 3 - Current Season</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {constructorStandings.map((constructor, index) => (
                      <div key={constructor.Constructor.constructorId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{constructor.Constructor.name}</p>
                            <p className="text-sm text-muted-foreground">&nbsp;</p>
                          </div>
                        </div>
                        <div className="font-semibold">{constructor.points} PTS</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function BellIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

function getCountryCode(countryName) {
  const countryMap = {
    "UK": "gb",
    "USA": "us",
    "UAE": "ae",
    "United States": "us",
    "United Kingdom": "gb",
    "Korea": "kr",
    "Russia": "ru",
    "Mexico": "mx",
    "Brazil": "br",
    "Japan": "jp",
    "Australia": "au",
    "China": "cn",
    "Canada": "ca",
    "Azerbaijan": "az",
    "Bahrain": "bh",
    "Vietnam": "vn",
    "Netherlands": "nl",
    "Spain": "es",
    "Monaco": "mc",
    "Austria": "at",
    "France": "fr",
    "Hungary": "hu",
    "Belgium": "be",
    "Italy": "it",
    "Singapore": "sg",
    "Saudi Arabia": "sa",
    "Abu Dhabi": "ae",
  };
  
  const lowercaseCountry = countryName.toLowerCase();
  
  for (const [key, value] of Object.entries(countryMap)) {
    if (lowercaseCountry === key.toLowerCase()) {
      return value;
    }
  }
  
  return lowercaseCountry.replace(/\s+/g, '');
}