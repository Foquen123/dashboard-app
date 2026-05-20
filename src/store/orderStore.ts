import { create } from 'zustand';
import { orderListExample } from '../exampleData';
import type { IOrder } from '../interfaces/Order.interface';
import { isValid, parseISO } from 'date-fns';

interface OrderStore {
  ordersMap: Record<string, IOrder>;
  limit: number;
  countOfItems: number;
  // eslint-disable-next-line no-unused-vars
  fetchOrders: (currentPage: number, limit?: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  ordersMap: {},
  limit: 10,
  countOfItems: 0,

  fetchOrders: (currentPage: number, limit?: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    const typesFilter = searchParams.getAll('type');
    const statusFilter = searchParams.getAll('status');
    const dateFilter = searchParams
      .getAll('date')
      .map((dateStr) => parseISO(dateStr))
      .filter((date) => isValid(date));
    const filteredOrders = orderListExample
      .filter((i) => {
        if (typesFilter.length === 0) return i;
        if (typesFilter.includes(i.type.name.toLowerCase())) {
          return i;
        }
      })
      .filter((i) => {
        if (statusFilter.length === 0) return i;
        if (statusFilter.includes(i.status.text.toLowerCase())) {
          return i;
        }
      })
      .filter((i) => {
        if (dateFilter.length === 0) return i;
        if (dateFilter.some((date) => date.getDate() === i.date.getDate()))
          return i;
      });

    let messagesFromServer: IOrder[];
    if (limit) {
      messagesFromServer = filteredOrders.filter((item, index) => {
        if (index >= (currentPage - 1) * limit && index < currentPage * limit) {
          return item;
        }
      });
    } else {
      messagesFromServer = filteredOrders;
    }

    set(() => ({
      ordersMap: messagesFromServer.reduce<Record<string, IOrder>>(
        (acc, message) => {
          acc[message.id] = message;
          return acc;
        },
        {},
      ),
      countOfItems: filteredOrders.length,
    }));
  },
}));

export { useOrderStore };
