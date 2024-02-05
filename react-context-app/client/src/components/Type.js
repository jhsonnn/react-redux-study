import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Products from './Products';
import Options from './Options';
import ErrorBanner from './ErrorBanner';

const Type = ({ orderType }) => {

  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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
      <p>총 가격:</p>
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
