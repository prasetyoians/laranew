import AppLayout from '@/layouts/AppLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons'

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">

        {/* TITLE */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Usaha Anda</h1>
          <p className="text-gray-500 text-sm">Welcome back 👋</p>
        </div>

        {/* CARD STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* USERS */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm text-gray-500">Users</p>
              <h2 className="text-xl font-bold text-gray-800">1,245</h2>
            </div>
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <FontAwesomeIcon icon={faUsers} />
            </div>
          </div>

          {/* REVENUE */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <h2 className="text-xl font-bold text-gray-800">$12,400</h2>
            </div>
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
          </div>

          {/* GROWTH */}
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between hover:shadow-md transition">
            <div>
              <p className="text-sm text-gray-500">Growth</p>
              <h2 className="text-xl font-bold text-gray-800">+15%</h2>
            </div>
            <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Overview
          </h2>
          <p className="text-gray-500 text-sm">
            Ini tempat buat isi dashboard kamu nanti (chart, table, dll).
          </p>
        </div>

      </div>
    </AppLayout>
  )
}