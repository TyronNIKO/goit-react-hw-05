import {NavLink} from "react-router-dom";
import css from "./Header.module.css";
import clsx from "clsx";

const Header = () => {
    return (
        <>
            <header className={css.header}>
                <div className="container">
                    <nav>
                        <ul className={css.nav}>
                            <li>
                                <NavLink to="/" className={({isActive}) => clsx(css.link, isActive && css.active)}>
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/movies" className={({isActive}) => clsx(css.link, isActive && css.active)}>
                                    Movies
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
