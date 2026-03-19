import { Link } from "react-router-dom";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import type { Client, ClientStatus } from "../types";
import { getClients, removeClient } from "../clientStore";

const getStatusConfig = (status: ClientStatus) => {
  const configs = {
    active: {
      label: "Active",
      className: "bg-green-400/10 text-green-400 ring-1 ring-green-500/20",
    },
    paused: {
      label: "Paused",
      className: "bg-yellow-400/10 text-yellow-500 ring-1 ring-yellow-400/20",
    },
    archived: {
      label: "Archived",
      className: "bg-gray-400/10 text-gray-400 ring-1 ring-gray-400/20",
    },
  };
  return configs[status];
};

const ClientsList = () => {
  const [clients, setClients] = useState<Client[]>(() => getClients());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleDeleteClick = (client: Client) => {
    setSelectedClient(client);
    setIsOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedClient) {
      removeClient(selectedClient.id);
      setClients(getClients());
    }
    setIsOpen(false);
    setSelectedClient(null);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clients
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacts
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {clients.map((client) => {
            const status = getStatusConfig(client.status);
            return (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-medium">
                      {client.name.charAt(0)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {client.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{client.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/clients/${client.id}`}
                      className="inline-flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-150"
                    >
                      More details
                    </Link>
                    <button
                      className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors duration-150"
                      onClick={() => handleDeleteClick(client)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {clients.length === 0 && (
        <div className="text-center py-8 text-gray-500">No clients found</div>
      )}

      <Dialog
        open={isOpen}
        onClose={() => {}}
        className="relative z-10 focus:outline-none"
      >
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md transform rounded-2xl bg-white p-8 shadow-2xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-xl font-bold text-gray-900">
                Deletion confirmation
              </DialogTitle>
              <div className="mt-4">
                <p className="text-base text-gray-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-900">
                    {selectedClient?.name}
                  </span>
                  ?
                </p>
              </div>
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ClientsList;
