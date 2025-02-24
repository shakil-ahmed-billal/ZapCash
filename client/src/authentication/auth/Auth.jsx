import { Outlet } from 'react-router-dom';


const Auth = () => {
    return (
        <div className='dark:bg-[#111827]'>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Auth