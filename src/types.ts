import { Database } from './database.types';

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> =
  Database['public']['Enums'][T];

export type Barber = {
  id: number;
  image: string | null;
  name: string;
  email: string;
  phoneNumber: number;
  work_start_time: string;
  work_end_time: string;
  days_off: string;
};

export type Service = {
  id: number;
  image: string | null;
  name: string;
  price: number;
  service_time: number;
  description: string;
};

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
  description: string;
};

export type News = {
  id: number;
  title: string;
  desc: string;
  timestamp: string;
};

export type Appointments = {
  id: number;
  barber_id: number;
  service_ids: number[];
  profiles_id: number;
  time: string;
}

export type Profile = {
  id: string;
  group: string;
};
