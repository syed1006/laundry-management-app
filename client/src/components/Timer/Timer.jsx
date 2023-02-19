import { useEffect, useRef, useState } from "react"

const Timer = ({setDisable, deadLine})=>{
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const interval = useRef();

    let time = deadLine;

    const getTime = ()=>{
        time--;
        if(time >= 0){
            setMin(Math.floor((time  / 60) % 60 ));
            setSec(Math.floor((time) % 60 ));
        }
        else{
            setDisable(false);
            clearInterval(interval.current)
        }
    }

    useEffect(()=>{
        interval.current = setInterval(()=>getTime(), 1000);
        return ()=> clearInterval(interval.current);
        // eslint-disable-next-line
    }, []);
    return(
        <span className="timer">{`${min<10 ? '0'+min: min} : ${sec<10 ? '0'+sec: sec}`}</span>
    )
}

export default Timer;