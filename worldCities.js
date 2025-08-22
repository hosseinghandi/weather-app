// worldCities.js
// Comprehensive world cities object (major cities by country code)
// NOTE: Not every single city in the world is included, but this covers
// the largest/most important cities in each country.

const worldCities = {
  "US": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Columbus", "Fort Worth", "Indianapolis", "Charlotte", "Seattle", "Denver", "Washington"],
  "CA": ["Toronto", "Montreal", "Vancouver", "Calgary", "Ottawa", "Edmonton", "Winnipeg", "Quebec City"],
  "MX": ["Mexico City", "Guadalajara", "Monterrey", "Puebla", "Tijuana", "León", "Juárez"],
  "BR": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
  "AR": ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "La Plata"],
  "CO": ["Bogotá", "Medellín", "Cali", "Barranquilla", "Cartagena"],
  "PE": ["Lima", "Arequipa", "Trujillo"],
  "CL": ["Santiago", "Valparaíso", "Concepción"],
  "VE": ["Caracas", "Maracaibo", "Valencia"],
  "GB": ["London", "Birmingham", "Manchester", "Leeds", "Glasgow", "Liverpool", "Newcastle upon Tyne", "Sheffield", "Bristol", "Edinburgh"],
  "IE": ["Dublin", "Cork", "Limerick", "Galway"],
  "FR": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
  "DE": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Dortmund", "Essen", "Leipzig"],
  "ES": ["Madrid", "Barcelona", "Valencia", "Seville", "Zaragoza", "Málaga", "Bilbao"],
  "IT": ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Bologna", "Florence", "Bari", "Catania"],
  "PT": ["Lisbon", "Porto", "Braga", "Coimbra"],
  "NL": ["Amsterdam", "Rotterdam", "The Hague", "Utrecht", "Eindhoven"],
  "BE": ["Brussels", "Antwerp", "Ghent", "Charleroi", "Liège"],
  "CH": ["Zurich", "Geneva", "Basel", "Lausanne", "Bern"],
  "AT": ["Vienna", "Graz", "Linz", "Salzburg", "Innsbruck"],
  "PL": ["Warsaw", "Kraków", "Łódź", "Wrocław", "Poznań", "Gdańsk"],
  "CZ": ["Prague", "Brno", "Ostrava", "Plzeň"],
  "SE": ["Stockholm", "Gothenburg", "Malmö", "Uppsala"],
  "NO": ["Oslo", "Bergen", "Trondheim", "Stavanger"],
  "DK": ["Copenhagen", "Aarhus", "Odense", "Aalborg"],
  "FI": ["Helsinki", "Espoo", "Tampere", "Vantaa"],
  "RU": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Kazan", "Nizhny Novgorod"],
  "UA": ["Kyiv", "Kharkiv", "Odesa", "Dnipro", "Lviv"],
  "TR": ["Istanbul", "Ankara", "Izmir", "Bursa", "Antalya", "Adana", "Gaziantep", "Konya"],
  "GR": ["Athens", "Thessaloniki", "Patras"],
  "RO": ["Bucharest", "Cluj-Napoca", "Timișoara", "Iași"],
  "HU": ["Budapest", "Debrecen", "Szeged"],
  "BG": ["Sofia", "Plovdiv", "Varna", "Burgas"],
  "RS": ["Belgrade", "Novi Sad", "Niš"],
  "HR": ["Zagreb", "Split", "Rijeka", "Osijek"],
  "IS": ["Reykjavík", "Kópavogur", "Hafnarfjörður"],
  "MA": ["Casablanca", "Rabat", "Fes", "Marrakesh", "Tangier"],
  "DZ": ["Algiers", "Oran", "Constantine", "Annaba"],
  "TN": ["Tunis", "Sfax", "Sousse"],
  "EG": ["Cairo", "Alexandria", "Giza", "Shubra El Kheima"],
  "NG": ["Lagos", "Abuja", "Kano", "Ibadan", "Port Harcourt"],
  "ZA": ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"],
  "KE": ["Nairobi", "Mombasa", "Kisumu"],
  "ET": ["Addis Ababa", "Dire Dawa", "Mekelle"],
  "GH": ["Accra", "Kumasi", "Tamale"],
  "CN": ["Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Chengdu", "Chongqing", "Wuhan", "Xi'an", "Hangzhou", "Nanjing", "Tianjin", "Harbin"],
  "JP": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto"],
  "KR": ["Seoul", "Busan", "Incheon", "Daegu", "Daejeon", "Gwangju"],
  "IN": ["Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Pune", "Jaipur", "Surat"],
  "PK": ["Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Peshawar"],
  "BD": ["Dhaka", "Chittagong", "Khulna", "Sylhet"],
  "ID": ["Jakarta", "Surabaya", "Bandung", "Medan", "Bekasi", "Depok"],
  "PH": ["Manila", "Quezon City", "Davao City", "Cebu City", "Zamboanga City"],
  "TH": ["Bangkok", "Nonthaburi", "Nakhon Ratchasima", "Chiang Mai"],
  "VN": ["Ho Chi Minh City", "Hanoi", "Da Nang", "Haiphong", "Can Tho"],
  "MY": ["Kuala Lumpur", "George Town", "Johor Bahru", "Ipoh", "Shah Alam"],
  "SG": ["Singapore"],
  "AU": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra"],
  "NZ": ["Auckland", "Wellington", "Christchurch", "Hamilton", "Dunedin"],
  "IR": ["Tehran", "Mashhad", "Isfahan", "Shiraz", "Tabriz"],
  "IQ": ["Baghdad", "Basra", "Mosul", "Erbil"],
  "SA": ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam"],
  "AE": ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain", "Ajman"],
  "IL": ["Jerusalem", "Tel Aviv", "Haifa"],
  "JO": ["Amman", "Zarqa", "Irbid"],
  "QA": ["Doha", "Al Rayyan"],
  "KW": ["Kuwait City"],
  "BH": ["Manama"],
  "OM": ["Muscat", "Salalah"],
  "NP": ["Kathmandu", "Pokhara"],
  "LK": ["Colombo", "Kandy", "Galle"],
  "MM": ["Yangon", "Mandalay", "Naypyidaw"],
  "KH": ["Phnom Penh", "Siem Reap"],
  "LA": ["Vientiane", "Luang Prabang"],
  "MN": ["Ulaanbaatar", "Erdenet"],
  "KZ": ["Almaty", "Astana", "Shymkent"],
  "UZ": ["Tashkent", "Samarkand", "Bukhara"],
  "AZ": ["Baku", "Ganja"],
  "GE": ["Tbilisi", "Kutaisi", "Batumi"]
};

export default worldCities;



// build index once on app start
// const CITY_INDEX = buildCityIndex(worldCities);

// // on input event
// const input = city; // pretend this comes from a textbox
// const suggestions = getCitySuggestions(input, CITY_INDEX, { limit: 5 });