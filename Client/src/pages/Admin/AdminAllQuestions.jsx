import "../../assets/css/blogs.css";
import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../context/authReducer/authContext";
import { useSelector } from "react-redux";
const AdminAllQuestions = (props) => {
    const [questions, setQuestions] = useState(null);
    const [preQuestions, setPreQuestions] = useState(null);
    const [inputFind, setInput] = useState("");
    const  state  = useSelector(state => state.auth);
    const { admin } = state;
    useEffect(() => {
        fetch("http://localhost:3000/api/questions/", {
            headers: { "Authorization": `Bearer ${admin}` }
        })
            .then(res => res.json())
            .then(data => {
                setQuestions(data)
                setPreQuestions(data);
            });
    }, []);
    async function handleRemove(id) {
        let newQuestion = questions.filter(question => question._id !== id);
        let res = await fetch("http://localhost:3000/api/questions/remove", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${admin}`,
                "content-type": "application/json"
            },
            body: JSON.stringify({ questionId: id })
        })
        let json = await res.json();
        console.log(json);
        setQuestions(newQuestion);
        setPreQuestions(newQuestion);
    }
    function handleChange(e){
        const input = e.target.value;
        setInput(input);
        const newQuestions = questions.filter(question => question.question.includes(input));
        if(newQuestions.length > 0)
        setQuestions(newQuestions);
        else{
            console.log(preQuestions);
            setQuestions(preQuestions);
        }
    }
    return (
        <div className="blogs__content">
            <div className="mb-12">
                <input type="text" placeholder="Find question..." className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={inputFind} onInput={handleChange}/>
            </div>
            <div className="blogs__feed">
                {questions && questions.map((blog) => (
                    <article key={blog._id} className="relative">
                        <div className="absolute right-3 top-0">
                            <button className="font-semibold  text-xl"
                                onClick={() => handleRemove(blog._id)}>X</button>
                        </div>
                        <div className="blog__content">
                            <h2 className="blog__title">
                                {blog.question}
                            </h2>
                            <div className="blog__author">
                                <span>by {blog.type}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default AdminAllQuestions;