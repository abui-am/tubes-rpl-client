import { api } from '../helpers/axios';

export function getItems() {
  return api.get('/items');
}

export function getItemById(id) {
  return api.get(`/items/${id}`);
}

export function createItem({ name, quantity }) {
  return api.post('/items', {
    name,
    quantity,
  });
}

export function updateItem(id, { name, quantity }) {
  return api.put(`/items/${id}`, {
    name,
    quantity,
  });
}
