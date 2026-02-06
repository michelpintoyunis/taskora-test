import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BackgroundVideo from '../components/BackgroundVideo'

const Home = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 text-white overflow-hidden">
            <BackgroundVideo />
            <Navbar />
            <Hero />
        </div>
    )
}

export default Home
