import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState } from "react";

//변수 => 랜더링 => 초기화
//state => 페이지 새로고침 => 초기화
//uesRef => ref.current => 랜더링 => 초기화안됨!

function App() {
  //useState사용
  const [expenses, setExpenses] = useState([
    { id: 1, charge: "렌트비", amount: 2000 },
    { id: 2, charge: "교통비", amount: 400 },
    { id: 3, charge: "식비", amount: 1200 },
  ]);

  // // 배열로생성
  // const initialExpenses = [
  //   { id: 1, charge: "렌트비", amount: 2000 },
  //   { id: 2, charge: "교통비", amount: 400 },
  //   { id: 3, charge: "식비", amount: 1200 },
  // ]

  //useState사용 [초기값, 초기값을업데이트하는함수]
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [edit, setEdit] = useState(false); //edit버튼클릭시 true가됨.
  const [id, setId] = useState("");

  //지출항목, 비용에 값이 입력되게 하기. ExpenseForm에 추가.
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  //비용은 string이 아니고 숫자를 받는거기 때문에 valueAsNumber이렇게.
  const handleAmount = (e) => {
    setAmount(e.target.valueAsNumber);
  };

  const handleDelete = (id) => {
    //expense에서 하나의 객체를 가져와서 순회하면서 id가 다른것만 넣어주는것(id가같은거만빼고).
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    console.log(newExpenses);
    setExpenses(newExpenses);
    // handleAlert({ type: 'danger', text: '아이템이 삭제되었습니다.' })
  };

  //이벤트 발생시 e객체 받아오고.
  const handleSubmit = (e) => {
    e.preventDefault(); //submit누르면 리프레시되면서 스테이트가 초기화 되니까. 그걸 막아주기위해사용.
    if (charge !== "" && amount > 0) {
      //뭔가입력되고 금액도 뭔가 들어가있을때만 추가해주기.
      if (edit) {
        const newExpenses = expenses.map((item) => {
          //expenses가져와서 map(불변성지켜줌)으로 순회.전체배열에서 객체를 가져와(중괄호없으면리턴안해도됨)
          return item.id === id //현재클릭한(edit) id와 같은 id면 원래있던것들을 수정된 { ...item, charge, amount } 값으로 변경.
            ? { ...item, charge, amount }
            : item; //아니면 그냥 둠. 그냥 item반환.
        });

        setExpenses(newExpenses); //위const newExpenses에서 리턴받은 값을 setExpenses에 넣어줌.
        setEdit(false); //수정됐으니까 true에서 false로 다시 바꿔줌.
      } else {
        const newExpense = { id: crypto.randomUUID(), charge, amount }; //crypto.randomUUID()유니크한값주기위해사용.
        // 불변성을 지켜주기 위해서 새로운 expenses를 생성.
        const newExpenses = [...expenses, newExpense];
        setExpenses(newExpenses);
      }
      setCharge("");
      setAmount(0);
    } else {
      console.log("error");
    }
  };

  const handleEdit = (id) => {
    //edit눌렀을때 수정될애가 위로 올라가고, 제출버튼이 바뀌고, 수정되게하는 함수.
    const expense = expenses.find((item) => item.id === id); //find메소드로 id가 같은 객체데이터 리턴.
    const { charge, amount } = expense; //위에서 받은 id값에 있는expense데이터를 charge, amount에 넣어주기.
    setCharge(charge); //charge값을 setCharge에 넣어주고.
    setAmount(amount); //amount값을 setAmount에 넣어주고.
    setEdit(true); //true로 바꿔줌.
    setId(id); //수정하고 있는 객체의 id.
  };

  const clearItems = () => {
    setExpenses([]);
  };

  return (
    <main className="main-container">
      <h1>예산 계산기</h1>

      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseForm
          handleCharge={handleCharge}
          charge={charge}
          handleAmount={handleAmount}
          amount={amount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
      </div>
      <div style={{ width: "100%", backgroundColor: "white", padding: "1rem" }}>
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          initialExpenses={expenses}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "end", marginTop: "1rem" }}
      >
        <p>
          총지출 :
          <span>
            {/* //더하거나 누적할때 사용하는 메소드 = reduce, acc에 누적이 되는것. 
            expenses배열 순회하면서 curr.amount값을 더해서 totalExpenses에저장. */}
            {expenses.reduce((acc, curr) => {
              return (acc += curr.amount);
            }, 0)}
            원{/* 처음값은 0으로 시작. */}
          </span>
        </p>
      </div>
    </main>
  );
}

export default App;
