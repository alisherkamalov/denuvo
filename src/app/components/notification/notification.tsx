import React from "react";
import "./styles.css"
import { useSelector, useDispatch } from "react-redux";
import { RootState, setActive } from "@/app/store";
interface NotificationProps {
    notification: string
}

const Notification: React.FC<NotificationProps> = ({notification}) => {
    const activeId = useSelector((state: RootState) => state.active.activeId);
    const dispatch = useDispatch();
    return(
        <div  className={`notification transition-all absolute top-5 ml-auto mr-auto max-w-[90%] p-2 pl-3 pr-3 flex justify-center text-center items-center rounded-4xl border border-[#8aa9d6] ${activeId === "notification" ? "active" : ""}`}>
            <div className="spinlogo"></div>
            {notification}
        </div>
    )
}

export default Notification;