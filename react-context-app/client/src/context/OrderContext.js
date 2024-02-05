import { createContext, useMemo, useState } from 'react';

const OrderContext = createContext();

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

    const value = useMemo(()=>{
        return [{...orderCounts }]
    }, [orderCounts])

    return <OrderContext.Provider value={value} {...props} />
}