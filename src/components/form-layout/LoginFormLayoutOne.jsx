import "./LoginFormLayoutOne.scss";

const LoginFormLayoutOne = ({children}) => {
    return (
        <div className="login-form-layout-one">
            <div className="login-form-layout-child-one">
                {childrenOne}
            </div>
            <div style={{padding: "0 80px"}}>
                {childrenTwo}
            </div>
        </div>
    );
};

export default LoginFormLayoutOne;