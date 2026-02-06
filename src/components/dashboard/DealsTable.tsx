import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Deal, CreateDealData } from '../../hooks/useDeals'

interface DealsTableProps {
    deals: Deal[]
    onCreateDeal: (data: CreateDealData) => Promise<any>
    onUpdateDeal: (id: string, data: Partial<CreateDealData>) => Promise<any>
    onDeleteDeal: (id: string) => Promise<any>
}

const DealsTable = ({ deals, onCreateDeal, onUpdateDeal, onDeleteDeal }: DealsTableProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingDeal, setEditingDeal] = useState<Deal | null>(null)
    const [formData, setFormData] = useState<CreateDealData>({
        name: '',
        company: '',
        amount: 0,
        deal_date: new Date().toISOString().split('T')[0],
        owner: '',
        stage: 'negotiation'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (editingDeal) {
            await onUpdateDeal(editingDeal.id, formData)
        } else {
            await onCreateDeal(formData)
        }

        handleCloseModal()
    }

    const handleEdit = (deal: Deal) => {
        setEditingDeal(deal)
        setFormData({
            name: deal.name,
            company: deal.company,
            amount: deal.amount,
            deal_date: deal.deal_date,
            owner: deal.owner,
            stage: deal.stage
        })
        setIsModalOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (confirm('¿Estás seguro de eliminar este deal?')) {
            await onDeleteDeal(id)
        }
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setEditingDeal(null)
        setFormData({
            name: '',
            company: '',
            amount: 0,
            deal_date: new Date().toISOString().split('T')[0],
            owner: '',
            stage: 'negotiation'
        })
    }

    const getStageColor = (stage: string) => {
        switch (stage) {
            case 'won': return 'bg-green-100 text-green-700'
            case 'lost': return 'bg-red-100 text-red-700'
            default: return 'bg-blue-100 text-blue-700'
        }
    }

    const getStageText = (stage: string) => {
        switch (stage) {
            case 'won': return 'Ganado'
            case 'lost': return 'Perdido'
            default: return 'Negociación'
        }
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                    Negociaciones Recientes
                </h3>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Nuevo Deal
                </button>
            </div>

            {deals.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                    <p className="text-lg mb-2">No tienes deals aún</p>
                    <p className="text-sm">Crea tu primer deal para comenzar</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Nombre del Trato</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Empresa</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Monto</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Fecha</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Propietario</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Etapa</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deals.map((deal) => (
                                <motion.tr
                                    key={deal.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-gray-100 hover:bg-gray-50"
                                >
                                    <td className="py-4 px-4 text-sm text-gray-900">{deal.name}</td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{deal.company}</td>
                                    <td className="py-4 px-4 text-sm font-semibold text-gray-900">
                                        ${deal.amount.toLocaleString()}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">
                                        {new Date(deal.deal_date).toLocaleDateString('es')}
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-600">{deal.owner}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(deal.stage)}`}>
                                            {getStageText(deal.stage)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(deal)}
                                                className="text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(deal.id)}
                                                className="text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal para crear/editar */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                {editingDeal ? 'Editar Deal' : 'Nuevo Deal'}
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Trato</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                                    <input
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                    <input
                                        type="number"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                        required
                                        min="0"
                                        step="0.01"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                                    <input
                                        type="date"
                                        value={formData.deal_date}
                                        onChange={(e) => setFormData({ ...formData, deal_date: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Propietario</label>
                                    <input
                                        type="text"
                                        value={formData.owner}
                                        onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Etapa</label>
                                    <select
                                        value={formData.stage}
                                        onChange={(e) => setFormData({ ...formData, stage: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="negotiation">Negociación</option>
                                        <option value="won">Ganado</option>
                                        <option value="lost">Perdido</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        {editingDeal ? 'Guardar' : 'Crear'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default DealsTable
