import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
const MainPage = () => {
    return (
        <div className='dark:bg-[#111827]'>
            <header>
                <Header />
            </header>
            <main className='min-h-[calc(100vh-80px)] '>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainPage