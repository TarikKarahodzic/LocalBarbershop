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
};

export type Service = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type News = {
  id: number,
  title: string,
  desc: string,
  timestamp: string,
}

// export const OrderStatusList: OrderStatus[] = [
//   'New',
//   'Cooking',
//   'Delivering',
//   'Delivered',
// ];

// export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';

// export type Order = {
//   id: number;
//   created_at: string;
//   total: number;
//   user_id: string;
//   status: OrderStatus;

//   order_items?: OrderItem[];
// };

// export type OrderItem = {
//   id: number;
//   product_id: number;
//   products: Product;
//   order_id: number;
//   size: PizzaSize;
//   quantity: number;
// };

export type Profile = {
  id: string;
  group: string;
};
