import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useDeals } from '../hooks/useDeals'
import { useStats } from '../hooks/useStats'
import Sidebar from '../components/dashboard/Sidebar'
import StatsCard from '../components/dashboard/StatsCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import DealsTable from '../components/dashboard/DealsTable'

const Dashboard = () => {
    const { user } = useAuth()
    const { deals, createDeal, updateDeal, deleteDeal, loading } = useDeals()
    const stats = useStats()
    const [activeSection, setActiveSection] = useState('home')
    const [searchQuery, setSearchQuery] = useState('')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    // Datos para el gráfico de ingresos
    const revenueData = [
        { month: 'Jan', amount: 15000 },
        { month: 'Feb', amount: 18500 },
        { month: 'Mar', amount: 22000 },
        { month: 'Apr', amount: 19500 },
        { month: 'May', amount: 25000 },
        { month: 'Jun', amount: 28000 },
    ]

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 w-full max-w-[100vw] md:ml-20 transition-[margin] duration-300 overflow-x-hidden flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                    <div className="px-6 md:px-8 py-4 flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        {/* Search */}
                        <div className="flex-1 max-w-md mx-2">
                            <div className="relative">
                                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm md:text-base"
                                />
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            {/* Notifications */}
                            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center font-bold text-white text-sm md:text-base">
                                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden md:block w-10 h-10 bg-gradient-to-br from-blue-400 to-green-400 rounded-full"></div>
                                <div className="hidden md:block w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1 p-6 md:p-8 w-full max-w-7xl mx-auto">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatsCard
                            title="Ventas Totales"
                            value={`$${stats.totalSales.toLocaleString()}`}
                            change={stats.salesChange}
                            chartData={stats.salesData}
                            color="blue"
                        />
                        <StatsCard
                            title="Gastos Operativos"
                            value={`$${stats.operatingExpenses.toLocaleString()}`}
                            change={stats.expensesChange}
                            chartData={stats.expensesData}
                            color="red"
                        />
                        <StatsCard
                            title="Beneficio Bruto"
                            value={`$${stats.grossProfit.toLocaleString()}`}
                            change={stats.profitChange}
                            chartData={stats.profitData}
                            color="green"
                        />
                    </div>

                    {/* Revenue Chart */}
                    <div className="mb-8">
                        <RevenueChart data={revenueData} />
                    </div>

                    {/* Deals Table */}
                    <DealsTable
                        deals={deals}
                        onCreateDeal={createDeal}
                        onUpdateDeal={updateDeal}
                        onDeleteDeal={deleteDeal}
                    />
                </main>
            </div>
        </div>
    )
}

export default Dashboard
