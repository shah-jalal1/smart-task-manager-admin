import React from 'react';
import {Divider, Pagination} from "antd";
import {getIcon} from "../Icons.jsx";

import "./custom_pagination.scss";

const CustomPagination = ({handleTableChange, pagination}) => {

    const itemRender = (pageNumber, type, originalElement) => {

        if (type === 'prev') {
            return <div
                className="previous-btn"
                onClick={pageNumber > 0 ? () => handleTableChange({
                    page: pageNumber,
                    pageSize: pagination?.pageSize
                }) : null}
            >
                {getIcon("left_arrow")} Previous
            </div>;
        }
        if (type === 'next') {

            const isLastPage = pagination?.page >= Math.ceil(pagination?.total / pagination?.pageSize);

            return <div
                className="next-btn"
                onClick={!isLastPage ? () => handleTableChange(
                    {
                        page: pageNumber,
                        pageSize: pagination?.pageSize
                    }
                ) : null}
            >
                Next {getIcon("right_arrow")}
            </div>;
        }
        return originalElement;
    };

    return (
        <div className="custom-pagination">
            <Divider style={{margin: "16px 0"}}/>
            <Pagination
                total={pagination?.total}
                showSizeChanger
                showQuickJumper={false}
                itemRender={itemRender}
                onChange={(page, pageSize) => handleTableChange({page, pageSize})}
                current={pagination?.page}
            />
        </div>
    );
};

export default CustomPagination;