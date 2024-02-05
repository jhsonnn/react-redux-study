import React, { useContext, useState } from 'react'
import { OrderContext } from '../../context/OrderContext';

const SummaryPage = ({setStep}) => {
  const [checked, setChecked ]= useState(false);
  const [orderDetails] = useContext(OrderContext);

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value])=>(
    <li key={key}>
      {value} {key}
    </li>
  ))
  //orderDetails.options가 있으면 hasOptions 
  const hasOptions = orderDetails.options.size>0;
  let optionDisplay = null;

  if(hasOptions){
    //key 부분만 배열로 가져옴
    const optionsArray = Array.from(orderDetails.options.keys());
    const optionList = optionsArray.map((key)=> <li key={key}>{key}</li>)
    optionDisplay = (
      <>
      <h2>옵션: {orderDetails.totals.options}</h2>
      <ul>{optionList}</ul>
      </>
    )
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    setStep(2);
  }

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      <ul>
        {productList}
      </ul>

      {optionDisplay}

      <form onSubmit={handleSubmit}> 
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          // 클릭할 때마다 input 변경
          onChange={(e)=> setChecked(e.target.checked)}
        />{" "}
        <label htmlFor='confirm-checkbox'>
          주문하려는 것을 확인하셨나요?
        </label>
        <br />
        {/* checkbox 클릭했을 때만 버튼이 활성화 */}
        <button disabled={!checked} type="submit">
          주문 확인
        </button>
      </form>
    </div>
  )
}

export default SummaryPage
