const BASE_URL = 'https://ergast.com/api/f1';

export const fetchRaces = async () => {
  const response = await fetch(`${BASE_URL}/current.json`);
  const data = await response.json();
  return data.MRData.RaceTable.Races;
};

export const fetchDriverStandings = async () => {
  const response = await fetch(`${BASE_URL}/current/driverStandings.json`);
  const data = await response.json();
  return data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
};

export const fetchConstructorStandings = async () => {
  const response = await fetch(`${BASE_URL}/current/constructorStandings.json`);
  const data = await response.json();
  return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
};
