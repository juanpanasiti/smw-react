import { NavLink } from 'react-router-dom';

import logo from '/logo.svg';
import { useAuth } from '../../hooks';

export const Sidebar = () => {
    const { logout } = useAuth();
    return (
        <nav>
            <img className='nav-logo' src={logo} alt='React logo' />
            <ul>
                <li>
                    <NavLink to='/' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/expenses' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
                        Expenses
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/statements' className={({ isActive }) => (isActive ? 'nav-active' : '')}>
                        Statements
                    </NavLink>
                </li>
            </ul>
            <ul>
                <li>
                    <a onClick={logout}>Logout</a>
                </li>
            </ul>
        </nav>
    );
};
