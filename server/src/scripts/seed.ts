import mongoose from 'mongoose';
import Car from '../models/Car';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/carmitra';

// Sample car reviews data
const carData = [
  {
    carModel: 'Maruti Suzuki Swift',
    rating: 4.5,
    comment: 'Great fuel efficiency and easy to drive in city traffic. Perfect for daily commute.',
    dealershipName: 'Nexa Premium',
    city: 'Mumbai',
    purchaseDate: '04/2023',
    salesExperienceRating: 4,
    pricePaid: 850000,
    ownershipDuration: 12,
    pros: ['Great mileage', 'Easy to park', 'Low maintenance cost'],
    cons: ['Average build quality', 'Limited boot space'],
    fuelEfficiency: 22,
    variant: 'VXI',
    createdAt: new Date()
  },
  {
    carModel: 'Hyundai Creta',
    rating: 4.2,
    comment: 'Excellent SUV with premium features. Comfortable for long drives and city commute alike.',
    dealershipName: 'Lakshmi Hyundai',
    city: 'Bangalore',
    purchaseDate: '06/2022',
    salesExperienceRating: 4.5,
    pricePaid: 1450000,
    ownershipDuration: 18,
    pros: ['Feature loaded', 'Good ground clearance', 'Comfortable seats'],
    cons: ['Average mileage', 'Service costs increase after warranty'],
    fuelEfficiency: 16,
    variant: 'SX Turbo',
    createdAt: new Date()
  },
  {
    carModel: 'Tata Nexon',
    rating: 4.3,
    comment: 'Safe and reliable SUV with excellent build quality. Good value for money.',
    dealershipName: 'Tata Motors Showroom',
    city: 'Delhi',
    purchaseDate: '01/2023',
    salesExperienceRating: 3.8,
    pricePaid: 1250000,
    ownershipDuration: 14,
    pros: ['5-star safety rating', 'Powerful engine', 'Modern design'],
    cons: ['Interior quality could be better', 'Average after-sales service'],
    fuelEfficiency: 18,
    variant: 'XZ+ Diesel',
    createdAt: new Date()
  },
  {
    carModel: 'Mahindra XUV700',
    rating: 4.7,
    comment: 'Outstanding features and performance for the price point. Best in class safety and technology.',
    dealershipName: 'Mahindra Authorized',
    city: 'Pune',
    purchaseDate: '11/2022',
    salesExperienceRating: 4.2,
    pricePaid: 1850000,
    ownershipDuration: 16,
    pros: ['ADAS features', 'Powerful engine', 'Spacious 7-seater'],
    cons: ['Waiting period', 'Some software glitches initially'],
    fuelEfficiency: 14,
    variant: 'AX7 Luxury',
    createdAt: new Date()
  },
  {
    carModel: 'Kia Seltos',
    rating: 4.4,
    comment: 'Premium feel with great driving dynamics. Feature-rich interiors make for a pleasant experience.',
    dealershipName: 'Kia Motors',
    city: 'Chennai',
    purchaseDate: '08/2022',
    salesExperienceRating: 4.3,
    pricePaid: 1550000,
    ownershipDuration: 20,
    pros: ['Premium interiors', 'Multiple drive modes', 'Good highway stability'],
    cons: ['Rear seat space is limited', 'AC could be better'],
    fuelEfficiency: 16.5,
    variant: 'GTX+ DCT',
    createdAt: new Date()
  },
  {
    carModel: 'Maruti Suzuki Baleno',
    rating: 4.1,
    comment: 'Premium hatchback with good features and comfortable ride. The CVT transmission is smooth.',
    dealershipName: 'Nexa Central',
    city: 'Hyderabad',
    purchaseDate: '07/2023',
    salesExperienceRating: 4.2,
    pricePaid: 920000,
    ownershipDuration: 10,
    pros: ['Premium interiors', 'Good mileage', 'Feature-rich infotainment'],
    cons: ['Average ground clearance', 'Could use better suspension'],
    fuelEfficiency: 21,
    variant: 'Alpha CVT',
    createdAt: new Date()
  },
  {
    carModel: 'Toyota Innova Crysta',
    rating: 4.6,
    comment: 'Reliable family vehicle with excellent ride quality. Perfect for long journeys and daily commute with family.',
    dealershipName: 'Nippon Toyota',
    city: 'Kochi',
    purchaseDate: '03/2022',
    salesExperienceRating: 4.5,
    pricePaid: 2250000,
    ownershipDuration: 22,
    pros: ['Solid build quality', 'Comfortable seating for 7', 'Reliable engine'],
    cons: ['High maintenance cost', 'Average fuel efficiency'],
    fuelEfficiency: 13,
    variant: 'VX Diesel',
    createdAt: new Date()
  },
  {
    carModel: 'Honda City',
    rating: 4.4,
    comment: 'Classic sedan with refined driving experience. The engine is responsive and the cabin is well insulated.',
    dealershipName: 'Arya Honda',
    city: 'Ahmedabad',
    purchaseDate: '05/2023',
    salesExperienceRating: 4.0,
    pricePaid: 1320000,
    ownershipDuration: 11,
    pros: ['Refined engine', 'Spacious cabin', 'Good resale value'],
    cons: ['Road noise at high speeds', 'Limited ground clearance for Indian roads'],
    fuelEfficiency: 19,
    variant: 'ZX CVT',
    createdAt: new Date()
  },
  {
    carModel: 'MG Hector',
    rating: 4.2,
    comment: 'Feature-loaded SUV with impressive tech. Voice commands and connected features work well.',
    dealershipName: 'MG Motor Flagship',
    city: 'Kolkata',
    purchaseDate: '12/2022',
    salesExperienceRating: 4.3,
    pricePaid: 1950000,
    ownershipDuration: 15,
    pros: ['Large panoramic sunroof', 'Connected car features', 'Spacious interior'],
    cons: ['Average dynamics', 'Some quality control issues'],
    fuelEfficiency: 15,
    variant: 'Sharp Petrol DCT',
    createdAt: new Date()
  },
  {
    carModel: 'Maruti Suzuki Ertiga',
    rating: 4.3,
    comment: 'Practical family MPV that offers great value. Efficient engine and ergonomic design make it a perfect family car.',
    dealershipName: 'Maruti Suzuki Arena',
    city: 'Jaipur',
    purchaseDate: '09/2022',
    salesExperienceRating: 3.9,
    pricePaid: 1150000,
    ownershipDuration: 19,
    pros: ['7-seater with flexible seating', 'Excellent mileage', 'Low maintenance'],
    cons: ['Basic interior materials', 'Underpowered AC for rear passengers'],
    fuelEfficiency: 20,
    variant: 'ZXI CNG',
    createdAt: new Date()
  },
  {
    carModel: 'Volkswagen Taigun',
    rating: 4.0,
    comment: 'German engineering with solid build quality. Handles well and feels premium compared to most competitors.',
    dealershipName: 'Volkswagen Prime',
    city: 'Gurgaon',
    purchaseDate: '02/2023',
    salesExperienceRating: 4.1,
    pricePaid: 1680000,
    ownershipDuration: 13,
    pros: ['European build quality', 'Fun to drive', 'Good safety features'],
    cons: ['Higher service costs', 'Less features compared to Korean rivals'],
    fuelEfficiency: 16.5,
    variant: 'GT DSG',
    createdAt: new Date()
  },
  {
    carModel: 'Tata Harrier',
    rating: 4.5,
    comment: 'Stunning design with commanding road presence. Comfortable highway cruiser with good stability.',
    dealershipName: 'Tata Motors Premium',
    city: 'Lucknow',
    purchaseDate: '11/2022',
    salesExperienceRating: 4.0,
    pricePaid: 2050000,
    ownershipDuration: 16,
    pros: ['Head-turning design', 'Mature ride quality', 'Spacious cabin'],
    cons: ['No petrol option', 'Average infotainment system'],
    fuelEfficiency: 15.5,
    variant: 'XZA+ Dark Edition',
    createdAt: new Date()
  },
  {
    carModel: 'Hyundai i20',
    rating: 4.2,
    comment: 'Premium hatchback with European-like feel. Well-equipped with good driving dynamics.',
    dealershipName: 'Capital Hyundai',
    city: 'Chennai',
    purchaseDate: '06/2023',
    salesExperienceRating: 4.4,
    pricePaid: 1020000,
    ownershipDuration: 9,
    pros: ['Feature-loaded cabin', 'Strong engine options', 'Premium feel'],
    cons: ['Stiff ride quality', 'Higher price than competitors'],
    fuelEfficiency: 18,
    variant: 'Asta Turbo DCT',
    createdAt: new Date()
  },
  {
    carModel: 'Mahindra Thar',
    rating: 4.6,
    comment: 'Iconic off-roader with improved comfort. Perfect blend of adventure capability and daily usability.',
    dealershipName: 'Mahindra World',
    city: 'Chandigarh',
    purchaseDate: '08/2022',
    salesExperienceRating: 4.3,
    pricePaid: 1750000,
    ownershipDuration: 20,
    pros: ['Unmatched off-road capability', 'Improved comfort over predecessor', 'Strong resale value'],
    cons: ['Limited boot space', 'Noisy cabin at highway speeds'],
    fuelEfficiency: 12,
    variant: 'LX 4x4 Hardtop Diesel',
    createdAt: new Date()
  },
  {
    carModel: 'Kia Carens',
    rating: 4.3,
    comment: 'Practical family MPV with SUV-like presence. Well-packaged with good features and space.',
    dealershipName: 'Kia Supercars',
    city: 'Bhopal',
    purchaseDate: '01/2023',
    salesExperienceRating: 4.0,
    pricePaid: 1480000,
    ownershipDuration: 14,
    pros: ['Flexible 7-seater', 'Feature-rich', 'Good ride comfort'],
    cons: ['Third row best for kids', 'Average fuel economy in city'],
    fuelEfficiency: 15.5,
    variant: 'Luxury Plus DCT',
    createdAt: new Date()
  },
  {
    carModel: 'Maruti Suzuki Brezza',
    rating: 4.1,
    comment: 'Practical sub-compact SUV with reliable performance. Good for city driving with decent ground clearance.',
    dealershipName: 'Arena City Central',
    city: 'Surat',
    purchaseDate: '05/2022',
    salesExperienceRating: 3.8,
    pricePaid: 1120000,
    ownershipDuration: 23,
    pros: ['Peppy engine', 'Good ground clearance', 'Maruti service network'],
    cons: ['Basic interior quality', 'Limited boot space with all seats up'],
    fuelEfficiency: 19.5,
    variant: 'ZXI+ AT',
    createdAt: new Date()
  },
  {
    carModel: 'Jeep Compass',
    rating: 4.4,
    comment: 'Premium SUV with solid off-road credentials. Feels like a mini Grand Cherokee with good road manners.',
    dealershipName: 'Landmark Jeep',
    city: 'Noida',
    purchaseDate: '10/2022',
    salesExperienceRating: 4.2,
    pricePaid: 2350000,
    ownershipDuration: 18,
    pros: ['Premium interior quality', 'Capable off-road', 'Good highway stability'],
    cons: ['Higher service costs', 'Limited rear seat space'],
    fuelEfficiency: 14,
    variant: 'Model S 4x4 Diesel',
    createdAt: new Date()
  },
  {
    carModel: 'Toyota Fortuner',
    rating: 4.7,
    comment: 'Legendary SUV with bulletproof reliability. Commanding presence and comfortable for long journeys.',
    dealershipName: 'Toyota Landmark',
    city: 'Mumbai',
    purchaseDate: '07/2022',
    salesExperienceRating: 4.6,
    pricePaid: 3650000,
    ownershipDuration: 21,
    pros: ['Tank-like build quality', 'Excellent resale value', 'Reliable mechanicals'],
    cons: ['Expensive for the features offered', 'Heavy steering in city'],
    fuelEfficiency: 11.5,
    variant: 'Legender 4x4 AT',
    createdAt: new Date()
  },
  {
    carModel: 'Hyundai Venue',
    rating: 4.0,
    comment: 'Compact SUV with good features for the price. Easy to drive in city conditions with tight turning radius.',
    dealershipName: 'Paramount Hyundai',
    city: 'Nagpur',
    purchaseDate: '04/2022',
    salesExperienceRating: 3.9,
    pricePaid: 1080000,
    ownershipDuration: 24,
    pros: ['Feature-loaded', 'Easy maneuverability', 'Punchy turbo engine'],
    cons: ['Cramped rear seat', 'Firm ride quality'],
    fuelEfficiency: 18.5,
    variant: 'SX(O) Turbo DCT',
    createdAt: new Date()
  },
  {
    carModel: 'Honda Amaze',
    rating: 4.2,
    comment: 'Compact sedan with big car feel. Spacious interior and refined CVT make it a good city car.',
    dealershipName: 'Honda Galleria',
    city: 'Pune',
    purchaseDate: '03/2023',
    salesExperienceRating: 4.1,
    pricePaid: 940000,
    ownershipDuration: 12,
    pros: ['Spacious cabin', 'Refined engine', 'Good build quality'],
    cons: ['Basic infotainment', 'Average ground clearance'],
    fuelEfficiency: 20.5,
    variant: 'VX CVT Petrol',
    createdAt: new Date()
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    // Clear existing data
    await Car.deleteMany({});
    console.log('Cleared existing car reviews');

    // Insert new data
    const result = await Car.insertMany(carData);
    console.log(`Successfully seeded ${result.length} car reviews`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 