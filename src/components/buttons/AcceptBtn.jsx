import {Button} from "antd";

import "./accept_btn.scss"

const PrimaryBtn = ({btnName, onClick, icon, loading, disabled = false, style}) => {

    return (
        <Button
            onClick={() => onClick ? onClick() : null}
            icon={icon ? icon : null}
            loading={loading}
            disabled={disabled}
            className="accept-btn"
            style={{...style}}
        >
            {btnName}
        </Button>
    );
};

export default PrimaryBtn;