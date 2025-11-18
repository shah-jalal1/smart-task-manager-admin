
const ImageView = ({url, style, onClick, cursor = "pointer"}) => {

    if (url) {
        return <img
            style={{...style, cursor}}
            src={url}
            onClick={onClick ? onClick : null}
            onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/assets/images/no_image_icon.png"
            }}
            alt="no_image"
        />
    }

    return <img style={style} src="/assets/images/no_image_icon.png" alt="no_image"/>

}

export default ImageView;
