import { NavLink } from "react-router-dom";
const NavItems = (props) => {
    return (
        //     color: #1cb0f6;
        <div className={props.status || "uft"}>
            <NavLink
                to={(props.url =='user' || props.index === 3)? props.url : props.url}
                className={({isActive})=>(isActive)?"nav__item item__selected":"nav__item"}
                >
                <span className="item">
                    <div className="item__icon">
                        <img src={props.iconImage} alt="home icon" />
                    </div>
                    <span
                        className={"item__name"}
                        onClick={()=>{
                            console.log("hehe");
                        }}
                    >
                        {props.name}
                    </span>
                </span>
            </NavLink>
        </div>
    );
}

export default NavItems;