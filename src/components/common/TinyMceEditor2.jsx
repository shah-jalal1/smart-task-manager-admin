import {Editor} from "@tinymce/tinymce-react";
import {TINY_MCE_API_KEY} from "../../constant/APIUrl.js";

const TinyMceEditor2 = ({
                            label,
                            name = "",
                            onEditorChange,
                            editorRef,
                            initialValue = "",
                            placeholder,
                            plugins = [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "emoticons",
                                "codesample",
                            ],
                            toolbar = `undo redo |  image link anchor | bold italic underline forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | codesample code preview fullscreen`,
                            menubar = "insert edit view format table tools",
                            height = 500,
                        }) => {

    // const uploadImage = async (data, cb) => {
    //     try {
    //         // folder name set
    //         // folder = pageName;
    //         // setLoading(true);
    //         // let formData = new FormData();
    //         // formData.append('file', data);
    //         // const res = await ImageUploadService.uploadImageSinglePageContent(`${UPLOAD_IMAGE_SINGLE_PAGE_CONTENT}`,
    //         //     formData, folder
    //         // );
    //         // setImageUrl(res.data);
    //         //
    //         // // set response url in tiny image source link
    //         // cb(`${REACT_APP_S3_BUCKET_URL}${res.data}`, {title: data.name});
    //         //
    //         // setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         const message = getErrorMessage(error)
    //         Toast("error", "Error", "Can not upload image ! " + message);
    //     }
    // }

    return <div>
        <Editor
            apiKey={TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={initialValue}
            onEditorChange={(content) => onEditorChange(content, name)}
            init={{
                height: height,
                plugins: plugins,
                placeholder: placeholder,
                toolbar: toolbar,
                menubar: menubar,
                image_title: true,
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: true,
                file_picker_types: "image",
                // file_picker_callback: function (cb) {
                //     var input = document.createElement("input");
                //     input.setAttribute("type", "file");
                //     input.setAttribute("accept", "image/*");
                //     input.onchange = async function () {
                //         var file = this.files[0];
                //
                //         const formData = new FormData();
                //         formData.append("folder", "blog");
                //         formData.append("images", file);
                //
                //         const response = await getImageKey(formData);
                //         // const signedUrl = await getImageSignedUrl(key);
                //         const signedUrl = `${GET_IMAGE_RENDER}?key=${response.keys[0]}`;
                //         const fileUrl = signedUrl;
                //
                //         cb(fileUrl, {
                //             title: file.name,
                //         });
                //     };
                //
                //     input.click();
                // },
                file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement("input");
                    input.setAttribute("type", "file");
                    input.setAttribute("accept", "image/*");
                    input.onchange = function () {
                        var file = this.files[0];

                        var reader = new FileReader();
                        reader.onload = function () {
                            // image upload
                            // uploadImage(file, cb);
                        };
                        reader.readAsDataURL(file);
                    };

                    input.click();
                },
                content_style:
                    "body { font-family:'Poppins', sans-serif; font-size:16px; color:#243757; font-weight: 500; }",
                paste_block_drop: false,
                paste_data_images: true,
                paste_as_text: true,
                branding: false,
                image_dimensions: false,
                // set max image width
                setup: function (editor) {
                    editor.on("init", function (args) {
                        editor = args.target;

                        editor.on("NodeChange", function (e) {
                            if (
                                e &&
                                e.element.nodeName.toLowerCase() === "img"
                            ) {
                                let width = e.element.width;
                                let height = e.element.height;
                                if (width > 1000) {
                                    height = height / (width / 1000);
                                    width = 1000;

                                    window.tinyMCE.DOM.setAttribs(
                                        e.element,
                                        {
                                            width: width,
                                            height: height,
                                        }
                                    );
                                }
                            }
                        });
                    });
                },
            }}
        />
    </div>

}
export default TinyMceEditor2;