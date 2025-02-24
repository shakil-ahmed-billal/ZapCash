import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
const MainPage = () => {
    return (
        <>
            <header>
                <Header />
            </header>
            <main className='dark:bg-[#111827] min-h-[calc(100vh-80px)] '>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}

export default MainPage