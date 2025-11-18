
import "./text_btn.scss";

const TextBtn = ({btnName, style, onClick = null}) => {
    return (
        <div
            className="text-btn"
            style={style}
            onClick={onClick}
        >
            {btnName}
        </div>
    );
};

export default TextBtn;