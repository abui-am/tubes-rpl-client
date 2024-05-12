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

export function getUsers({ search }) {
  return api.get('/users', {
    params: {
      search,
    },
  });
}

export async function deleteUser(id) {
  return api.delete(`/users/${id}`);
}

export async function updateUser(id, { email, password, roleId, name }) {
  return api.put(`/users/${id}`, {
    email,
    password,
    roleId,
    name,
  });
}

export async function getUserById(id) {
  return api.get(`/users/${id}`);
}
