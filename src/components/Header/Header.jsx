import Navigation from "../Navigation/Navigation";
import css from "./Header.module.css";

const Header = () => {
    return (
        <>
            <header className={css.header}>
                <div className="container">
                    <Navigation />
                </div>
            </header>
        </>
    );
};

export default Header;
