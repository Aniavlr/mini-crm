import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 mr-20 ml-20">
            <Link to="/clients" className="text-xl font-bold text-gray-800">
              Mini CRM
            </Link>

            <ul className="flex space-x-10">
              <li>
                <Link
                  to="/clients"
                  className="text-lg text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  All clients
                </Link>
              </li>
              <li>
                <Link
                  to="/clients/new"
                  className="text-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  + Add client
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
