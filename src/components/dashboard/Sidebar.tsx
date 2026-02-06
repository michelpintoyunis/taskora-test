interface SidebarProps {
    activeSection: string
    onSectionChange: (section: string) => void
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
    const sections = [
        { id: 'home', icon: '🏠', label: 'Home' },
        { id: 'deals', icon: '💼', label: 'Deals' },
        { id: 'tasks', icon: '✓', label: 'Tasks' },
    ]

    return (
        <div className="fixed left-0 top-0 h-screen w-20 bg-slate-900/50 backdrop-blur-md border-r border-white/10 flex flex-col items-center py-8 gap-6">
            {sections.map((section) => (
                <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
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
    )
}

export default Sidebar
