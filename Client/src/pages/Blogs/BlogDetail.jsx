import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { formatDistanceToNow } from 'date-fns'
// import { AuthContext } from "../../context/authReducer/authContext";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import useBlog from "../../hooks/useBlog";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import pending from "../../assets/imgs/pending.gif";
import { useSelector } from "react-redux";

const BlogDetail = () => {
    const { errors, editBlog, isLoading } = useBlog();
    const navigate = useNavigate();
    const { id: blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [editable, setEdit] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const  state  = useSelector(state => state.auth);
    const [author, setAuthor] = useState(null);
    const [inputForm, setInputForm] = useState({
        title: "",
        body: "",
    });
    const { token} = state.user;
    useEffect(() => {
        fetch(`http://localhost:3000/api/blog/get-blog/${blogId}`,
            {
                headers: { "Authorization": `Bearer ${token}` }
            })
            .then(res => res.json())
            .then(data => {
                document.title = data.blog.title;
                setInputForm({
                    title: data.blog.title,
                    body: data.blog.body,
                });
                setBlog(data.blog);
                setAuthor(data.user._id);
                return;
            })
            .catch(err => console.error(err));
    }, [])
    async function handleRemove() {
        const res = await fetch(`http://localhost:3000/api/blog/remove-blog/${blogId}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        })
        const json = await res.json();
        console.log(json);
        if (json.error) {
            alert("Blog can not delete")
        }
        else {
            navigate("/blogs")
        }
    }
    function handleEdit() {
        setEdit(preEdit => !preEdit);
    }
    function handleChange(e, editor) {
        if (e?.target) {
            const { name, value } = e.target;
            if (name === "title") {
                document.title = value;
            }
            return setInputForm(preInput => ({ ...preInput, [name]: value }));
        }
        return setInputForm(preInput => ({ ...preInput, body: editor.getData() }));
    }
    async function submitEdit(){
        editBlog(`http://localhost:3000/api/blog/edit-blog/${blogId}`,inputForm);
        setEdit(false);
        
    }
    return (

        <div className="blogs__content">
            {blog && (
                <>
                    <div
                        className="confirm__modal"
                        style={modalStatus ? { display: "flex" } : {}}
                    >
                        
                        <div className="confirm__container">
                            <h2>This blog can not restore after remove it</h2>
                            <p>Do you want to remove it ?</p>
                            <div className="confirm__button">
                                <button className="confirm__btn" onClick={handleRemove}>Yes</button>
                                <button className="refuse__btn" onClick={() => setModalStatus(false)}>No</button>
                            </div>
                        </div>
                    </div>
                    <div className="blog__container">
                    {errors && <div className="error">{errors}</div>}
                        <div className="blog__options" style={(author === blog.user.userId) ? { display: "block" } : { display: "none" }}>
                            <div className="btn__edit">
                                {!editable && <button onClick={handleEdit}>Edit Blog</button>}
                                {editable &&
                                    <button
                                        onClick={submitEdit}
                                        style={((inputForm.body === blog.body)
                                            &&
                                            (inputForm.title === blog.title))
                                            ? { backgroundColor: "#ccc" } : {}}
                                        disabled = {((inputForm.body === blog.body)
                                            &&
                                            (inputForm.title === blog.title))}
                                    >
                                        {isLoading ? <img src={pending} alt="" className="pending__fetching" /> : "Save Blog"}
                                    </button>}
                            </div>
                            <div className="btn__remove">
                                <button onClick={() => setModalStatus(true)}>Remove Blog</button>
                            </div>
                        </div>
                        <div className="blog__header">
                            <div className="header__time">
                                <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
                            </div>
                            <div className="header__title">
                                {!editable ?
                                    <h1>{inputForm.title}</h1>
                                    :
                                    <input
                                        type="text"
                                        value={inputForm.title}
                                        name="title"
                                        className="input__change"
                                        onChange={handleChange} />
                                }
                            </div>
                            <div className="header__author">
                                by {blog.user.userName}
                            </div>
                        </div>
                        <div className="blog__body">
                            {editable ?
                                (<CKEditor
                                    editor={ClassicEditor}
                                    name="body"
                                    data={inputForm.body}
                                    onChange={handleChange} />)
                                :
                                (<div className="body__content">
                                    <div dangerouslySetInnerHTML={{ __html: inputForm.body }} />
                                </div>)
                            }
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default BlogDetail;