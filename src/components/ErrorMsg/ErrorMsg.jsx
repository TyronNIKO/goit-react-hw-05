import css from "./ErrorMsg.module.css";

const ErrorMsg = ({children}) => {
    return <div className={css.errormessage}>{children}</div>;
};

export default ErrorMsg;
