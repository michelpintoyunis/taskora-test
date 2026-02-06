import { motion } from 'framer-motion'

interface StatsCardProps {
    title: string
    value: string
    change: number
    chartData: number[]
    color: 'blue' | 'red' | 'green'
}

const StatsCard = ({ title, value, change, chartData, color }: StatsCardProps) => {
    const max = Math.max(...chartData)
    const colorClasses = {
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-600',
            bar: 'bg-blue-400',
            change: change > 0 ? 'text-green-600' : 'text-red-600'
        },
        red: {
            bg: 'bg-red-50',
            text: 'text-red-600',
            bar: 'bg-red-400',
            change: change > 0 ? 'text-red-600' : 'text-green-600'
        },
        green: {
            bg: 'bg-green-50',
            text: 'text-green-600',
            bar: 'bg-green-400',
            change: change > 0 ? 'text-green-600' : 'text-red-600'
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${colorClasses[color].bg} rounded-2xl p-6 border border-gray-200`}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <p className="text-gray-600 text-sm mb-1">{title}</p>
                    <p className={`text-3xl font-bold ${colorClasses[color].text}`}>{value}</p>
                </div>
                <span className={`text-sm font-semibold px-2 py-1 rounded ${colorClasses[color].change} ${change > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    {change > 0 ? '+' : ''}{change}%
                </span>
            </div>

            {/* Mini Chart */}
            <div className="flex items-end gap-1 h-12">
                {chartData.map((value, index) => (
                    <motion.div
                        key={index}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / max) * 100}%` }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex-1 ${colorClasses[color].bar} rounded-t opacity-70`}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default StatsCard
