import React from 'react'
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi'
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
]

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text:
      'Transform your living space with our sleek and contemporary furniture pieces, designed to elevate both style and comfort.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text:
      'Discover the art of relaxation with our handcrafted, luxurious sofas that seamlessly blend timeless design with modern sophistication.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text:
      'Create an inviting ambiance in your home with our range of elegant and versatile furniture, meticulously crafted for enduring beauty.',
  },
]

export const products_url = 'http://localhost:5000/api/furniture'

export const single_product_url = `http://localhost:5000/api/furniture/`
