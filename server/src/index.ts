import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Flight } from './models/Flight';
import { Hotel } from './models/Hotel';
import { Holiday } from './models/Holiday';
import { Visa } from './models/Visa';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/travel-finder';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Seed Data
const seedFlights = [
  {
    airline: 'US-Bangla Airlines',
    logo: 'BS',
    origin: 'Dhaka',
    originCode: 'DAC',
    destination: "Cox's Bazar",
    destinationCode: 'CXB',
    departureTime: '08:00',
    arrivalTime: '09:05',
    duration: '1h 05m',
    price: 4500,
    currency: 'BDT',
    stops: 0,
    type: 'domestic'
  },
  {
    airline: 'Biman Bangladesh',
    logo: 'BG',
    origin: 'Dhaka',
    originCode: 'DAC',
    destination: 'Chittagong',
    destinationCode: 'CGP',
    departureTime: '10:30',
    arrivalTime: '11:15',
    duration: '0h 45m',
    price: 3200,
    currency: 'BDT',
    stops: 0,
    type: 'domestic'
  },
  {
    airline: 'Novoair',
    logo: 'VQ',
    origin: 'Dhaka',
    originCode: 'DAC',
    destination: 'Sylhet',
    destinationCode: 'ZYL',
    departureTime: '14:00',
    arrivalTime: '14:45',
    duration: '0h 45m',
    price: 3500,
    currency: 'BDT',
    stops: 0,
    type: 'domestic'
  },
  {
    airline: 'Biman Bangladesh',
    logo: 'BG',
    origin: 'Dhaka',
    originCode: 'DAC',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '11:00',
    arrivalTime: '16:30',
    duration: '10h 30m',
    price: 85000,
    currency: 'BDT',
    stops: 1,
    type: 'international'
  },
  {
    airline: 'US-Bangla Airlines',
    logo: 'BS',
    origin: 'Dhaka',
    originCode: 'DAC',
    destination: 'Bangkok',
    destinationCode: 'BKK',
    departureTime: '09:45',
    arrivalTime: '13:15',
    duration: '2h 30m',
    price: 22000,
    currency: 'BDT',
    stops: 0,
    type: 'international'
  }
];

const seedHotels = [
  {
    name: 'Royal Tulip Sea Pearl Beach Resort',
    location: "Cox's Bazar",
    rating: 5,
    price: 12500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
    amenities: ['Pool', 'Spa', 'Gym', 'Beach View', 'Free Breakfast']
  },
  {
    name: 'Sayeman Beach Resort',
    location: "Cox's Bazar",
    rating: 4.5,
    price: 15000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=600&auto=format&fit=crop',
    amenities: ['Pool', 'Beach Access', 'Restaurant', 'WiFi']
  },
  {
    name: 'The Westin Dhaka',
    location: 'Dhaka',
    rating: 5,
    price: 22000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop',
    amenities: ['City View', 'Pool', 'Spa', 'Executive Lounge']
  },
  {
    name: 'Grand Sultan Tea Resort',
    location: 'Sylhet',
    rating: 5,
    price: 18000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1571896349842-6e53ce41e887?q=80&w=600&auto=format&fit=crop',
    amenities: ['Golf', 'Pool', 'Tea Garden', 'Nature View']
  },
  {
    name: 'Hotel Sea Crown',
    location: "Cox's Bazar",
    rating: 3,
    price: 4500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=600&auto=format&fit=crop',
    amenities: ['Beachfront', 'Restaurant', 'AC']
  }
];

const seedHolidays = [
  {
    title: 'Bali Escape Package',
    destination: 'Bali, Indonesia',
    duration: '4 Days 3 Nights',
    price: 85000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop',
    inclusions: ['Flight', 'Hotel', 'Breakfast', 'Airport Transfer']
  },
  {
    title: 'Dubai Adventure',
    destination: 'Dubai, UAE',
    duration: '5 Days 4 Nights',
    price: 95000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea932a23518?q=80&w=600&auto=format&fit=crop',
    inclusions: ['Flight', '4 Star Hotel', 'Desert Safari', 'Visa Support']
  },
  {
    title: 'Majestic Maldives',
    destination: 'Maldives',
    duration: '3 Days 2 Nights',
    price: 65000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop',
    inclusions: ['Flight', 'Water Villa', 'All Meals', 'Speedboat Transfer']
  },
  {
    title: 'Explore Thailand',
    destination: 'Bangkok & Phuket',
    duration: '6 Days 5 Nights',
    price: 55000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=600&auto=format&fit=crop',
    inclusions: ['Flight', 'Hotel', 'City Tour', 'Breakfast']
  },
  {
    title: 'Singapore Delight',
    destination: 'Singapore',
    duration: '4 Days 3 Nights',
    price: 75000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop',
    inclusions: ['Flight', 'Hotel', 'Sentosa Island', 'Visa Assistance']
  }
];

