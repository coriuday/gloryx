import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <div className="min-h-screen bg-gx-black text-white font-sans selection:bg-gx-green selection:text-gx-black">
            <Navbar />
            <main>
                <Hero />
                <ServicesGrid />
                <InfoSection />
            </main>
            <Footer />
        </div>
    );
}
