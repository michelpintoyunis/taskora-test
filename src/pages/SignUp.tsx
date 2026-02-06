import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { Link, useNavigate } from 'react-router-dom'
import BackgroundVideo from '../components/BackgroundVideo'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SignUp = () => {
    const { t } = useLanguage()
    const { signUp } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // Validaciones
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.')
            return
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.')
            return
        }

        setLoading(true)

        const { error: signUpError } = await signUp(email, password, fullName)

        if (signUpError) {
            // Errores específicos de Supabase
            if (signUpError.message.includes('User already registered')) {
                setError('Este correo electrónico ya está registrado. Por favor inicia sesión.')
            } else if (signUpError.message.includes('Password should be at least')) {
                setError('La contraseña debe tener al menos 6 caracteres.')
            } else if (signUpError.message.includes('already registered') || signUpError.message.includes('already exists')) {
                setError('Este correo electrónico ya está en uso.')
            } else {
                setError('Error al crear la cuenta. Por favor intenta de nuevo.')
            }
            setLoading(false)
        } else {
            // Registro exitoso
            setSuccess(true)
            setLoading(false)
            setTimeout(() => {
                navigate('/signin')
            }, 2000)
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
                        <h1 className="text-4xl font-bold mb-2">{t('auth.signup.title')}</h1>
                        <p className="text-gray-300 font-manrope">{t('auth.signup.subtitle')}</p>
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

                    {/* Success Message */}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl"
                        >
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-sm text-green-200 font-semibold">¡Cuenta creada exitosamente!</p>
                                    <p className="text-xs text-green-300 mt-1">Redirigiendo al inicio de sesión...</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signup.name')}
                            </label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all"
                                placeholder="Juan Pérez"
                            />
                        </motion.div>

                        {/* Email */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signup.email')}
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
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signup.password')}
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

                        {/* Confirm Password */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-medium mb-2 font-inter-tight">
                                {t('auth.signup.confirmPassword')}
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 transition-all pr-12"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? (
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

                        {/* Terms */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="flex items-start"
                        >
                            <input
                                type="checkbox"
                                required
                                className="w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-400 transition-all"
                            />
                            <span className="ml-2 text-sm font-inter-tight text-gray-300">
                                {t('auth.signup.terms')}
                            </span>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={loading}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
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
                                    <span>Creando cuenta...</span>
                                </div>
                            ) : (
                                t('auth.signup.button')
                            )}
                        </motion.button>
                    </form>

                    {/* Sign In Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-6 text-center"
                    >
                        <p className="text-sm text-gray-300 font-inter-tight">
                            {t('auth.signup.hasAccount')}{' '}
                            <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                                {t('auth.signup.signin')}
                            </Link>
                        </p>
                    </motion.div>

                    {/* Back to Home */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.0 }}
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

export default SignUp
