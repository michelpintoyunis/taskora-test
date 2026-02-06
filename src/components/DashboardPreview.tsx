import { useLanguage } from '../context/LanguageContext'

const DashboardPreview = () => {
    const { t } = useLanguage()

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* Dashboard Container */}
            <div className="bg-[#F9F9FA] rounded-2xl overflow-hidden shadow-2xl">
                {/* Dashboard Header */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 flex-1 max-w-md">
                        <svg
                            className="w-5 h-5 text-gray-400 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            type="text"
                            placeholder={t('dashboard.search')}
                            className="bg-transparent outline-none text-gray-700 font-inter-tight text-sm flex-1"
                            readOnly
                        />
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* Notification Bell */}
                        <div className="relative">
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
                        </div>

                        {/* User Avatars */}
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white"></div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white"></div>
                        </div>
                    </div>
                </div>

                {/* Main Dashboard Content */}
                <div className="flex">
                    {/* Sidebar */}
                    <div className="w-16 bg-white border-r border-gray-200 py-6 flex flex-col items-center gap-6">
                        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                            </svg>
                        </div>
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 space-y-6 overflow-auto max-h-[600px]">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Total Sales Card */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm font-inter-tight mb-1">{t('dashboard.totalSales')}</p>
                                        <p className="text-2xl font-bold text-gray-900 font-inter-tight">$45,231</p>
                                    </div>
                                    <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                                        +12%
                                    </span>
                                </div>
                                {/* Mini Bar Chart */}
                                <div className="flex items-end gap-1 h-12">
                                    <div className="flex-1 bg-blue-200 rounded-sm" style={{ height: '60%' }}></div>
                                    <div className="flex-1 bg-blue-300 rounded-sm" style={{ height: '80%' }}></div>
                                    <div className="flex-1 bg-blue-400 rounded-sm" style={{ height: '45%' }}></div>
                                    <div className="flex-1 bg-blue-500 rounded-sm" style={{ height: '100%' }}></div>
                                    <div className="flex-1 bg-blue-400 rounded-sm" style={{ height: '70%' }}></div>
                                    <div className="flex-1 bg-blue-300 rounded-sm" style={{ height: '55%' }}></div>
                                </div>
                            </div>

                            {/* Operating Expenses Card */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm font-inter-tight mb-1">{t('dashboard.expenses')}</p>
                                        <p className="text-2xl font-bold text-gray-900 font-inter-tight">$18,592</p>
                                    </div>
                                    <span className="text-red-600 text-sm font-semibold bg-red-50 px-2 py-1 rounded">
                                        -8%
                                    </span>
                                </div>
                                {/* Mini Bar Chart */}
                                <div className="flex items-end gap-1 h-12">
                                    <div className="flex-1 bg-red-200 rounded-sm" style={{ height: '70%' }}></div>
                                    <div className="flex-1 bg-red-300 rounded-sm" style={{ height: '85%' }}></div>
                                    <div className="flex-1 bg-red-400 rounded-sm" style={{ height: '100%' }}></div>
                                    <div className="flex-1 bg-red-500 rounded-sm" style={{ height: '75%' }}></div>
                                    <div className="flex-1 bg-red-400 rounded-sm" style={{ height: '60%' }}></div>
                                    <div className="flex-1 bg-red-300 rounded-sm" style={{ height: '50%' }}></div>
                                </div>
                            </div>

                            {/* Gross Profit Card */}
                            <div className="bg-white rounded-xl p-5 border border-gray-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm font-inter-tight mb-1">{t('dashboard.profit')}</p>
                                        <p className="text-2xl font-bold text-gray-900 font-inter-tight">$26,639</p>
                                    </div>
                                    <span className="text-green-600 text-sm font-semibold bg-green-50 px-2 py-1 rounded">
                                        +18%
                                    </span>
                                </div>
                                {/* Mini Bar Chart */}
                                <div className="flex items-end gap-1 h-12">
                                    <div className="flex-1 bg-green-200 rounded-sm" style={{ height: '50%' }}></div>
                                    <div className="flex-1 bg-green-300 rounded-sm" style={{ height: '65%' }}></div>
                                    <div className="flex-1 bg-green-400 rounded-sm" style={{ height: '80%' }}></div>
                                    <div className="flex-1 bg-green-500 rounded-sm" style={{ height: '100%' }}></div>
                                    <div className="flex-1 bg-green-500 rounded-sm" style={{ height: '90%' }}></div>
                                    <div className="flex-1 bg-green-400 rounded-sm" style={{ height: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Revenue Chart */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 font-inter-tight mb-4">
                                {t('dashboard.revenue')}
                            </h3>
                            <div className="flex items-end justify-between gap-2 h-48">
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '60%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">Jan</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '75%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">Feb</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '55%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">Mar</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '90%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">Apr</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '100%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">May</span>
                                </div>
                                <div className="flex-1 flex flex-col items-center gap-2">
                                    <div className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg" style={{ height: '85%' }}></div>
                                    <span className="text-xs text-gray-500 font-inter-tight">Jun</span>
                                </div>
                            </div>
                        </div>

                        {/* Deals Table */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900 font-inter-tight mb-4">
                                {t('dashboard.deals')}
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.dealName')}
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.company')}
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.amount')}
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.date')}
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.owner')}
                                            </th>
                                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 font-inter-tight">
                                                {t('dashboard.stage')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-inter-tight">
                                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-900">Enterprise Plan</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white text-xs font-bold">
                                                        A
                                                    </div>
                                                    <span className="text-sm text-gray-900">Amazon.com</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-semibold">$125,000</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">Jan 15, 2024</td>
                                            <td className="py-3 px-4">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400"></div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                    New
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-900">Pro Subscription</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
                                                        M
                                                    </div>
                                                    <span className="text-sm text-gray-900">Microsoft</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-semibold">$85,000</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">Jan 12, 2024</td>
                                            <td className="py-3 px-4">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400"></div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                                    Negotiation
                                                </span>
                                            </td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-3 px-4 text-sm text-gray-900">Starter Package</td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                                                        G
                                                    </div>
                                                    <span className="text-sm text-gray-900">Google</span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-900 font-semibold">$45,000</td>
                                            <td className="py-3 px-4 text-sm text-gray-600">Jan 10, 2024</td>
                                            <td className="py-3 px-4">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400"></div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                                                    Proposal
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPreview
