import api from './api';
import type { User } from '../types';

/** Body for POST /users — fields persisted by the API */
export type CreateUserPayload = Pick<
  User,
  'firstName' | 'lastName' | 'document' | 'phoneNumber' | 'email' | 'city' | 'birthDate'
>;

const trimFields = (p: CreateUserPayload): CreateUserPayload => {
  const base: CreateUserPayload = {
    firstName: p.firstName.trim(),
    lastName: p.lastName.trim(),
    document: p.document.trim(),
    phoneNumber: p.phoneNumber.trim(),
    email: p.email.trim(),
  };
  const city = p.city?.trim();
  if (city) {
    base.city = city;
  }
  if (p.birthDate?.trim()) {
    base.birthDate = p.birthDate.trim();
  }
  return base;
};

export const getUsers = () => api.get<User[]>('/users');

export const createUser = (user: CreateUserPayload) => api.post<User>('/users', trimFields(user));

export const deleteUser = (id: string) => api.delete(`/users/${id}`);
