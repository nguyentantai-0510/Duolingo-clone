import "../../assets/css/quizProgress.css";

const ProgressResult = () => {
    return (
        <div>
            <h3>Your daily result</h3>
            <div className="progress__goal flex__row">
                <div className="chest__image"></div>
                <div className="progress__target flex__column">
                    <p className="progress__title">Daily Target</p>
                    <div className="progress__bar flex__row">
                        <div className="target__bar"></div>
                        <div className="target__completed">0/10 KN</div>
                    </div>
                </div>
            </div>
            <div className="progress__dashboard">

            </div>
        </div>
    );
}

export default ProgressResult;