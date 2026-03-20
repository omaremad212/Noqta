import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: '2026 Agenda',
    price: 500,
    image: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b',
    images: [
      'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b',
    ],
    category: 'Planners',
    description:
      'Stay organized throughout 2026 with the Noqta Designs Agenda. Thoughtfully designed with a minimalist aesthetic, this planner features monthly and weekly layouts, goal-tracking pages, and premium paper quality for a seamless writing experience.',
    features: [
      'Monthly & weekly planning layouts',
      'Goal-setting and reflection pages',
      'Premium 100gsm paper',
      'Lay-flat binding',
      'Ribbon bookmark',
      'Elastic closure band',
    ],
    inStock: true,
    badge: 'New',
    rating: 4.9,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Ramadan Planner',
    price: 95,
    image: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5',
    images: [
      'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5',
    ],
    category: 'Planners',
    description:
      'Make the most of the holy month with the Noqta Designs Ramadan Planner. This beautifully crafted planner helps you track your prayers, Quran reading, daily reflections, and personal goals throughout Ramadan.',
    features: [
      'Daily prayer tracker',
      'Quran reading log',
      'Gratitude & reflection journal',
      'Iftar & Suhoor meal planner',
      'Personal goals tracker',
      'Premium soft-touch cover',
    ],
    inStock: true,
    badge: 'Bestseller',
    rating: 4.8,
    reviews: 41,
  },
];

export const categories = [
  {
    id: 1,
    name: 'دفاتر',
    count: 8,
    image: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b',
    description: 'دفاتر مميزة لكل الأغراض',
  },
  {
    id: 2,
    name: 'أجندات ومخططات',
    count: 6,
    image: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5',
    description: 'نظّم يومك وحقق أهدافك',
  },
  {
    id: 3,
    name: 'أدوات مكتبية',
    count: 12,
    image: 'https://www.noqtadesigns.com/web/image/product.product/4/image_1024/2026%20Agenda?unique=5da109b',
    description: 'أدوات مكتبية مختارة بعناية',
  },
  {
    id: 4,
    name: 'باقات',
    count: 4,
    image: 'https://www.noqtadesigns.com/web/image/product.product/14/image_1024/Ramadan%20planner?unique=7b2c8d5',
    description: 'وفّر أكثر مع باقاتنا المميزة',
  },
];
