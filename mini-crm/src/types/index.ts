export type ClientStatus = "active" | "paused" | "archived";

export interface Client {
  id: number;
  name: string;
  email: string;
  status: ClientStatus;
}
