
import "./custom_title.scss";

const CustomTitle = ({title = "Title", style}) => {
    return (
        <p
            className="custom-title"
            style={{...style}}
        >
            {title}
        </p>
    );
};

export default CustomTitle;