import { motion } from 'framer-motion'
import DashboardPreview from './DashboardPreview'
import { useLanguage } from '../context/LanguageContext'

const Hero = () => {
    const { t } = useLanguage()

    return (
        <div className="relative z-10 pt-32 pb-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Content */}
                <div className="flex flex-col items-center text-center mb-16">
                    {/* Trusted Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 font-manrope text-sm">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop offset="100%" stopColor="#1D4ED8" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M8 0L10.3511 5.52786L16 6.32295L12 10.4721L13.0902 16L8 13.2279L2.90983 16L4 10.4721L0 6.32295L5.64886 5.52786L8 0Z"
                                    fill="url(#starGradient)"
                                />
                            </svg>
                            <span className="text-white/90">{t('hero.badge')}</span>
                        </div>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-[80px] font-bold leading-tight mb-6 max-w-5xl"
                    >
                        {t('hero.title.part1')}{' '}
                        <span className="font-instrument-serif italic">{t('hero.title.workflow')}</span>.{' '}
                        <br className="hidden md:block" />
                        {t('hero.title.part2')}
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-400 text-lg md:text-xl font-manrope max-w-2xl mb-10"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 bg-white text-black rounded-full text-lg font-cabin font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all"
                    >
                        {t('hero.cta')}
                    </motion.button>
                </div>

                {/* Dashboard Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <DashboardPreview />
                </motion.div>
            </div>
        </div>
    )
}

export default Hero
