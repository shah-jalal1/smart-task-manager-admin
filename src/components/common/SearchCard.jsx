import {Row} from "antd";

import "./search_card.scss"

const SearchCard = ({title, count, children, titleStyle}) => {
    return (
        <div className="search-card">

            <div className="search-card-left">
                <span
                    className="title"
                    style={titleStyle}
                >
                    {title}
                </span>{title && ":"}
                <span className="count">
                    {count}
                </span>
            </div>

            <div className="search-card-right">
                <Row
                    gutter={24}
                    style={{justifyContent: "flex-end", margin: 0}}
                >
                    {children}
                </Row>
            </div>
        </div>
    );
};

export default SearchCard;
