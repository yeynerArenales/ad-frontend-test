import { Game } from '@/types/game';

export const mockGames: Game[] = [
  {
    id: '1',
    name: 'Game 1',
    price: 29.99,
    image: '/game1.jpg',
    description: 'Description 1',
    genre: 'Action',
    isNew: true
  },
  {
    id: '2',
    name: 'Game 2',
    price: 39.99,
    image: '/game2.jpg',
    description: 'Description 2',
    genre: 'Adventure',
    isNew: false
  }
]; 