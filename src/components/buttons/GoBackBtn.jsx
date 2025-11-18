import {Flex} from "antd";
import {getIcon} from "../Icons.jsx";

const GoBackBtn = ({btnName = "Go back", onClick = null, icon = getIcon("caret_left")}) => {
    return (
        <Flex
            gap={8}
            align="center"
            onClick={onClick}
            style={{cursor: 'pointer', width: "fit-content"}}
        >
            {icon}
            <span style={{fontWeight: 500, color: '#243757', paddingTop: "3px"}}>
                    {btnName}
            </span>
        </Flex>
    );
};

export default GoBackBtn;