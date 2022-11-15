import React, {Component, useState} from "react";
import {FilePond} from "react-filepond";
import "./index.css";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import zhCN from "filepond/locale/zh-cn.js";
import {Button, Input, message, Tooltip} from "antd";
import {CopyOutlined} from '@ant-design/icons';

const Upload = () => {
    const [files, setFiles] = useState([]);
    const [remoteFiles, setRemoteFiles] = useState([]);

    const [authorization, setAuthorization] = useState('');

    return (
        <>
            <Input style={{marginBottom: 10}} addonBefore="Authorization" onChange={(event) => {
                setAuthorization(event.target.value);
            }}/>
            <FilePond
                {...zhCN}
                files={files}
                allowMultiple={true}
                beforeAddFile={() => {
                    if(authorization && authorization.length === 32) {
                        return true;
                    }

                    message.error("请填写正确的Authorization")
                    return false;
                }}
                beforeDropFile={() => {
                    if(authorization && authorization.length === 32) {
                        return true;
                    }

                    message.error("请填写正确的Authorization")
                    return false;
                }}
                server={{
                    // fake server to simulate loading a 'local' server file and processing a file
                    process: (fieldName, file, metadata, load) => {
                        // simulates uploading a file
                        var data = new FormData()
                        data.append('file', file)

                        fetch('https://upload-service.cv3sarato.ga/api/upload', {
                            method: 'POST',
                            body: data,
                            headers: {
                                Authorization: authorization
                            }
                        }).then(response => {
                            load(response);
                            if (response.status === 200) {
                                return response.json();
                            }
                            message.error("出现错误")
                            return undefined;
                        }).then((result) => {
                            if (result) {
                                let currentFiles = remoteFiles.slice();
                                currentFiles.unshift(result?.data)
                                setRemoteFiles(currentFiles);
                            }
                        });
                    }
                }}
                allowRevert={false}
                allowRemove={false}
                instantUpload={true}
                maxParallelUploads={1}
                maxFileSize="5MB"
                acceptedFileTypes={["image/png", "image/jpeg", "image/jpg"]}
                onremovefile={(error, file) => {
                    console.error("error", error, file);
                }}
                onerror={(error) => {
                    console.error("error", error);
                }}
                onupdatefiles={(fileItems) => {
                    setFiles(fileItems);
                }}
            ></FilePond>

            {
                remoteFiles && remoteFiles.length > 1 &&
                <Button icon={<CopyOutlined/>} onClick={() => {
                    let copiedText = ""
                    remoteFiles.forEach((item, index) => {
                        copiedText += `${item.url}\n`;
                    });
                    navigator.clipboard.writeText(copiedText);
                    message.info("一键复制成功")
                }}>一键复制</Button>
            }
            {
                remoteFiles.map((item, index) => {
                    return (
                        <Input.Group key={item.hash} compact style={{marginTop: 10}}>
                            <Input
                                id={item.hash}
                                style={{width: 'calc(100% - 200px)'}}
                                defaultValue={item.url}
                                disabled={true}
                            />
                            <Tooltip title="复制URL" data-clipboard-target={`#${item.hash}`}>
                                <Button icon={<CopyOutlined/>} onClick={() => {
                                    navigator.clipboard.writeText(item.url)
                                    message.info("复制成功")
                                }}/>
                            </Tooltip>
                        </Input.Group>
                    );
                })
            }
        </>
    );
};

export default Upload;
