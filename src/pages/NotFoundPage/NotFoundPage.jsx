import {Link} from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <div className={css.notfoundpage}>
            <div className="container">
                <h1>404 Такого запиту не існує!</h1>
                <Link to="/">На головну</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
