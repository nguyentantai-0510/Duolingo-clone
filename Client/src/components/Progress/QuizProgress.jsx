import "../../assets/css/quizProgress.css"
import ProgressResult from "./ProgressResult";
const QuizProgress = () => {
    return (
        <div className="quiz__progress flex ">
            <div className="progress__status flex flex__column">
                <div className="status__options flex">
                    <div className="status flex">
                        <div className="status__icon">
                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png" alt="English Flag" />
                        </div>
                        <span className="status__name">
                            English
                        </span>
                    </div>
                    <div className="status flex">
                        <div className="status__icon">
                            <img src="https://d35aaqx5ub95lt.cloudfront.net/images/icons/ba95e6081679d9d7e8c132da5cfce1ec.svg" alt="Streak" />
                        </div>
                        <span className="status__name">
                            0
                        </span>
                    </div>
                </div>
                <div className="progress__result">
                    <ProgressResult></ProgressResult>
                </div>
            </div>
        </div>
    );
}

export default QuizProgress;