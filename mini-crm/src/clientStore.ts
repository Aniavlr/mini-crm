import type { Client } from "./types";

let clients: Client[] = [
  {
    id: 1,
    name: "Иван Петров",
    email: "ivan.petrov@example.com",
    status: "active",
  },
  {
    id: 2,
    name: "Мария Соколова",
    email: "maria.sokolova@example.com",
    status: "paused",
  },
  {
    id: 3,
    name: "Алексей Иванов",
    email: "alexey.ivanov@example.com",
    status: "archived",
  },
];

export const getClients = (): Client[] => clients;

export const addClient = (client: Omit<Client, "id">): Client => {
  const newClient = { ...client, id: Date.now() };
  clients = [...clients, newClient];
  return newClient;
};

export const removeClient = (id: number): void => {
  clients = clients.filter((c) => c.id !== id);
};
