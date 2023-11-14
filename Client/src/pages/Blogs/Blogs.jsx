import "../../assets/css/blogs.css";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../context/authReducer/authContext";
import { formatDistanceToNow } from 'date-fns'
import { useSelector } from "react-redux";

const Blogs = (props) => {
    const [blogs, setBlogs] = useState(null);
    const state  = useSelector(state => state.auth);
    const { token } = state.user;
    useEffect(() => {
        fetch("http://localhost:3000/api/blog/get-blogs", {
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, []);
    return (
        <div className="blogs__content">
            <Link to="/blogs/create">
                <div className="blog__create">
                    <button>Add Blogs</button>
                </div>
            </Link>
            <div className="blogs__feed">
                {blogs && blogs.blogs.map(blog => (
                    <article key={blog._id}>
                        <Link to={`/blogs/blog/${blog._id}`}>
                            <div className="blog__content">
                                <div className="blog__timepost">
                                    <span>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</span>
                                </div>
                                <h2 className="blog__title">
                                    {blog.title}
                                </h2>
                                <div className="blog__author">
                                    <span>by {blog.user.userName}</span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Blogs;