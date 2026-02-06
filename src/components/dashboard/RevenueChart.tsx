import { motion } from 'framer-motion'

interface RevenueChartProps {
    data: { month: string; amount: number }[]
}

const RevenueChart = ({ data }: RevenueChartProps) => {
    const max = Math.max(...data.map(d => d.amount))

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
        >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Resumen de Ingresos
            </h3>

            <div className="flex items-end justify-between gap-3 h-64">
                {data.map((item, index) => (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(item.amount / max) * 100}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-300 rounded-t-lg relative group cursor-pointer"
                        >
                            {/* Tooltip */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                ${item.amount.toLocaleString()}
                            </div>
                        </motion.div>
                        <span className="text-xs text-gray-500 font-medium">{item.month}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default RevenueChart
