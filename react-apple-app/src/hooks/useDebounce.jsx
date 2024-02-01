
import { useEffect, useState } from "react"
// import { clearTimeout, setTimeout } from "timers";

export const useDebounce = (value, delay) => {
    const [debounceValue, setDebounceValue] = useState(value);
  
    useEffect(()=>{
        const handler = setTimeout(()=>{
            //타이핑해서 넣는 값을 넣어줌
            setDebounceValue(value);
        }, delay);
        return()=>{
            //setTimeout을 없애주기 위해
            clearTimeout(handler)
        }
        //dependency에 value와 delay를 넣어서 다시 한번 call 해줄 수 있게
    }, [value, delay])

    return debounceValue
}