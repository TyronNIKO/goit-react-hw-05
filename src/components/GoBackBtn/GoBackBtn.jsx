import {Link} from "react-router-dom";
import css from "./GoBackBtn.module.css";
import {SlArrowLeft} from "react-icons/sl";

export const GoBackBtn = ({children, path}) => {
    return (
        <Link className={css.link} to={path}>
            <SlArrowLeft />
            {children}
        </Link>
    );
};
