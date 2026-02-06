import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-lg">Cargando...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/signin" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
