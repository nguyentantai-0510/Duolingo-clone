import "../../assets/css/questions.css"
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import speaker from "../../assets/imgs/speaker.png"
import useLevelsUser from "../../hooks/useLevelsUser";
import microphone from "../../assets/imgs/microphone.png"

const Questions = () => {
    const { state } = useLocation();
    const { addUser } = useLevelsUser();
    const { questions: data, levelId } = state;
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [inCorrectAnswer, setInCorrectAnswer] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isOn, setIsOn] = useState(false);
    const [status, setStatus] = useState({
        selected: null,
        answer: null,
        message: null,
        percent: 0
    });
    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            fetch(`http://localhost:3000/api/questions/${data[i]}
            `)
                .then(res => res.json())
                .then(data => {
                    setQuestions(preQuestion => [...preQuestion, data]);
                });
        }
    }, []);

    function handleSubmit() {
        const { answer } = status;
        if (answer === true) {
            setIsCorrect(true);
            setStatus(preStatus => ({ ...preStatus, message: "Excellent", percent: preStatus.percent + (100 / 9) }));
        }
        else {
            setIsCorrect(false);
            setStatus(preStatus => ({ ...preStatus, message: "Gordon Ramsay famous insults" }));
            setInCorrectAnswer(preIncorrect => ([...preIncorrect, questions[currentQuestion]]));
        }
    }
    function handleSelect(index, answer) {
        setStatus(preStatus => ({
            ...preStatus,
            selected: index,
            answer: answer
        }));
    }
    function handleTexttoSpeech(text) {
        let voices = window.speechSynthesis.getVoices();
        const msg = new SpeechSynthesisUtterance();
        msg.voice = voices[1];
        msg.text = text;
        window.speechSynthesis.speak(msg);
    }
    function handleSpeechtoText(answer){
        let speech = true;
        let check = ""
        window.SpeechRecognition = window.webkitSpeechRecognition;
        var recognition = new SpeechRecognition();
        recognition.lang = 'en-US'
        recognition.interimResults = true;
        recognition.addEventListener('result', function(e){
            const transcript = Array.from(e.results).map((result)=>result[0]).map((result)=> result.transcript);
            check = transcript[0];
            setIsOn(true);
        })
        if(speech){
            recognition.start();
        }
        recognition.addEventListener('end',function(e){
            setIsOn(false);
            if(check.toLocaleUpperCase() === answer.toLocaleUpperCase()){
                setIsCorrect(true);
                setStatus(preStatus => ({ ...preStatus, message: "Excellent", percent: preStatus.percent + (100 / 9) }));
            }
        })
    }
    function handleContinue() {
        setStatus(preCurrent => ({
            ...preCurrent,
            selected: null,
            answer: null,
            message: null,
        }))
        setIsCorrect(null);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(preCurrent => preCurrent + 1);
        }
        else {
            if (inCorrectAnswer.length !== 0) {
                setCurrentQuestion(0);
                setQuestions(inCorrectAnswer);
                setInCorrectAnswer([]);
            }
            else {
                addUser(levelId);
            }
        }
    }
    return (
        < div className="questions" >
            {!(questions[currentQuestion]) && <h1>Chưa có câu  hỏi nào trong đây cả.</h1>}
            {(questions[currentQuestion]) && (
                <div className="questions__container">
                    <div className="questions__header flex align-item__center">
                        <Link to="/">
                            <button className="exit__btn">X</button>
                        </Link>
                        <div className="status__bar">
                            <div className="status__bar__state" style={{ width: `${status.percent}%` }}></div>
                        </div>
                    </div>
                    <div className="questions__body">
                        <div className="questions flex__column align-item__center">
                            <div className="question__title">
                                <h1>
                                    {questions[currentQuestion].type.type_name === "Listenning" ?
                                        (<img src={speaker} alt="" onClick={() => handleTexttoSpeech(questions[currentQuestion].question)} />)
                                        :
                                        questions[currentQuestion].type.type_name === "Speaking" ?
                                        (<img src={microphone} alt="" onClick={()=>handleSpeechtoText(
                                            questions[currentQuestion].options[0].option
                                        )} style={isOn?{opacity:"0.5"}:{opacity:"1"}}/>)
                                        :
                                        (<span>{questions[currentQuestion].question}</span>)}
                                </h1>
                            </div>
                            <div className="question__options ">
                                {questions[currentQuestion] && questions[currentQuestion].options.map((option, index) =>
                                (<div
                                    className={status.selected === index ? "option option__btn selected" : "option option__btn"}
                                    key={option._id}
                                    onClick={() => handleSelect(index, option.result)}
                                >
                                    <span>{option.option}</span>
                                </div>)
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="questions__footer"
                        style={
                            isCorrect === !true ? { backgroundColor: "#ef0f0f5c" } : isCorrect === true ? { backgroundColor: "#39eb075c" } : {}
                        }>
                        <div className="question__result">
                            <span className={isCorrect ? "correct" : "incorrect"}>{status.message}</span>
                        </div>
                        <div className="questions__check">
                            <button
                                onClick={handleSubmit}
                                disabled={(status.selected === null) ? true : false}
                                style={isCorrect === null ? { display: "block" } : { display: "none" }}
                            >Submit</button>
                            <button
                                onClick={handleContinue}
                                style={isCorrect !== null ? { display: "block" } : { display: "none" }}
                            >Continue</button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Questions;