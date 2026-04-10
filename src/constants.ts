import { Freelancer, Category } from './types';

export const CATEGORIES: Category[] = [
  'Graphic Design',
  'Visual Design',
  'Photography',
  'Videography',
  'Event Management'
];

export const MOCK_FREELANCERS: Freelancer[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    category: 'Graphic Design',
    rating: 4.9,
    reviewCount: 124,
    startingPrice: 500,
    bio: 'Award-winning graphic designer with 8+ years of experience in brand identity and typography. I help businesses stand out through minimalist yet impactful design.',
    photo: 'https://picsum.photos/seed/sarah/400/400',
    portfolio: [
      'https://picsum.photos/seed/p1/600/400',
      'https://picsum.photos/seed/p2/600/400',
      'https://picsum.photos/seed/p3/600/400',
      'https://picsum.photos/seed/p4/600/400'
    ],
    packages: {
      basic: {
        id: 'b1',
        name: 'Logo Design',
        price: 500,
        description: 'Single logo concept with 2 revisions.',
        features: ['1 Logo Concept', 'High Res Files', '2 Revisions', '3 Day Delivery']
      },
      standard: {
        id: 's1',
        name: 'Brand Identity',
        price: 1200,
        description: 'Complete brand identity kit including logo, colors, and fonts.',
        features: ['3 Logo Concepts', 'Brand Guidelines', 'Business Card Design', '5 Revisions']
      },
      premium: {
        id: 'p1',
        name: 'Full Brand Strategy',
        price: 2500,
        description: 'Strategic branding for established businesses looking to rebrand.',
        features: ['Unlimited Revisions', 'Social Media Kit', 'Stationery Design', 'Brand Strategy Session']
      }
    },
    availability: ['2026-04-01', '2026-04-02', '2026-04-05', '2026-04-10'],
    reviews: [
      { id: 'r1', userName: 'TechCorp', rating: 5, comment: 'Sarah delivered exactly what we needed. Her eye for detail is unmatched.', date: '2026-03-15' },
      { id: 'r2', userName: 'GreenSpace', rating: 4, comment: 'Great work, slightly longer delivery than expected but worth it.', date: '2026-03-10' }
    ]
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    category: 'Photography',
    rating: 4.8,
    reviewCount: 89,
    startingPrice: 800,
    bio: 'Professional corporate and event photographer. Specializing in high-end product shoots and executive portraits.',
    photo: 'https://picsum.photos/seed/marcus/400/400',
    portfolio: [
      'https://picsum.photos/seed/p5/600/400',
      'https://picsum.photos/seed/p6/600/400',
      'https://picsum.photos/seed/p7/600/400'
    ],
    packages: {
      basic: {
        id: 'b2',
        name: 'Headshot Session',
        price: 800,
        description: '2-hour session for executive headshots.',
        features: ['2 Hours', '5 Retouched Photos', 'Online Gallery', '1 Location']
      },
      standard: {
        id: 's2',
        name: 'Event Coverage',
        price: 1800,
        description: 'Full day event coverage with highlight reel.',
        features: ['8 Hours', '100+ Edited Photos', 'Next Day Highlights', 'Full Rights']
      },
      premium: {
        id: 'p2',
        name: 'Product Campaign',
        price: 3500,
        description: 'High-end product photography for marketing campaigns.',
        features: ['Studio Session', 'Professional Lighting', 'Advanced Retouching', 'Commercial License']
      }
    },
    availability: ['2026-04-03', '2026-04-04', '2026-04-08'],
    reviews: [
      { id: 'r3', userName: 'GlobalEvents', rating: 5, comment: 'Marcus is our go-to for all corporate events. Professional and reliable.', date: '2026-03-20' }
    ]
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    category: 'Videography',
    rating: 5.0,
    reviewCount: 56,
    startingPrice: 1500,
    bio: 'Cinematic storyteller helping brands connect with their audience through video. Expert in corporate documentaries and social media content.',
    photo: 'https://picsum.photos/seed/elena/400/400',
    portfolio: [
      'https://picsum.photos/seed/p8/600/400',
      'https://picsum.photos/seed/p9/600/400'
    ],
    packages: {
      basic: {
        id: 'b3',
        name: 'Social Media Short',
        price: 1500,
        description: '30-second high-impact video for social media.',
        features: ['30 Seconds', 'Music License', '1 Revision', 'Vertical Format']
      },
      standard: {
        id: 's3',
        name: 'Brand Story',
        price: 3500,
        description: '2-minute cinematic brand story video.',
        features: ['2 Minutes', 'Interview Setup', 'B-Roll', 'Color Grading']
      },
      premium: {
        id: 'p3',
        name: 'Full Campaign',
        price: 7000,
        description: 'Complete video suite for product launch.',
        features: ['Main Ad', '3 Social Cuts', 'Behind the Scenes', 'Voiceover']
      }
    },
    availability: ['2026-04-12', '2026-04-15'],
    reviews: []
  }
];
