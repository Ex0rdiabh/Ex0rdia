export type Category = 'Graphic Design' | 'Visual Design' | 'Photography' | 'Videography' | 'Event Management';

export interface Package {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Freelancer {
  id: string;
  name: string;
  category: Category;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  bio: string;
  photo: string;
  portfolio: string[];
  packages: {
    basic: Package;
    standard: Package;
    premium: Package;
  };
  availability: string[]; // ISO dates
  reviews: Review[];
}

export interface Booking {
  id: string;
  freelancerId: string;
  businessId: string;
  packageId: string;
  packageName: string;
  date: string;
  time: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  price: number;
  brief: string;
}
