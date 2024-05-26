import { api } from '../helpers/axios';

export function getBorrowItems() {
  return api.get('/borrow-items');
}

export function getBorrowItemById(id) {
  return api.get(`/borrow-items/${id}`);
}
