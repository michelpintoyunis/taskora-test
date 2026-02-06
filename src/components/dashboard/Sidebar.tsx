interface SidebarProps {
    activeSection: string
    onSectionChange: (section: string) => void
    isOpen: boolean
    onClose: () => void
}

const Sidebar = ({ activeSection, onSectionChange, isOpen, onClose }: SidebarProps) => {
    const sections = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'deals', icon: '💼', label: 'Deals' },
        { id: 'tasks', icon: '✓', label: 'Tasks' },
    ]

    return (
        <>
            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed left-0 top-0 h-screen w-20 
                bg-slate-900/90 backdrop-blur-md border-r border-white/10 
                flex flex-col items-center py-8 gap-6 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                {/* Botón cerrar solo en móvil (opcional, ya que se cierra con el overlay) */}

                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => {
                            onSectionChange(section.id)
                            onClose() // Cerrar al seleccionar en móvil
                        }}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeSection === section.id
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                            : 'bg-white/5 hover:bg-white/10 text-gray-400'
                            }`}
                        title={section.label}
                    >
                        <span className="text-2xl">{section.icon}</span>
                    </button>
                ))}
            </div>
        </>
    )
}

export default Sidebar