const seedVisas = [
  {
    country: 'Thailand',
    type: 'Tourist Visa',
    processingTime: '5-7 Working Days',
    price: 5500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=600&auto=format&fit=crop',
    requiredDocuments: ['Passport', 'Photo', 'Bank Statement', 'NOC']
  },
  {
    country: 'Malaysia',
    type: 'E-Visa',
    processingTime: '2-3 Working Days',
    price: 6500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=600&auto=format&fit=crop',
    requiredDocuments: ['Passport', 'Photo', 'Ticket Booking']
  },
  {
    country: 'United Arab Emirates',
    type: 'Tourist Visa',
    processingTime: '3-4 Working Days',
    price: 15000,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=600&auto=format&fit=crop',
    requiredDocuments: ['Passport', 'Photo']
  },
  {
    country: 'Singapore',
    type: 'Tourist Visa',
    processingTime: '5-6 Working Days',
    price: 5500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop',
    requiredDocuments: ['Passport', 'Photo', 'Bank Statement', 'Invitation Letter']
  },
  {
    country: 'India',
    type: 'Tourist Visa',
    processingTime: '7-10 Working Days',
    price: 1500,
    currency: 'BDT',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop',
    requiredDocuments: ['Passport', 'Photo', 'Utility Bill', 'NID']
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Flight.deleteMany({});
    await Hotel.deleteMany({});
    await Holiday.deleteMany({});
    await Visa.deleteMany({});
    
    // Seed new data
    await Flight.insertMany(seedFlights);
    await Hotel.insertMany(seedHotels);
    await Holiday.insertMany(seedHolidays);
    await Visa.insertMany(seedVisas);
    
    console.log('Database seeded with all initial data');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Call seed function on connection
mongoose.connection.once('open', seedDatabase);

// Routes
app.get('/', (req, res) => {
  res.send('E Travel API is running');
});

// Flights API
app.get('/api/flights', async (req, res) => {
  try {
    const { from, to } = req.query;
    let query: any = {};
    
    if (from) {
      const search = (from as string).replace(/\(.*\)/, '').trim();
      query.$or = [
        { origin: { $regex: search, $options: 'i' } },
        { originCode: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (to) {
      const search = (to as string).replace(/\(.*\)/, '').trim();
      if (query.$or) {
         query.$and = [
             { $or: query.$or },
             { $or: [
                 { destination: { $regex: search, $options: 'i' } },
                 { destinationCode: { $regex: search, $options: 'i' } }
             ]}
         ];
         delete query.$or;
      } else {
          query.$or = [
            { destination: { $regex: search, $options: 'i' } },
            { destinationCode: { $regex: search, $options: 'i' } }
          ];
      }
    }
    
    const flights = await Flight.find(query);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error });
  }
});

// Hotels API
app.get('/api/hotels', async (req, res) => {
  try {
    const { location } = req.query;
    let query: any = {};
    
    if (location) {
      const search = (location as string).trim();
      query.$or = [
        { location: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } }
      ];
    }
    
    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotels', error });
  }
});

// Holidays API
app.get('/api/holidays', async (req, res) => {
  try {
    const { dest } = req.query;
    let query: any = {};
    
    if (dest) {
      const search = (dest as string).trim();
      query.$or = [
        { destination: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } }
      ];
    }
    
    const holidays = await Holiday.find(query);
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching holidays', error });
  }
});

// Visas API
app.get('/api/visas', async (req, res) => {
  try {
    const { country } = req.query;
    let query: any = {};
    
    if (country) {
      const search = (country as string).toLowerCase().trim();
      
      // Direct Match
      const directMatch = { country: { $regex: search, $options: 'i' } };
      
      // Alias Logic (MongoDB side)
      if (search.includes('dubai') || search === 'uae') {
        query.$or = [
          directMatch,
          { country: { $regex: 'United Arab Emirates', $options: 'i' } }
        ];
      } else {
        query = directMatch;
      }
    }
    
    const visas = await Visa.find(query);
    res.json(visas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visas', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
