export function getCountryCode(countryName) {
  const countryMap = {
    "UK": "gb",
    "USA": "us",
    "UAE": "ae",
    "United States": "us",
    "United Kingdom": "gb",
    "Great Britain": "gb",
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
    "Qatar": "qa",
    "Germany": "de",
    "Finland": "fi",
    "Denmark": "dk",
    "Thailand": "th",
    "New Zealand": "nz",
    "Switzerland": "ch",
    "Poland": "pl",
    "Chinese Taipei": "tw",
    // Add more mappings as needed
  };
  
  const lowercaseCountry = countryName.toLowerCase();
  
  for (const [key, value] of Object.entries(countryMap)) {
    if (lowercaseCountry === key.toLowerCase()) {
      return value;
    }
  }
  
  // If the country is not found in our map, log it and return a default
  console.warn(`Country code not found for: ${countryName}`);
  return 'unknown';
}
