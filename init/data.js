const sampleListings = [
  {
    title: "Luxury Houseboat on Dal Lake",
    description: "Experience the beauty of Kashmir with a peaceful stay on a traditional houseboat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945"
    },
    price: 4500,
    location: "Srinagar",
    country: "India",
  },
  {
    title: "Beach Villa in Goa",
    description: "Relax by the beach with modern amenities and stunning sunset views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 3500,
    location: "North Goa",
    country: "India",
  },
  {
    title: "Royal Heritage Haveli",
    description: "Stay in a restored haveli and experience Rajasthan's royal culture.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    },
    price: 5000,
    location: "Jaipur",
    country: "India",
  },
  {
    title: "Tea Estate Cottage",
    description: "Wake up to breathtaking tea gardens and cool mountain air.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 2800,
    location: "Munnar",
    country: "India",
  },
  {
    title: "Lake View Cottage",
    description: "Enjoy peaceful evenings overlooking Naini Lake.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 2500,
    location: "Nainital",
    country: "India",
  },
  {
    title: "Snow View Cabin",
    description: "A cozy wooden cabin surrounded by Himalayan mountains.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 3000,
    location: "Manali",
    country: "India",
  },
  {
    title: "Riverfront Resort",
    description: "A luxury stay beside the Ganges with beautiful sunrise views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 4200,
    location: "Rishikesh",
    country: "India",
  },
  {
    title: "Backwater Villa",
    description: "Private villa with direct access to Kerala's famous backwaters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 4800,
    location: "Alleppey",
    country: "India",
  },
  {
    title: "Hill View Homestay",
    description: "A peaceful family homestay surrounded by pine forests.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 2200,
    location: "Mussoorie",
    country: "India",
  },
  {
    title: "Coffee Plantation Villa",
    description: "Stay amidst lush coffee plantations with premium facilities.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 3400,
    location: "Coorg",
    country: "India",
  },
  {
    title: "Luxury Apartment",
    description: "Modern apartment in the heart of India's financial capital.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    price: 5200,
    location: "Mumbai",
    country: "India",
  },
  {
    title: "Skyline Penthouse",
    description: "Premium penthouse overlooking the city skyline.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    price: 6000,
    location: "Bengaluru",
    country: "India",
  },
  {
    title: "City Studio Apartment",
    description: "Comfortable stay for business and leisure travelers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    price: 2600,
    location: "Hyderabad",
    country: "India",
  },
  {
    title: "Temple View Stay",
    description: "Peaceful accommodation close to the famous temples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    price: 2300,
    location: "Varanasi",
    country: "India",
  },
  {
    title: "Beach Resort",
    description: "Luxury beachfront resort with private access to the sea.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 5500,
    location: "Puducherry",
    country: "India",
  },
  {
    title: "Mountain Retreat",
    description: "A perfect weekend escape surrounded by nature.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 2700,
    location: "Shimla",
    country: "India",
  },
  {
    title: "Royal Palace Stay",
    description: "Experience luxury in a heritage palace hotel.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    },
    price: 7000,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Forest Eco Lodge",
    description: "Eco-friendly stay near the famous national park.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 3800,
    location: "Jim Corbett",
    country: "India",
  },
  {
    title: "Desert Camp",
    description: "Enjoy camel safaris and cultural nights under the stars.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    price: 3200,
    location: "Jaisalmer",
    country: "India",
  },
  {
    title: "Ocean View Villa",
    description: "Beautiful villa with stunning views of the Bay of Bengal.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 4700,
    location: "Visakhapatnam",
    country: "India",
  },
  {
    title: "Luxury Farmhouse",
    description: "Spacious farmhouse ideal for family vacations.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 3500,
    location: "Lonavala",
    country: "India",
  },
  {
    title: "Beach Cottage",
    description: "Quiet cottage near pristine beaches.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 3100,
    location: "Gokarna",
    country: "India",
  },
  {
    title: "Island Resort",
    description: "Premium island resort with crystal-clear waters.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 8500,
    location: "Andaman & Nicobar",
    country: "India",
  },
  {
    title: "Himalayan Homestay",
    description: "Traditional homestay with breathtaking mountain views.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
    },
    price: 2400,
    location: "Dharamshala",
    country: "India",
  },
  {
    title: "Valley View Resort",
    description: "Relax in a premium resort surrounded by lush valleys.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 4300,
    location: "Ooty",
    country: "India",
  },
  {
    title: "Lakeside Villa",
    description: "Luxury villa with private lake access.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 3900,
    location: "Udaipur",
    country: "India",
  },
  {
    title: "Luxury Apartment",
    description: "Modern apartment close to IT hubs and shopping malls.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1494526585095-c41746248156"
    },
    price: 2900,
    location: "Pune",
    country: "India",
  },
  {
    title: "Beachfront Villa",
    description: "Private villa just steps away from the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
    },
    price: 5600,
    location: "Kovalam",
    country: "India",
  },
  {
    title: "Heritage Homestay",
    description: "Experience authentic Indian hospitality in a heritage home.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
    },
    price: 2600,
    location: "Mysuru",
    country: "India",
  },
  {
    title: "Luxury Desert Resort",
    description: "A premium resort offering traditional Rajasthani hospitality.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
    },
    price: 4800,
    location: "Bikaner",
    country: "India",
  }
];

const randomListingType = () => (Math.random() < 0.5 ? "rent" : "sell");

module.exports.data = sampleListings.map((listing) => ({
  ...listing,
  listingType: randomListingType(),
  currentBid: listing.price,
}));