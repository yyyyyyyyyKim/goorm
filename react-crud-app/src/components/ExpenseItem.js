import React from 'react'
import './ExpenseItem.css'

const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
  return (
    <li className='item'>
        <div className='info'>
            <span>{expense.charge}</span>
            <span>{expense.amount}원</span>
        </div>
        {/* 클릭했을때 수정,삭제하는 함수 호출(App.js에 함수호출) */}
        <button className='edit-btn'
                    onClick={() => handleEdit(expense.id)}
        >
            수정
        </button>
        <button className='clear-btn'
                    onClick={() => handleDelete(expense.id)}
        >
            삭제
        </button>
    </li>
  )
}

export default ExpenseItem