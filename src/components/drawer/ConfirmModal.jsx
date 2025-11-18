import React from 'react';
import {Flex, Modal} from "antd";
import DefaultBtn from "../buttons/DefaultBtn.jsx";
import {getIcon} from "../Icons.jsx";
import PrimaryBtn from "../buttons/PrimaryBtn.jsx";

const ConfirmModal = ({
                          title,
                          subTitle,
                          open,
                          onCancel,
                          cancelBtnText = "Cancel",
                          okBtnText = "OK",
                          handleCancel,
                          handleOk,
                          loading = false,
                          width = 400,
                          okBtn,
                          cancelBtn,
                          isCancelBtn = true
                      }) => {

    const renderCancelBtn = cancelBtn ?? (
        <DefaultBtn
            style={{width: "100%"}}
            onClick={handleCancel}
            btnName={cancelBtnText}
        />
    );

    const renderOkBtn = okBtn ?? (
        <PrimaryBtn
            style={{width: "100%"}}
            onClick={handleOk}
            loading={loading}
            btnName={okBtnText}
        />
    );

    return (
        <Modal
            title={<p style={{textAlign: "center", marginTop: 0}}>{title}</p>}
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
            closeIcon={getIcon("close")}
            footer={
                <Flex justify="space-between" gap={12}>
                    {isCancelBtn ? renderCancelBtn : null}
                    {renderOkBtn}
                </Flex>
            }
            width={width}
        >
            <p>{subTitle}</p>
        </Modal>
    );
};

export default ConfirmModal;