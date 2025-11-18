import {Button} from "antd";

import "./delete_btn.scss";

const DeleteBtn = ({btnName, onClick, icon, loading, disabled = false, style}) => {

    return (
        <Button
            onClick={() => onClick ? onClick() : null}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="delete-btn"
            style={{...style}}
        >
            {btnName}
        </Button>
    );
};

export default DeleteBtn;