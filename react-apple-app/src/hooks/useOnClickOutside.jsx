import { useEffect } from "react";


export default function useOnClickOutside(ref, handler){
    useEffect(()=>{
        const listener = (event) => {
            //바깥인지 아닌지 구분
            //아무것도 할당x || 할당되어있는데 현재 클릭하고 있는 부분이 ref.current 안인지
            if(!ref.current || ref.current.contains(event.target)){
                return;
            }
            //바깥이라면 핸들러 함수 호출
            handler();
        }
        document.addEventListener('mousedown', listener);

        return() =>{
            document.removeEventListener('mousedown', listener);
        }
    }, [ref, handler])
}