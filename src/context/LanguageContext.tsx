import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.company': 'Company',
        'nav.contact': 'Contact',
        'nav.signup': 'Sign Up',
        'nav.signin': 'Sign In',

        // Hero
        'hero.badge': 'Trusted by +30.000 of clients globally',
        'hero.title.part1': 'Simplify Your',
        'hero.title.workflow': 'Workflow',
        'hero.title.part2': 'Stay Focused.',
        'hero.subtitle': 'Taskora helps teams manage projects, tasks, and deadlines with clarity.',
        'hero.cta': 'Book a Free Demo',

        // Dashboard
        'dashboard.search': 'Search...',
        'dashboard.totalSales': 'Total Sales',
        'dashboard.expenses': 'Operating Expenses',
        'dashboard.profit': 'Gross Profit',
        'dashboard.revenue': 'Revenue Overview',
        'dashboard.deals': 'Recent Deals',
        'dashboard.dealName': 'Deal Name',
        'dashboard.company': 'Company',
        'dashboard.amount': 'Amount',
        'dashboard.date': 'Date',
        'dashboard.owner': 'Owner',
        'dashboard.stage': 'Stage',

        // Auth
        'auth.signin.title': 'Welcome Back',
        'auth.signin.subtitle': 'Sign in to your account to continue',
        'auth.signin.email': 'Email address',
        'auth.signin.password': 'Password',
        'auth.signin.remember': 'Remember me',
        'auth.signin.forgot': 'Forgot password?',
        'auth.signin.button': 'Sign In',
        'auth.signin.noAccount': "Don't have an account?",
        'auth.signin.createAccount': 'Create one',

        'auth.signup.title': 'Create Account',
        'auth.signup.subtitle': 'Join thousands of teams using Taskora',
        'auth.signup.name': 'Full name',
        'auth.signup.email': 'Email address',
        'auth.signup.password': 'Password',
        'auth.signup.confirmPassword': 'Confirm password',
        'auth.signup.terms': 'I agree to the Terms and Conditions',
        'auth.signup.button': 'Create Account',
        'auth.signup.hasAccount': 'Already have an account?',
        'auth.signup.signin': 'Sign in',
    },
    es: {
        // Navbar
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.company': 'Empresa',
        'nav.contact': 'Contacto',
        'nav.signup': 'Registrarse',
        'nav.signin': 'Iniciar Sesión',

        // Hero
        'hero.badge': 'Confiado por +30.000 clientes a nivel global',
        'hero.title.part1': 'Simplifica tu',
        'hero.title.workflow': 'Flujo de Trabajo',
        'hero.title.part2': 'Mantente Enfocado.',
        'hero.subtitle': 'Taskora ayuda a los equipos a gestionar proyectos, tareas y plazos con claridad.',
        'hero.cta': 'Reservar Demo Gratuita',

        // Dashboard
        'dashboard.search': 'Buscar...',
        'dashboard.totalSales': 'Ventas Totales',
        'dashboard.expenses': 'Gastos Operativos',
        'dashboard.profit': 'Beneficio Bruto',
        'dashboard.revenue': 'Resumen de Ingresos',
        'dashboard.deals': 'Negociaciones Recientes',
        'dashboard.dealName': 'Nombre del Trato',
        'dashboard.company': 'Empresa',
        'dashboard.amount': 'Monto',
        'dashboard.date': 'Fecha',
        'dashboard.owner': 'Propietario',
        'dashboard.stage': 'Etapa',

        // Auth
        'auth.signin.title': 'Bienvenido de Nuevo',
        'auth.signin.subtitle': 'Inicia sesión en tu cuenta para continuar',
        'auth.signin.email': 'Correo electrónico',
        'auth.signin.password': 'Contraseña',
        'auth.signin.remember': 'Recordarme',
        'auth.signin.forgot': '¿Olvidaste tu contraseña?',
        'auth.signin.button': 'Iniciar Sesión',
        'auth.signin.noAccount': '¿No tienes una cuenta?',
        'auth.signin.createAccount': 'Crear una',

        'auth.signup.title': 'Crear Cuenta',
        'auth.signup.subtitle': 'Únete a miles de equipos usando Taskora',
        'auth.signup.name': 'Nombre completo',
        'auth.signup.email': 'Correo electrónico',
        'auth.signup.password': 'Contraseña',
        'auth.signup.confirmPassword': 'Confirmar contraseña',
        'auth.signup.terms': 'Acepto los Términos y Condiciones',
        'auth.signup.button': 'Crear Cuenta',
        'auth.signup.hasAccount': '¿Ya tienes una cuenta?',
        'auth.signup.signin': 'Iniciar sesión',
    },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('es') // Default to Spanish

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.en] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
