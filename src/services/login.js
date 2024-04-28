import { api } from '../helpers/axios';

export function login(email, password) {
  return api.post('/login', {
    email,
    password,
  });
}

export function registerUser({ email, password, roleId, name }) {
  return api.post('/signup', {
    email,
    password,
    roleId,
    name,
  });
}

export function getUsers() {
  return api.get('/users');
}
