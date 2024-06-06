import { api } from '../helpers/axios';

export function getBorrowItems() {
  return api.get('/borrow-items');
}

export function getBorrowItemById(id) {
  return api.get(`/borrow-items/${id}`);
}

export function createBorrowItem(data) {
  return api.post('/borrow-items', data);
}

export function updateBorrowItem(id, data) {
  return api.put(`/borrow-items/${id}`, data);
}

/**
 *  "userId" : 16,
    "borrowerId" : 7,
    "items": [{
        "itemId" : 3,   
        "quantity" : 5
    }, {

        "itemId" : 2,
        "quantity" : 6
    }]
 */
export function postBorrowItem({ userId, borrowerId, items }) {
  return api.post('/borrow-items', {
    userId,
    borrowerId,
    items,
  });
}
