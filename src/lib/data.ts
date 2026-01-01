export interface Listing {
  id: number;
  title: string;
  rent: number; // Changed to number for easier math/filtering
  location: string;
  floor?: string;
  type: string;
  beds: number;
  baths: number;
  facilities: string[];
  image: string;
  images?: string[]; // For detail view gallery
  description?: string;
  contactNumber?: string;
  availableFrom?: string;
  restrictions?: string[]; // e.g. "Muslim Only", "Non-Smoker", "Vegetarian"
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Single Room for Bachelor",
    rent: 6000,
    location: "Mohammadpur, Road 3",
    floor: "4th",
    type: "Bachelor Male",
    beds: 1,
    baths: 1,
    facilities: ["Wifi", "Gas", "Lift"],
    image: "https://i.ibb.co/5GzXhqB/room1.jpg",
    images: ["https://i.ibb.co/5GzXhqB/room1.jpg", "https://i.ibb.co/5GzXhqB/room1.jpg", "https://i.ibb.co/5GzXhqB/room1.jpg"],
    description: "A nice single room available for a bachelor. Full tiles, clean bathroom, and south-facing window. The flat is on the 4th floor with lift facility.",
    contactNumber: "+8801700000000",
    availableFrom: "Jan 1, 2025",
    restrictions: ["Muslim Only", "Non-Smoker"]
  },
  {
    id: 2,
    title: "Sublet for Small Family",
    rent: 12000,
    location: "Dhanmondi, Road 12A",
    floor: "1st",
    type: "Small Family",
    beds: 2,
    baths: 2,
    facilities: ["Wifi", "Gas", "Generator"],
    image: "https://i.ibb.co/5GzXhqB/room1.jpg",
    images: ["https://i.ibb.co/5GzXhqB/room1.jpg", "https://i.ibb.co/5GzXhqB/room1.jpg"],
    description: "Two rooms sublet available for a small family in Dhanmondi. High security building, near attractive locations.",
    contactNumber: "+8801700000000",
    availableFrom: "Ready",
    restrictions: ["Family Only", "No Pets"]
  },
  {
    id: 3,
    title: "Seat in Shared Room",
    rent: 3500,
    location: "Mirpur 10",
    floor: "2nd",
    type: "Student Female",
    beds: 1,
    baths: 1,
    facilities: ["Wifi", "Security"],
    image: "https://i.ibb.co/5GzXhqB/room1.jpg",
    description: "One seat available in a shared room for a female student. Study environment, strictly for students.",
    contactNumber: "+8801700000000",
    availableFrom: "Feb 1, 2025",
    restrictions: ["Female Student Only", "Job Holders Not Allowed"]
  },
  {
    id: 4,
    title: "Master Bed for Couple",
    rent: 15000,
    location: "Uttara, Sector 4",
    floor: "6th",
    type: "Small Family",
    beds: 1,
    baths: 1, // Attached
    facilities: ["Wifi", "Gas", "Lift", "Generator", "Balcony"],
    image: "https://i.ibb.co/5GzXhqB/room1.jpg",
    description: "Huge master bedroom with attached bath and balcony. Perfect for a couple. 6th floor with nice view.",
    contactNumber: "+8801700000000",
    availableFrom: "Jan 1, 2025"
  },
  {
    id: 5,
    title: "Single Seat",
    rent: 3000,
    location: "Farmgate, Indira Road",
    floor: "3rd",
    type: "Bachelor Male",
    beds: 1,
    baths: 1, // Shared
    facilities: ["Wifi", "Maid Service"],
    image: "https://i.ibb.co/5GzXhqB/room1.jpg",
    description: "Budget friendly seat at Farmgate. Very close to Tejgaon college and University.",
    contactNumber: "+8801700000000",
    availableFrom: "Immediate"
  },
];
