// import { hasFormSubmit} from '@testing-library/user-event/dist/utils'
import React from 'react'
import './ExpenseForm.css'


const ExpenseForm = ({charge, amount, handleCharge, handleAmount, handleSubmit, edit}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
            {/* /*input의 id를 htmlFor값으로 넣어주면 라벨이 인풋거라는 걸 인식할 수 있음. */ }
            <label htmlFor="charge">
              지출항목
            </label> 
          
          <input
            type="text"
            id="charge"
            name="charge"
            placeholder="예> 렌트비"
            value={charge} // 지출항목에 입력되는 값
            onChange={handleCharge}
          />
        </div>
        <div className='form-group'>
          {<label htmlFor="amount">비용</label>}
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="예> 100"
            value={amount} //비용에 입력되는 값
            onChange={handleAmount}
          />
        </div>
        {/* 리스트생성되는버튼, 타입을submit으로 해줘서 버튼을 눌렀을때 6번째줄form에 onSubmit={handleSubmit}함수호출 */}
        <button type="submit">
            {edit ? "수정" : "제출"}
        </button>
      </div>
    </form>
  );
}

export default ExpenseForm