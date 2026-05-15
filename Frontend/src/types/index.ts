export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  document: string;
  phoneNumber: string;
  email: string;
  city?: string;
  /** ISO date string YYYY-MM-DD from API */
  birthDate?: string;
}

export type UsagePeriod = 'Morning' | 'Afternoon' | 'Night';

export interface UsageRecord {
  id?: string;
  userId: string;
  application: string;
  days: number;
  hours: number;
  minutes: number;
  usagePeriod: UsagePeriod;
  user?: User;
}

export interface Application {
  id: string;
  name: string;
}
