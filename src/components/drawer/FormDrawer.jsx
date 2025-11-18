import React from 'react';
import {Drawer, Flex} from "antd";
import PrimaryBtn from "../buttons/PrimaryBtn.jsx";
import DefaultBtn from "../buttons/DefaultBtn.jsx";
import {getIcon} from "../Icons.jsx";

import "./from_drawer.scss";

const FormDrawer = props => {

    const {
        open,
        closeDrawer,
        title,
        btnNameCancel = "Cancel",
        btnNameOk,
        children,
        handleOk,
        handleCancel,
        loading,
        width = 450,
        okayBtnDisabled = false,
        isFooter = true,
        cancelBtn,
        okBtn,
    } = props;

    const renderCancelBtn = cancelBtn ?? <DefaultBtn
        style={{width: "100%"}}
        onClick={handleCancel}
        btnName={btnNameCancel}
    />

    const renderOkBtn = okBtn ?? <PrimaryBtn
        style={{width: "100%"}}
        onClick={handleOk}
        loading={loading}
        btnName={btnNameOk}
        disabled={okayBtnDisabled}
    />

    return (
        <div className="form-drawer">
            <Drawer
                open={open}
                onClose={closeDrawer}
                title={<Flex justify="space-between">
                    <span>{title}</span>
                    <span
                        onClick={closeDrawer}
                        style={{cursor: "pointer"}}
                    >
                        {getIcon("close")}
                    </span>
                </Flex>}
                closeIcon={null}
                footer={
                    isFooter ? <Flex justify="space-between" gap={12}>
                        {renderCancelBtn}
                        {renderOkBtn}
                    </Flex> : null
                }
                width={width}
                rootClassName="form-drawer-root-class"
            >
                {children}
            </Drawer>
        </div>
    );
};

export default FormDrawer;