/**
 * Dummy catalog for the demo. Everything lives in memory: no API, no image
 * hosts, so the app looks identical offline and on stage.
 *
 * All money is in whole cents to keep arithmetic exact.
 */

export type PriceLevel = 1 | 2 | 3

export type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  emoji: string
  /** Surfaces a "Popular" badge and floats the item into the Popular rail. */
  popular?: boolean
  vegetarian?: boolean
  spicy?: boolean
}

export type MenuSection = {
  id: string
  name: string
  items: MenuItem[]
}

export type Restaurant = {
  id: string
  name: string
  cuisine: string
  blurb: string
  rating: number
  reviewCount: number
  /** Inclusive delivery estimate in minutes, as [fastest, slowest]. */
  eta: [number, number]
  deliveryFee: number
  priceLevel: PriceLevel
  emoji: string
  /** Two hex stops used for the placeholder tile gradient. */
  gradient: [string, string]
  promo?: string
  menu: MenuSection[]
}

export const restaurants: Restaurant[] = [
  {
    id: 'sunrise-tacos',
    name: 'Sunrise Taqueria',
    cuisine: 'Mexican',
    blurb: 'Street tacos, blistered salsas, and horchata on tap.',
    rating: 4.8,
    reviewCount: 1240,
    eta: [18, 28],
    deliveryFee: 0,
    priceLevel: 1,
    emoji: '🌮',
    gradient: ['#ff9d4d', '#f4603e'],
    promo: 'Free delivery over $15',
    menu: [
      {
        id: 'tacos',
        name: 'Tacos',
        items: [
          {
            id: 'al-pastor',
            name: 'Al pastor taco',
            description: 'Pork shoulder, charred pineapple, onion, cilantro.',
            price: 425,
            emoji: '🌮',
            popular: true,
          },
          {
            id: 'carne-asada',
            name: 'Carne asada taco',
            description: 'Grilled skirt steak, salsa verde, lime.',
            price: 475,
            emoji: '🥩',
            popular: true,
          },
          {
            id: 'hongos',
            name: 'Mushroom taco',
            description: 'Roasted maitake, avocado crema, pickled onion.',
            price: 425,
            emoji: '🍄',
            vegetarian: true,
          },
          {
            id: 'camaron',
            name: 'Chipotle shrimp taco',
            description: 'Grilled shrimp, chipotle aioli, cabbage slaw.',
            price: 550,
            emoji: '🍤',
            spicy: true,
          },
        ],
      },
      {
        id: 'sides',
        name: 'Sides & drinks',
        items: [
          {
            id: 'chips-guac',
            name: 'Chips & guacamole',
            description: 'Warm tortilla chips, guacamole made to order.',
            price: 725,
            emoji: '🥑',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'elote',
            name: 'Street corn',
            description: 'Grilled corn, cotija, chili lime butter.',
            price: 500,
            emoji: '🌽',
            vegetarian: true,
          },
          {
            id: 'horchata',
            name: 'Horchata',
            description: 'Rice milk, cinnamon, vanilla. Served over ice.',
            price: 375,
            emoji: '🥛',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'nori-nine',
    name: 'Nori Nine',
    cuisine: 'Sushi',
    blurb: 'Hand rolls cut to order by a very serious sushi team.',
    rating: 4.9,
    reviewCount: 860,
    eta: [25, 40],
    deliveryFee: 399,
    priceLevel: 3,
    emoji: '🍣',
    gradient: ['#5eead4', '#0e7490'],
    menu: [
      {
        id: 'rolls',
        name: 'Hand rolls',
        items: [
          {
            id: 'spicy-tuna',
            name: 'Spicy tuna roll',
            description: 'Bluefin tuna, chili oil, crisp nori.',
            price: 890,
            emoji: '🍣',
            popular: true,
            spicy: true,
          },
          {
            id: 'salmon-avo',
            name: 'Salmon avocado roll',
            description: 'Ora king salmon, avocado, sesame.',
            price: 850,
            emoji: '🍥',
            popular: true,
          },
          {
            id: 'cucumber',
            name: 'Cucumber roll',
            description: 'Persian cucumber, shiso, toasted sesame.',
            price: 620,
            emoji: '🥒',
            vegetarian: true,
          },
        ],
      },
      {
        id: 'plates',
        name: 'Plates',
        items: [
          {
            id: 'chirashi',
            name: 'Chirashi bowl',
            description: 'Nine cuts of fish over seasoned sushi rice.',
            price: 2400,
            emoji: '🍱',
            popular: true,
          },
          {
            id: 'miso',
            name: 'Miso soup',
            description: 'White miso, silken tofu, scallion.',
            price: 480,
            emoji: '🍲',
            vegetarian: true,
          },
          {
            id: 'edamame',
            name: 'Salted edamame',
            description: 'Steamed soybeans, flaked sea salt.',
            price: 520,
            emoji: '🫛',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'basil-and-co',
    name: 'Basil & Co.',
    cuisine: 'Italian',
    blurb: 'Wood-fired pizza with a 48-hour cold ferment dough.',
    rating: 4.7,
    reviewCount: 2130,
    eta: [30, 45],
    deliveryFee: 249,
    priceLevel: 2,
    emoji: '🍕',
    gradient: ['#fca5a5', '#b91c1c'],
    promo: '2 for 1 on slices before 5pm',
    menu: [
      {
        id: 'pizza',
        name: 'Pizza',
        items: [
          {
            id: 'margherita',
            name: 'Margherita',
            description: 'San Marzano, fior di latte, basil.',
            price: 1650,
            emoji: '🍕',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'diavola',
            name: 'Diavola',
            description: 'Spicy salami, chili honey, oregano.',
            price: 1900,
            emoji: '🌶️',
            spicy: true,
            popular: true,
          },
          {
            id: 'funghi',
            name: 'Funghi bianca',
            description: 'Cream base, wild mushrooms, thyme, taleggio.',
            price: 1950,
            emoji: '🍄',
            vegetarian: true,
          },
        ],
      },
      {
        id: 'pasta',
        name: 'Pasta & salad',
        items: [
          {
            id: 'cacio',
            name: 'Cacio e pepe',
            description: 'Tonnarelli, pecorino romano, cracked pepper.',
            price: 1750,
            emoji: '🍝',
            vegetarian: true,
          },
          {
            id: 'caesar',
            name: 'Little gem caesar',
            description: 'Gem lettuce, focaccia crumbs, anchovy dressing.',
            price: 1200,
            emoji: '🥗',
          },
          {
            id: 'tiramisu',
            name: 'Tiramisu',
            description: 'Espresso-soaked savoiardi, mascarpone cream.',
            price: 950,
            emoji: '🍰',
            vegetarian: true,
            popular: true,
          },
        ],
      },
    ],
  },
  {
    id: 'green-room',
    name: 'The Green Room',
    cuisine: 'Salads',
    blurb: 'Market bowls and cold-pressed juice, packed to travel well.',
    rating: 4.5,
    reviewCount: 640,
    eta: [15, 25],
    deliveryFee: 0,
    priceLevel: 2,
    emoji: '🥗',
    gradient: ['#86efac', '#15803d'],
    promo: 'Free delivery',
    menu: [
      {
        id: 'bowls',
        name: 'Bowls',
        items: [
          {
            id: 'harvest',
            name: 'Harvest bowl',
            description: 'Wild rice, roast squash, kale, apple, pepitas.',
            price: 1450,
            emoji: '🥗',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'chicken-pesto',
            name: 'Chicken pesto bowl',
            description: 'Herb chicken, farro, basil pesto, tomato.',
            price: 1550,
            emoji: '🍗',
            popular: true,
          },
          {
            id: 'crunch',
            name: 'Sesame crunch salad',
            description: 'Napa cabbage, edamame, almond, ginger sesame.',
            price: 1350,
            emoji: '🥬',
            vegetarian: true,
          },
        ],
      },
      {
        id: 'juice',
        name: 'Cold pressed',
        items: [
          {
            id: 'green-juice',
            name: 'Green 01',
            description: 'Celery, cucumber, green apple, lemon, ginger.',
            price: 800,
            emoji: '🥤',
            vegetarian: true,
          },
          {
            id: 'citrus',
            name: 'Citrus reset',
            description: 'Orange, grapefruit, turmeric, black pepper.',
            price: 800,
            emoji: '🍊',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'smoke-stack',
    name: 'Smoke Stack BBQ',
    cuisine: 'Barbecue',
    blurb: 'Fourteen hours over post oak. Sold until it runs out.',
    rating: 4.6,
    reviewCount: 1580,
    eta: [35, 50],
    deliveryFee: 499,
    priceLevel: 2,
    emoji: '🍖',
    gradient: ['#fdba74', '#7c2d12'],
    menu: [
      {
        id: 'meats',
        name: 'By the plate',
        items: [
          {
            id: 'brisket',
            name: 'Chopped brisket plate',
            description: 'Post oak brisket, pickles, onion, white bread.',
            price: 2100,
            emoji: '🥩',
            popular: true,
          },
          {
            id: 'ribs',
            name: 'Half rack of ribs',
            description: 'Pork spare ribs, dry rub, vinegar mop.',
            price: 2400,
            emoji: '🍖',
            popular: true,
          },
          {
            id: 'sausage',
            name: 'Jalapeño sausage link',
            description: 'Coarse ground pork, jalapeño, sharp cheddar.',
            price: 1100,
            emoji: '🌭',
            spicy: true,
          },
        ],
      },
      {
        id: 'fixins',
        name: 'Fixins',
        items: [
          {
            id: 'mac',
            name: 'Smoked mac & cheese',
            description: 'Three cheeses, cracker crumb top.',
            price: 750,
            emoji: '🧀',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'slaw',
            name: 'Vinegar slaw',
            description: 'Green cabbage, carrot, celery seed.',
            price: 550,
            emoji: '🥗',
            vegetarian: true,
          },
          {
            id: 'cornbread',
            name: 'Skillet cornbread',
            description: 'Honey butter, flaked salt.',
            price: 600,
            emoji: '🍞',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'pho-hanoi',
    name: 'Phở Hanoi',
    cuisine: 'Vietnamese',
    blurb: 'Broth simmered overnight, herbs picked the same morning.',
    rating: 4.8,
    reviewCount: 970,
    eta: [22, 35],
    deliveryFee: 199,
    priceLevel: 1,
    emoji: '🍜',
    gradient: ['#fcd34d', '#b45309'],
    menu: [
      {
        id: 'pho',
        name: 'Phở',
        items: [
          {
            id: 'pho-bo',
            name: 'Phở bò',
            description: 'Beef broth, rare steak, brisket, rice noodles.',
            price: 1650,
            emoji: '🍜',
            popular: true,
          },
          {
            id: 'pho-ga',
            name: 'Phở gà',
            description: 'Chicken broth, poached chicken, scallion oil.',
            price: 1550,
            emoji: '🍲',
            popular: true,
          },
          {
            id: 'pho-chay',
            name: 'Phở chay',
            description: 'Mushroom broth, tofu, bok choy, herbs.',
            price: 1450,
            emoji: '🍥',
            vegetarian: true,
          },
        ],
      },
      {
        id: 'small',
        name: 'Small plates',
        items: [
          {
            id: 'spring-rolls',
            name: 'Fresh spring rolls',
            description: 'Shrimp, mint, vermicelli, peanut sauce.',
            price: 850,
            emoji: '🥢',
            popular: true,
          },
          {
            id: 'banh-mi',
            name: 'Bánh mì thịt',
            description: 'Pork terrine, pâté, pickled daikon, chili.',
            price: 1200,
            emoji: '🥖',
            spicy: true,
          },
          {
            id: 'ca-phe',
            name: 'Cà phê sữa đá',
            description: 'Iced coffee, sweetened condensed milk.',
            price: 550,
            emoji: '☕',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'stack-house',
    name: 'Stack House',
    cuisine: 'Burgers',
    blurb: 'Smashed patties, potato buns, very good crinkle fries.',
    rating: 4.4,
    reviewCount: 3120,
    eta: [20, 30],
    deliveryFee: 299,
    priceLevel: 1,
    emoji: '🍔',
    gradient: ['#fbbf24', '#c2410c'],
    promo: 'Free fries with any burger',
    menu: [
      {
        id: 'burgers',
        name: 'Burgers',
        items: [
          {
            id: 'classic',
            name: 'Classic smash',
            description: 'Two patties, American cheese, pickles, house sauce.',
            price: 1150,
            emoji: '🍔',
            popular: true,
          },
          {
            id: 'bacon-jam',
            name: 'Bacon jam burger',
            description: 'Bacon jam, aged cheddar, crispy shallot.',
            price: 1450,
            emoji: '🥓',
            popular: true,
          },
          {
            id: 'veggie',
            name: 'Mushroom melt',
            description: 'Pressed mushroom patty, swiss, garlic aioli.',
            price: 1250,
            emoji: '🍄',
            vegetarian: true,
          },
        ],
      },
      {
        id: 'fries',
        name: 'Fries & shakes',
        items: [
          {
            id: 'crinkle',
            name: 'Crinkle fries',
            description: 'Salted, with a side of house sauce.',
            price: 500,
            emoji: '🍟',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'chili-fries',
            name: 'Chili cheese fries',
            description: 'Beef chili, cheese sauce, pickled jalapeño.',
            price: 850,
            emoji: '🌶️',
            spicy: true,
          },
          {
            id: 'shake',
            name: 'Vanilla malt shake',
            description: 'Frozen custard, malt powder, whole milk.',
            price: 750,
            emoji: '🥤',
            vegetarian: true,
          },
        ],
      },
    ],
  },
  {
    id: 'saffron-lane',
    name: 'Saffron Lane',
    cuisine: 'Indian',
    blurb: 'Clay oven breads and curries built on whole spices.',
    rating: 4.7,
    reviewCount: 1420,
    eta: [28, 42],
    deliveryFee: 249,
    priceLevel: 2,
    emoji: '🍛',
    gradient: ['#fdba74', '#9a3412'],
    menu: [
      {
        id: 'curries',
        name: 'Curries',
        items: [
          {
            id: 'butter-chicken',
            name: 'Butter chicken',
            description: 'Tandoori chicken, tomato, fenugreek, cream.',
            price: 1850,
            emoji: '🍛',
            popular: true,
          },
          {
            id: 'chana',
            name: 'Chana masala',
            description: 'Chickpeas, onion tomato masala, amchur.',
            price: 1450,
            emoji: '🫘',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'vindaloo',
            name: 'Lamb vindaloo',
            description: 'Goan chili vinegar braise. Properly hot.',
            price: 2050,
            emoji: '🌶️',
            spicy: true,
          },
        ],
      },
      {
        id: 'breads',
        name: 'Breads & sides',
        items: [
          {
            id: 'garlic-naan',
            name: 'Garlic naan',
            description: 'Clay oven naan, garlic butter, cilantro.',
            price: 450,
            emoji: '🫓',
            vegetarian: true,
            popular: true,
          },
          {
            id: 'samosa',
            name: 'Potato samosa',
            description: 'Two pieces, tamarind and mint chutney.',
            price: 650,
            emoji: '🥟',
            vegetarian: true,
          },
          {
            id: 'lassi',
            name: 'Mango lassi',
            description: 'Alphonso mango, yogurt, cardamom.',
            price: 600,
            emoji: '🥛',
            vegetarian: true,
          },
        ],
      },
    ],
  },
]

export const cuisines: string[] = [...new Set(restaurants.map((r) => r.cuisine))].sort()

export function getRestaurant(id: string | undefined): Restaurant | undefined {
  return restaurants.find((r) => r.id === id)
}

/** Flat item lookup, used to rebuild a cart line when reordering. */
export function findMenuItem(
  restaurantId: string,
  itemId: string,
): MenuItem | undefined {
  return getRestaurant(restaurantId)
    ?.menu.flatMap((section) => section.items)
    .find((item) => item.id === itemId)
}
