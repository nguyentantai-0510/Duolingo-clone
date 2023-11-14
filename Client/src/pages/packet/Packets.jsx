import Packet from "./Packet";
import pending from "../../assets/imgs/pending.gif";
import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../../context/authReducer/authContext";
import { useSelector } from "react-redux";
const Packets = (props) => {
    const state = useSelector(state => state.auth);
    const {token} = state.user;
    const [packets, setPackets] = useState(null);
    const [isPending, setPending] = useState(true);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/api/packages/getLevels", {
            headers: {"Authorization": `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setPending(false);
                setPackets(data);
                setUserId(data.user._id);
            })
        return function clean() {

        }
    }, []);
    return (
        <div className="levels">
            {isPending &&
                <h4 className="levels__pending">Please wait
                    <img src={pending} alt="" className="pending__img" />
                </h4>}
            {packets && (
                packets.data.map((packet, index) => (<Packet key={packet._id} {...packet} index={index} _id = {userId}/>))
            )}
        </div>
    );
}

export default Packets;