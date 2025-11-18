import React, {useState} from 'react';
import {Flex, Upload} from 'antd';
import {BODY_BGC} from "../../constant/ColorConstant.js";
import {getIcon} from "../Icons.jsx";

import "./file_uploader.scss";

const {Dragger} = Upload;

const CustomFileUploader = (props) => {

    const [error, setError] = useState(false);

    const {
        acceptFileExtension = "application/pdf, text/csv, text/plain, text/zip",
        fileExtensionTxt = ".csv, .pdf, .txt, & .zip files"
    } = props;

    const onRemove = (file) => {
        props.onRemove(file);
    };

    function beforeUpload(file) {

        const _fileType = ["application/pdf", "text/csv", "text/plain", "text/zip",];

        const isValidExtension = _fileType.includes(file.type);

        if (!isValidExtension) {
            setError(true);
            return;
        }

        setError(!isValidExtension);

        return isValidExtension;
    }

    const uploadFile = async data => {

        if (error) {
            return;
        }

        props.onUpload({local: true, name: data.file.name, file: data.file});

    }

    return (
        <div>

            <Dragger
                customRequest={uploadFile}
                beforeUpload={beforeUpload}
                multiple={props.multiple}
                showUploadList={false}
                accept={acceptFileExtension}
                className="file-uploader"
                style={{width: "100%"}}
            >
                <div className="upload-btn-wrapper">
                    <Flex gap={6} align="center">
                        <p className="upload-file-title">
                            Upload File
                        </p>
                        {getIcon("cloud_upload")}
                    </Flex>

                    <p className="extension-support-txt">
                        Supports ({fileExtensionTxt})
                    </p>

                    <p className="extension-support-txt">
                        Drag & Drop file here
                    </p>

                    <p className="extension-support-txt">
                        or click <span>browse</span> to upload from your device
                    </p>

                </div>
            </Dragger>

            <div style={{marginTop: "12px"}}>
                {
                    props.fileList?.map((v, i) =>
                        <Flex
                            justify="space-between"
                            style={{
                                backgroundColor: BODY_BGC,
                                borderRadius: "4px",
                                padding: "6px 12px",
                                margin: "8px 0"
                            }}
                            align="center"
                            key={i}

                        >
                            <p className="text-primary-gradient-color">
                                {v?.name}
                            </p>
                            <span
                                onClick={() => onRemove(v)}
                                style={{cursor: "pointer"}}
                            >
                                {getIcon("delete")}
                            </span>
                        </Flex>
                    )
                }
            </div>

        </div>
    );
};

export default CustomFileUploader;
