import React, { useState } from 'react'

const SummaryPage = () => {
  const [checked, setChecked ]= useState(false);

  return (
    <div>
      <form>
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
