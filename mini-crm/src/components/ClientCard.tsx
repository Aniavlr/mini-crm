import { useParams, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type ClientStatus = "active" | "paused" | "archived";

interface Client {
  id: number;
  name: string;
  email: string;
  status: ClientStatus;
  phone?: string;
  company?: string;
  address?: string;
  registrationDate?: string;
  lastActivity?: string;
  notes?: string;
  totalOrders?: number;
  totalSpent?: string;
}

const ClientCard = () => {
  const { id } = useParams<{ id: string }>();

  // В приложении будет запрос к API
  const clients: Client[] = [
    {
      id: 1,
      name: "Иван Петров",
      email: "ivan.petrov@example.com",
      status: "active",
      phone: "+7 (999) 123-45-67",
      company: "ООО Технологии",
      address: "Москва, ул. Ленина, д. 10",
      registrationDate: "15.03.2023",
      lastActivity: "Сегодня, 14:30",
      notes: "Постоянный клиент",
      totalOrders: 15,
      totalSpent: "75 000 ₽",
    },
    {
      id: 2,
      name: "Мария Соколова",
      email: "maria.sokolova@example.com",
      status: "paused",
      phone: "+7 (999) 234-56-78",
      company: "ИП Соколова",
      address: "СПб, Невский пр., д. 25",
      registrationDate: "20.05.2023",
      lastActivity: "Вчера, 10:15",
      notes: "Клиент на паузе",
      totalOrders: 8,
      totalSpent: "32 000 ₽",
    },
    {
      id: 3,
      name: "Алексей Иванов",
      email: "alexey.ivanov@example.com",
      status: "archived",
      phone: "+7 (999) 345-67-89",
      company: "Фрилансер",
      address: "Казань, ул. Баумана, д. 5",
      registrationDate: "10.01.2023",
      lastActivity: "3 дня назад",
      notes: "Архивный клиент",
      totalOrders: 3,
      totalSpent: "15 000 ₽",
    },
  ];

  const client = clients.find((c) => c.id === Number(id));

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
        label: "In the archive",
        className: "bg-gray-400/10 text-gray-400 ring-1 ring-gray-400/20",
      },
    };

    return configs[status];
  };

  if (!client) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Client not found</p>
        <Link
          to="/clients"
          className="text-blue-600 hover:text-blue-700 mt-4 inline-block"
        >
          Back to clients list
        </Link>
      </div>
    );
  }

  const status = getStatusConfig(client.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/clients"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Back to clients
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600"></div>

        <div className="relative px-6 sm:px-8 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 -mt-16 sm:-mt-20 mb-6">
            <div className="shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-xl ring-1 ring-gray-200/70">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-4xl sm:text-5xl font-bold">
                  {client.name.charAt(0)}
                </div>
              </div>
            </div>

            <div className="pt-2 sm:pt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                {client.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-3 flex-wrap">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${status.className}`}
                >
                  {status.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <dl>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Email
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.email}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Phone
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.phone || "—"}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Company
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.company || "—"}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Address
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.address || "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Activity & Statistics
              </h3>
              <dl>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Registration Date
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.registrationDate || "—"}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Last Activity
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.lastActivity || "—"}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Total Orders
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.totalOrders || "—"}
                  </dd>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <dt className="w-1/3 text-sm font-medium text-gray-500">
                    Total Spent
                  </dt>
                  <dd className="w-2/3 text-sm text-gray-900">
                    {client.totalSpent || "—"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Notes
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {client.notes || "No notes available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
