import Header from '@/components/header/Header';
import { Outlet } from 'react-router-dom';
const MainPage = () => {
    return (
        <div className='dark:bg-[#111827]'>
            <header>
                <Header />
            </header>
            <main className='min-h-[calc(100vh-56px)] '>
                <Outlet />
            </main>
        </div>
    )
}

export default MainPage