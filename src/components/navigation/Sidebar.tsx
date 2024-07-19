import { NavLink } from 'react-router-dom';

import logo from '/logo.svg';

export const Sidebar = () => {
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
        </nav>
    );
};
