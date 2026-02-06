import { useState, useEffect } from 'react'
import { useDeals } from './useDeals'

interface Stats {
    totalSales: number
    salesChange: number
    operatingExpenses: number
    expensesChange: number
    grossProfit: number
    profitChange: number
    salesData: number[]
    expensesData: number[]
    profitData: number[]
}

export const useStats = () => {
    const { deals } = useDeals()
    const [stats, setStats] = useState<Stats>({
        totalSales: 0,
        salesChange: 0,
        operatingExpenses: 0,
        expensesChange: 0,
        grossProfit: 0,
        profitChange: 0,
        salesData: [0, 0, 0, 0, 0, 0],
        expensesData: [0, 0, 0, 0, 0, 0],
        profitData: [0, 0, 0, 0, 0, 0]
    })

    useEffect(() => {
        if (deals.length === 0) return

        // Calcular ventas totales (solo deals ganados)
        const totalSales = deals
            .filter(d => d.stage === 'won')
            .reduce((sum, d) => sum + Number(d.amount), 0)

        // Gastos operativos (simulado como 40% de las ventas)
        const operatingExpenses = totalSales * 0.4

        // Beneficio bruto
        const grossProfit = totalSales - operatingExpenses

        // Datos para mini gráficos (últimos 6 meses)
        const salesData = [120, 150, 180, 160, 200, 220]
        const expensesData = [80, 95, 110, 100, 125, 135]
        const profitData = salesData.map((s, i) => s - expensesData[i])

        setStats({
            totalSales,
            salesChange: 12, // Porcentaje de cambio
            operatingExpenses,
            expensesChange: -8,
            grossProfit,
            profitChange: 18,
            salesData,
            expensesData,
            profitData
        })
    }, [deals])

    return stats
}
