import React from 'react'
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';


    const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems}) => {
  return (
    <>
      <ul className='list'>
         {/* 여기에 Expense Item이 하나씩쌓임, ul태그안에 li태그*/}
        {
            // 순회하면서 하나하나 ExpenseItem에 넣어줌
            expenses.map(expense => {
                return (
                <ExpenseItem 
                key={expense.id} //유니크한값주기. key무조건 필요.
                expense={expense}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                />
                )
            })
        }   
      </ul>
      {(
                <button className='btn' onClick={clearItems}>
                    목록 지우기
                </button>
      )}
    </>
  );
}

export default ExpenseList