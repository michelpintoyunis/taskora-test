import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import BackgroundVideo from '../components/BackgroundVideo'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SignIn = () => {
    const { t } = useLanguage()
    const { signIn } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        const { error: signInError } = await signIn(email, password)

        if (signInError) {
            // Errores específicos de Supabase
            if (signInError.message.includes('Invalid login credentials')) {
                setError('Correo o contraseña incorrectos. Por favor verifica tus datos.')
            } else if (signInError.message.includes('Email not confirmed')) {
                setError('Por favor confirma tu correo electrónico antes de iniciar sesión.')
            } else if (signInError.message.includes('User not found')) {
                setError('El correo electrónico no está registrado.')
            } else {
                setError('Error al iniciar sesión. Por favor intenta de nuevo.')
            }
            setLoading(false)
        } else {
            // Inicio de sesión exitoso
            navigate('/dashboard')
        }
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden flex items-center justify-center">
            <BackgroundVideo />

            <div className="relative z-10 w-full max-w-md px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
                >
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-4xl font-bold mb-2">{t('auth.signin.title')}</h1>
                        <p className="text-gray-300 font-manrope">{t('auth.signin.subtitle')}</p>
                    </motion.div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
                        >
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-200">{error}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signin.email')}
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all"
                                placeholder="nombre@ejemplo.com"
                            />
                        </motion.div>

                        {/* Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signin.password')}
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Remember & Forgot */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center justify-between"
                        >
                            <label className="flex items-center group cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 transition-all"
                                />
                                <span className="ml-2 text-sm font-inter-tight group-hover:text-gray-200 transition-colors">{t('auth.signin.remember')}</span>
                            </label>
                            <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-inter-tight transition-colors">
                                {t('auth.signin.forgot')}
                            </a>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: loading ? 1 : 1.02, boxShadow: loading ? undefined : '0 20px 40px rgba(59, 130, 246, 0.3)' }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className={`w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-cabin font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Iniciando sesión...</span>
                                </div>
                            ) : (
                                t('auth.signin.button')
                            )}
                        </motion.button>
                    </form>

                    {/* Sign Up Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-300 font-inter-tight">
                            {t('auth.signin.noAccount')}{' '}
                            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                {t('auth.signin.createAccount')}
                            </Link>
                        </p>
                    </motion.div>

                    {/* Back to Home */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-4 text-center"
                    >
                        <Link to="/" className="text-sm text-gray-400 hover:text-white font-inter-tight transition-colors inline-flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('nav.home')}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default SignIn
