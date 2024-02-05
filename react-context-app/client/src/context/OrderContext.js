import { createContext, useEffect, useMemo, useState } from 'react';

export const OrderContext = createContext();

// export function OrderContextProvider(props) {
//     return <OrderContext.Provider value>
//         {/* App.js의 <App /> 과 같은 부분임 */}
//         {props.children}
//     </OrderContext.Provider>;
// }

// export function OrderContextProvider({children}) {
//     return <OrderContext.Provider value >
//         {/* App.js의 <App /> 과 같은 부분임 */}
//         {children}
//     </OrderContext.Provider>;
// }


export function OrderContextProvider(props) {

    const [orderCounts, setOrderCounts] = useState({
            products: new Map(),
            options: new Map()
    });

    const [totals, setTotals]= useState({
        products: 0,
        options: 0,
        total: 0
    });

    const pricePerItem = {
        products: 1000,
        options: 500
    }
    const calculateSubtotal = (orderType, orderCounts)=>{
        let optionCount = 0;
        for(const count of orderCounts[orderType].values()){
            optionCount += count;
        }
        return optionCount * pricePerItem[orderType];
    }

    useEffect(()=>{
        const productsTotal = calculateSubtotal("products", orderCounts);
        const optionsTotal = calculateSubtotal("options", orderCounts);
        const total = productsTotal + optionsTotal;
        setTotals({
            products: productsTotal,
            options: optionsTotal,
            total
        })
        // orderCounts가 바뀌면 call 해줌
    }, [orderCounts])
    const value = useMemo(()=>{
        // ItemCount 업데이트 함수
        function updateItemCount(itemName, newItemCount, orderType) {
            const newOrderCounts = {...orderCounts};
            // products인지 options인지
            const orderCountsMap = orderCounts[orderType];
            // itemCount 늘때마다 count 값 숫자로 변경해서 map을 set으로 해서 다시 설정
            orderCountsMap.set(itemName, parseInt(newItemCount));

            setOrderCounts(newOrderCounts);
        }
        return [{...orderCounts, totals },updateItemCount]
        // orderCounts와 totals 가 바뀔 때마다 새로 렌더링
    }, [orderCounts, totals])

    return <OrderContext.Provider value={value} {...props} />
}