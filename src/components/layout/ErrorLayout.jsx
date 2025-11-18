import {Button, Result} from "antd";
import {Link} from "react-router-dom";

const ErrorLayout = ({status, title, subTitle, btnName, pathName}) => {
    return (
        <Result
            status={status}
            title={title}
            subTitle={subTitle}
            extra={<Link to={pathName}><Button type="primary">{btnName}</Button></Link>}
        />
    );
};

export default ErrorLayout;