import "./index.css";
import {createEffect, createResource, createSignal} from "solid-js";

const Upload = () => {

    const [backgroundImages, setBackgroundImages] = createSignal([]);

    const [todayBackgroundImage, setTodayBackgroundImage] = createSignal('');

    createEffect(() => {
        fetchBackgrounds();
    });

    const fetchBackgrounds = async () => {
        const res = await fetch(`https://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=7`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            mode: 'no-cors'
        });
        const bingData = await res.json();
        setBackgroundImages(bingData?.images || [])

        if(bingData?.images && bingData?.images?.length > 0) {
            setTodayBackgroundImage(`https://cn.bing.com${bingData.images[0].url}`)
        }
    }

    const onUploadClick = () => {

    }

    return (
        <div>
            <div class="container">
                {
                    todayBackgroundImage &&
                    <div class="background-container" style={{"background-image": `url(${todayBackgroundImage()})`}} />
                }
                <div class="header">
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="#fff"
                            stroke-width="4"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                        ></circle>
                        <path
                            d="M9 37L17 28L33 41"
                            stroke="#fff"
                            stroke-width="4"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                        ></path>
                        <circle
                            cx="18"
                            cy="17"
                            r="4"
                            fill="none"
                            stroke="#fff"
                            stroke-width="4"
                        ></circle>
                        <path
                            d="M24 33L32 23L42 31"
                            stroke="#fff"
                            stroke-width="4"
                            stroke-linecap="butt"
                            stroke-linejoin="miter"
                        ></path>
                    </svg>
                </div>
                <div class="main">
                    <div class="title">Telegraph-Image</div>
                    <div id="paste" class="upload-main">
                        <div class="wrapper waitting">
                            <div class="area waitting">
                                <div class="svg-wrapper flex">
                                    <div class="svg-box">
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="upload-icon"
                                        >
                                            <path
                                                d="M422.4 704l-94.72-143.36c-15.36-23.04-46.08-30.72-71.68-15.36l-15.36 15.36-130.56 204.8c-12.8 25.6-7.68 56.32 17.92 71.68 7.68 5.12 17.92 7.68 25.6 7.68h256c28.16 0 51.2-23.04 51.2-51.2 0-7.68-2.56-15.36-5.12-23.04l-33.28-66.56z"
                                                fill="#A5C8F4"
                                            ></path>
                                            <path
                                                d="M307.2 358.4c-43.52 0-76.8-33.28-76.8-76.8s33.28-76.8 76.8-76.8 76.8 33.28 76.8 76.8-33.28 76.8-76.8 76.8z m327.68-33.28c5.12-7.68 12.8-15.36 20.48-17.92 25.6-12.8 56.32 0 69.12 23.04L944.64 793.6c2.56 7.68 5.12 15.36 5.12 23.04 0 28.16-23.04 51.2-51.2 51.2H378.88c-10.24 0-20.48-2.56-30.72-10.24-23.04-15.36-28.16-48.64-12.8-71.68l56.32-79.36 243.2-381.44z"
                                                fill="#2589FF"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="text-area">
                                    <span>也可直接截图并粘贴到这里</span>
                                </div>
                                <div class="upload-btn-area">
                                    <input
                                        accept="image/jpeg, image/png, image/gif"
                                        id="upFiles"
                                        name="Files"
                                        type="file"
                                    />
                                    <label for="upFiles" class="btn-upload" onClick={() => onUploadClick()}>
                                        选择上传图片
                                    </label>
                                </div>
                            </div>
                            <div class="area uploading" style="display:none">
                                <div class="svg-wrapper flex">
                                    <div class="svg-box">
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="upload-icon"
                                        >
                                            <path
                                                d="M554.666667 268.8v601.6h-85.333334V268.8L337.066667 401.066667 277.333333 341.333333 512 106.666667 746.666667 341.333333l-59.733334 59.733334L554.666667 268.8z"
                                                fill="#0075ff"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="text-area">
                                    <span>正在上传，请稍等…</span>
                                </div>
                            </div>
                            <div class="area done" style="display:none">
                                <div class="svg-wrapper flex">
                                    <div class="svg-box">
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="upload-icon"
                                        >
                                            <path
                                                d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
                                                fill="#0075ff"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="text-area">
                                    <span>复制下面的图片地址 或者 取消重新上传</span>
                                </div>
                                <div class="url-box">
                                    <div class="copy-url" style="display:none">
                                        <div class="input-group">
                                            <input readonly id="url-content" class="input-sm"/>
                                            <div
                                                data-clipboard-target="#url-content"
                                                class="input-group-button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    height="16"
                                                    version="1.1"
                                                    viewBox="0 0 14 16"
                                                    width="14"
                                                    class="octicon octicon-clippy"
                                                >
                                                    <path
                                                        d="M2 13h4v1H2v-1zm5-6H2v1h5V7zm2 3V8l-3 3 3 3v-2h5v-2H9zM4.5 9H2v1h2.5V9zM2 12h2.5v-1H2v1zm9 1h1v2c-.02.28-.11.52-.3.7-.19.18-.42.28-.7.3H1c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2h3c.55 0 1 .45 1 1v5h-1V6H1v9h10v-2zM2 5h8c0-.55-.45-1-1-1H8c-.55 0-1-.45-1-1s-.45-1-1-1-1 .45-1 1-.45 1-1 1H3c-.55 0-1 .45-1 1z"
                                                        fill-rule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="re-upload">
                                            <svg
                                                height="26"
                                                viewBox="0 0 1024 1024"
                                                width="26"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M396.8 200.533333l64 64L384 341.333333h298.666667c119.466667 0 213.333333 93.866667 213.333333 213.333334s-93.866667 213.333333-213.333333 213.333333H298.666667v-85.333333h384c72.533333 0 128-55.466667 128-128s-55.466667-128-128-128H170.666667l226.133333-226.133334z"
                                                    fill="#d73a49"
                                                    p-id="7650"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="area error" style="display:none">
                                <div class="svg-wrapper flex">
                                    <div class="svg-box">
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="upload-icon"
                                        >
                                            <path
                                                d="M809.222867 150.531412 868.688213 210.004945 568.397986 510.292102 868.688213 810.587446 809.222867 870.055862 508.93264 569.771775 208.644459 870.055862 149.169903 810.587446 449.461153 510.292102 149.169903 210.004945 208.644459 150.531412 508.93264 450.823686Z"
                                                fill="#d81e06"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div class="text-area">
                                    <span>出错啦，请重新上传</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
