import { useEffect } from "react";
import { Link } from "react-router-dom";
const Levels = ({ index, other, hasDone }) => {
    useEffect(() => {
        const levels = document.querySelectorAll(`.level-${index}`);
        levels.forEach((level, index) => {
            switch (true) {
                case index % 4 === 0:
                    level.style.transform = "translateX(0)";
                    break;
                case index % 2 !== 0 && index < 5:
                    level.style.transform = "translateX(-44px)";
                    break;
                case index % 2 === 0 && index < 5:
                    level.style.transform = "translateX(-70px)";
                    break;
                case index % 2 !== 0 && index >= 5:
                    level.style.transform = "translateX(44px)";
                    break;
                case index % 2 === 0 && index > 5:
                    level.style.transform = "translateX(70px)";
                    break;
                default:
                    level.style.transform = "translateX(0)";
                    break;
            }
        })
        return () => {
        }
    }, [])
    // console.log(other._id);
    return (
        <div className="levels flex__column align-item__center" >
            <div className={`level-${index} question__first`}>
                <div className="level__btn">
                    <Link to={`/learn/unit/`} state={{ questions: other.questions, levelId:other._id }} >
                        {hasDone ? (
                            <button className="hasdone">
                                {index}
                            </button>
                        ) : (
                            <button className = "disabled">
                                {index}
                            </button>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Levels;