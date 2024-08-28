import {NavLink} from "react-router-dom";
import css from "./Navigation.module.css";
import clsx from "clsx";

const Navigation = () => {
    return (
        <nav className={css.navigation}>
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
    );
};
export default Navigation;
