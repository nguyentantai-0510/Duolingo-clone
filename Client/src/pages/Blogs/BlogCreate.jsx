import "../../assets/css/authIndex.css";
import { useState } from "react";
import useBlog from "../../hooks/useBlog";
import { useNavigate } from "react-router-dom";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import pending from "../../assets/imgs/pending.gif";


const BlogCreate = () => {
    const navigate = useNavigate();
    const { errors, postBlog, isLoading } = useBlog();
    const [input, setInput] = useState({ title: "", snippet: "", body: "" });
    function handleChange(e, editor) {
        if (e?.target) {
            const { name, value } = e.target;
            if(name === "title"){
                document.title = value;
            }
            return setInput(preInput => ({ ...preInput, [name]: value }));
        }
        return setInput(preInput => ({ ...preInput, body: editor.getData() }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        await postBlog("http://localhost:3000/api/blog/create-blog", input.title, input.snippet, input.body);
        navigate("/blogs");
    }
    return (
        <div className="auth__layout">
            <div className="auth__form">
                <form onSubmit={handleSubmit}>
                    <h1>Create your blog</h1>
                    {errors && <div className="error">{errors}</div>}
                    <div className="form__input">
                        <input
                            type="text"
                            placeholder="Blog title"
                            name="title"
                            value={input.title}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Blog snippet"
                            name="snippet"
                            value={input.snippet}
                            onChange={handleChange}
                            required
                        />
                        <CKEditor
                            editor={ClassicEditor}
                            name="body"
                            data={input.body}
                            onChange={handleChange} />
                    </div>
                    <div className="form__submit">
                        <button> Submit{isLoading ? <img src={pending} alt="" className="pending__fetching" /> : ""}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BlogCreate;