import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const { language, setLanguage, t } = useLanguage()
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en')
    }

    const handleSignOut = async () => {
        await signOut()
        setIsProfileOpen(false)
        navigate('/')
    }

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Desktop & Mobile Navbar */}
                <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 flex items-center justify-between border border-white/10">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="Logo" className="h-8 w-8" />
                        <span className="text-xl font-bold font-inter-tight">Taskora</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 font-inter-tight text-sm">
                        <Link to="/" className="hover:text-gray-300 transition-colors">
                            {t('nav.home')}
                        </Link>
                        {user && (
                            <Link to="/dashboard" className="hover:text-gray-300 transition-colors">
                                Dashboard
                            </Link>
                        )}
                        <a href="#features" className="hover:text-gray-300 transition-colors">
                            {t('nav.features')}
                        </a>
                        <a href="#company" className="hover:text-gray-300 transition-colors">
                            {t('nav.company')}
                        </a>
                        <a href="#contact" className="hover:text-gray-300 transition-colors">
                            {t('nav.contact')}
                        </a>
                    </div>

                    {/* Desktop Right Side (Language + Auth/Profile) */}
                    <div className="hidden md:flex items-center space-x-4 min-w-[280px]">
                        {/* Language Toggle */}
                        <button
                            onClick={toggleLanguage}
                            className="px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-inter-tight hover:bg-white/20 transition-all flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                            </svg>
                            {language.toUpperCase()}
                        </button>

                        {/* Auth Buttons or User Profile */}
                        {user ? (
                            <div className="relative flex-1">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition-all w-full justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-inter-tight truncate max-w-[120px]">
                                            {user.user_metadata?.full_name || 'Mi Perfil'}
                                        </span>
                                    </div>
                                    <svg className={`w-4 h-4 transition-transform flex-shrink-0 ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute right-0 mt-2 w-64 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
                                        >
                                            <div className="p-4 border-b border-white/20">
                                                <p className="text-sm font-semibold truncate">{user.user_metadata?.full_name || 'Usuario'}</p>
                                                <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                            </div>
                                            <div className="p-2">
                                                <Link
                                                    to="/dashboard"
                                                    onClick={() => setIsProfileOpen(false)}
                                                    className="block px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
                                                >
                                                    📊 Dashboard
                                                </Link>
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full text-left px-4 py-2 hover:bg-red-500/20 rounded-lg transition-colors text-sm text-red-300"
                                                >
                                                    🚪 Cerrar Sesión
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <button
                                    onClick={() => navigate('/signin')}
                                    className="px-4 py-1.5 text-sm font-inter-tight hover:text-gray-300 transition-colors"
                                >
                                    {t('nav.signin')}
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="px-4 py-1.5 bg-white text-black rounded-full text-sm font-cabin font-semibold hover:bg-gray-200 transition-all"
                                >
                                    {t('nav.signup')}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-2 bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10"
                        >
                            <div className="p-6 space-y-4">
                                {user && (
                                    <div className="pb-4 border-b border-white/20">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center font-bold">
                                                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">{user.user_metadata?.full_name || 'Usuario'}</p>
                                                <p className="text-xs text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <Link
                                    to="/"
                                    className="block font-inter-tight hover:text-gray-300 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {t('nav.home')}
                                </Link>
                                {user && (
                                    <Link
                                        to="/dashboard"
                                        className="block font-inter-tight hover:text-gray-300 transition-colors"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <a href="#features" className="block font-inter-tight hover:text-gray-300 transition-colors">
                                    {t('nav.features')}
                                </a>
                                <a href="#company" className="block font-inter-tight hover:text-gray-300 transition-colors">
                                    {t('nav.company')}
                                </a>
                                <a href="#contact" className="block font-inter-tight hover:text-gray-300 transition-colors">
                                    {t('nav.contact')}
                                </a>

                                <div className="pt-4 border-t border-white/20 space-y-3">
                                    <button
                                        onClick={toggleLanguage}
                                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-inter-tight hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                                        </svg>
                                        {language === 'en' ? 'English' : 'Español'}
                                    </button>

                                    {user ? (
                                        <button
                                            onClick={() => {
                                                handleSignOut()
                                                setIsMenuOpen(false)
                                            }}
                                            className="w-full px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm font-cabin font-semibold hover:bg-red-500/30 transition-all"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    navigate('/signin')
                                                    setIsMenuOpen(false)
                                                }}
                                                className="w-full px-4 py-2 text-sm font-inter-tight hover:bg-white/10 rounded-xl transition-colors"
                                            >
                                                {t('nav.signin')}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/signup')
                                                    setIsMenuOpen(false)
                                                }}
                                                className="w-full px-4 py-2 bg-white text-black rounded-xl text-sm font-cabin font-semibold hover:bg-gray-200 transition-all"
                                            >
                                                {t('nav.signup')}
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar
