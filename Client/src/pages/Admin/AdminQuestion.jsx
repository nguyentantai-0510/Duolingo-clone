import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import useUpdateLevel from "../../hooks/useUpdateLevel";
import { useSelector } from "react-redux";
const AdminQuestions = () => {
    // const { state } = useAuthContext();
    const {errors, isLoading, submitChange} = useUpdateLevel();
    const {admin} = useSelector(state => state.auth);
    const [apiData, setApiData] = useState({
        types: null,
        questions: null,
        levels: null
    });
    const [options, setOptions] = useState({
        type: "0",
        questions: "0",
        levels: "0",
        answer: "1",
        question: ""
    });
    const [questionOption, setQuestionOptions] = useState({
        "1": null,
        "2": null,
        "3": null,
        "4": null,
    });
    useEffect(() => {
        fetch("http://localhost:3000/api/packages/set-up", {
            headers: { "Authorization": `Bearer ${admin}` }
        })
            .then(res => res.json())
            .then(json => {
                setApiData(json);
            })
    }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setOptions(preOptions => ({ ...preOptions, [name]: value }));
        console.log(options.questions);
    }
    function handleChangeOption(e) {
        const { name, value } = e.target;
        setQuestionOptions(preOption => ({ ...preOption, [name]: value }))
    }
    function clearSelection(){
        setOptions({
            type: "0",
            questions: "0",
            levels: "0",
            answer: "1",
            question: ""
        });
        setQuestionOptions({
            "1": null,
            "2": null,
            "3": null,
            "4": null,
        })
    }
    function handleSubmit() {
        if (options.questions !== "0") {
            submitChange(options.questions, options.levels, null, null, null);
        }
        else {
            const optionsReuslt = [];
            for (let i = 1; i < 5; i++) {
                if (options.answer == i) {
                    optionsReuslt.push({ option: questionOption[options.answer], result: true });
                }
                else {
                    optionsReuslt.push({ option: questionOption[i], result: false });
                }
            }
            submitChange(null, options.levels,optionsReuslt, options.question, options.type);
        }
        clearSelection();
    }
    return (
        <div>
            {(apiData.types || apiData.questions) && (
                <>
                    <h1 className="text-center text-4xl font-bold">Admin Questions</h1>
                    {errors && <div className="error">{errors}</div>}
                    {isLoading && <div className="bg-blue-500 text-white font-bold px-10 rounded-md ">Level has been updated</div>}
                    <div className="mt-8 ml-8">
                        <div className="my-2">
                            <span>Question: </span>
                            <select name="questions" className="border-solid border-gray-400 border px-1 py-1
                        w-1/4 focus:outline-none ml-3" value={options.questions} onChange={handleChange}>
                                <option value="0">Custom question</option>
                                {apiData.questions.map(question => (
                                    <option value={question._id} key={question._id}>{question._id} - </option>
                                ))}
                            </select>
                        </div>
                        {options.questions === "0" &&
                            (
                                <>
                                    <div className="my-2">
                                        <span>Type of question: </span>
                                        <select name="type" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={options.type} onChange={handleChange}>
                                            <option value="0">Select question type</option>
                                            {apiData.types.map(type => (
                                                <option value={type._id} key={type._id}>{type.type_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-10" style={options.type != 0 ? { display: "block" } : { display: "none" }}>
                                        <h3 className="font-bold">Custom Question: </h3>
                                        <span>Question:</span> <input type="text" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3"
                                            name="question"
                                            value={options.question}
                                            onInput={handleChange}
                                        />
                                        <div className="mt-4">
                                            Option 1:
                                            <input type="text" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={questionOption.option1} onInput={handleChangeOption} name="1" />
                                        </div>
                                        <div className="mt-4">
                                            Option 2:
                                            <input type="text" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={questionOption.option2} onInput={handleChangeOption} name="2" />
                                        </div>
                                        <div className="mt-4">
                                            Option 3:
                                            <input type="text" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={questionOption.option3} onInput={handleChangeOption} name="3" />
                                        </div>
                                        <div className="mt-4">
                                            Option 4:
                                            <input type="text" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={questionOption.option4} onInput={handleChangeOption} name="4" />
                                        </div>
                                        <div className="mt-4">
                                            Answer:
                                            <select name="answer" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" onChange={handleChange} value={options.answer}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="mt-5" style={(options.questions ==0) && !(questionOption["1"] && questionOption["2"] && questionOption["3"] && questionOption["4"]) ?{display:"none"}:{} }>
                            <h3 className="font-bold">Add to level: </h3>
                            <select name="levels" className="border-solid border-gray-400 border px-1 py-1 w-1/4 focus:outline-none ml-3" value={options.levels} onChange={handleChange}>
                                <option value="0">Select Level</option>
                                {apiData.levels.map(level => (
                                    <option value={level._id} key={level._id}>Level: {level._id}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-5">
                            <div className="text-center">
                                <button
                                    className="bg-blue-500 text-white font-bold px-10 rounded-md "
                                    onClick={handleSubmit}
                                    style={options.levels==0?{background:"#ccc"}:{}}
                                    disabled ={options.levels==0}
                                >Submit</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default AdminQuestions;