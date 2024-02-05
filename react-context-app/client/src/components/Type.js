import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import ErrorBanner from './ErrorBanner';
// {} ; default로 export해준게 아니기 때문에
import {OrderContext} from '../context/OrderContext';

const Type = ({ orderType }) => {

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderData, updateItemCount] = useContext(OrderContext);
  // console.log('orderData', orderData.totals)

  useEffect(()=>{
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async(orderType) =>{
    try{
      const response = await axios.get(`http://localhost:4000/${orderType}`)
      setItems(response.data);
    }catch(error){
      setError(true);
    }
  }

  const ItemComponent = orderType === "products" ? Products : Options
  
  const optionItems = items.map((item) => {
    return(
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        updateItemCount={(itemName, newItemCount)=>updateItemCount(itemName, newItemCount, orderType)}
      />
    )
  })
  console.log(items)
  if(error){
    return (<ErrorBanner message="에러가 발생했습니다."/>

    )
  }
  //console.log('orderType', orderType);
  return (
    <div>
      <h2>주문 종료</h2>
      <p>하나의 가격</p>
      <p>총 가격: {orderData.totals[orderType]}</p>
      <div
        style={{
            display: 'flex',
            flexDirection: orderType === "options" ? "column":"row"
        }}
      >
          {optionItems}
      </div>
    </div>
  )
}

export default Type
