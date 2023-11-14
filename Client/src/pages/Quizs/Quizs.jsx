import "../../assets/css/quizs.css"
import QuizProgress from "../../components/Progress/QuizProgress";
import QuizLevel from "../Quizs/QuizLevels";
const Quizs = () => {
    return (
        <div className="main__concept">
            <div className="quizs__home flex__row">
                <QuizLevel></QuizLevel>
                <QuizProgress></QuizProgress>
            </div>
        </div>
    );
}

export default Quizs;