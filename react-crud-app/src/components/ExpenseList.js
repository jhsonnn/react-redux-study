import React, { Component } from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'


const ExpenseList = ({initialExpenses, handleDelete, handleEdit}) => {
  return (
    <div>
      <>
        <ul className='list'>
            {initialExpenses.map(expense=>{
              return(
                <ExpenseItem key={expense.id} expense={expense} 
                  handleDelete={handleDelete} handleEdit={handleEdit}
                />
              )
            })}
        </ul>
        <button className='btn'>
            목록 지우기
        </button>
      </>
    </div>
  )
}

export default ExpenseList