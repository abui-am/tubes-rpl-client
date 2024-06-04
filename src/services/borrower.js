import { api } from '../helpers/axios';

export const getBorrower = () => {
  return api.get('/borrowers');
};

export const getBorrowerById = (id) => {
  return api.get(`/borrowers/${id}`);
};
export const createBorrower = ({ name, status, registrationNumber }) => {
  return api.post('/borrowers', {
    name,
    status,
    registrationNumber,
  });
};
