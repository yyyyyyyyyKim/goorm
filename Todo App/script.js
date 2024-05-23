const list = document.getElementById("list")
const newTodo = document.getElementById("newTodo") //HTML의id가newTodo인요소를 newTodo라는 변수에 할당. 

let todos = [];


newTodo.addEventListener('click', createNewTodo); //newTodo요소를 클릭했을때 creatNewTodo함수호출

//클릭했을때 새로운 todo 생기는 함수만들기.
function createNewTodo() {
    //4번째 줄 let todos = [여기에]; 들어가는 배열이 const item = {여기에}
    const item = { //item이라는 객체 생성.
        id: new Date().getTime(), //유니크숫자
		text: "",   //빈 문자열 할당.
		complete: false //item객체의 완료상태(처음생성시에는 완료되지않은상태) -> 완료하면 true로 변경.
    }

    //item 배열의 맨 앞에 새로운 아이템 추가(unshift사용)/새로추가하면 맨위에 새로운목록이 뜨게됨.
    todos.unshift(item);

    //요소 생성
    const {itemEL , inputEL, editEL, removeEL} = createTodoElement(item); //위에서 입력된 item객체를 createTodoElement함수에 넣어 HTML요소생성하고 결과를 객체형태로 반환해서 (여기안에요소들)을 추출.

    // 리스트 요소 안에 방금 생성한 아이템 요소 추가/ prepend메서드는 주어진 요소를 가장 앞에 삽입함, list는 HTML의 리스트요소를 참조함.
    list.prepend(itemEL);

    // input에 disabled 속성 제거 -> 입력할 수 있도록 활성화.
    inputEL.removeAttribute('disabled');

    // 리스트 추가 시, input에 focus 되어있도록 설정/ focus메서드는 HTML요소에 포커스를 설정함.
    inputEL.focus();

    // 로컬 스토리지에 데이터 저장
    saveToLocalStorage();
}

function createTodoElement(item) {
    //요소 생성 (html에서 <div class="todo-list" > 생성)
    const itemEL = document.createElement('div'); //div요소 생성
    itemEL.classList.add('todo-list');  //div에 todo-list라는 클래스 추가
    
    const leftEL = document.createElement('div');   //div요소 생성
    leftEL.classList.add('left');   //left라는 클래스 추가

    const checkboxEL = document.createElement('input'); //input요소 생성
    checkboxEL.type = 'checkbox'; //input요소의 타입을 checkbox로 설정
    checkboxEL.checked = item.complete; //체크박스 체크여부 스토리지에 저장되게. 체크면true.


    if (item.complete) {    //item의 complete속성이 true면 아래 실행.
        itemEL.classList.add('complete');   //itemEL(HTML의div요소)에 complete클래스 추가.
    }

    const inputEL = document.createElement('input');    //input요소 생성.
    inputEL.type = 'text';  //input요소는 text타입.
    inputEL.value = item.text;  //item.text을 기본값으로 설정.
    inputEL.setAttribute('disabled', '');   //setAttribute('disabled', '')호출로 입력필드 비활성화.

    const rightEL = document.createElement('div');  //div생성.
    rightEL.classList.add('right'); //div요소에 right클래스 추가

    const editEL = document.createElement('button');    //버튼생성.
    editEL.classList.add('edit' , 'fa-regular' , 'fa-pen-to-square');   //edit클래스와 fontAwesome에 아이콘 라이브러리에 있는 클래스 추가.
    
    const removeEL = document.createElement('button');    //버튼생성.
    removeEL.classList.add('remove' , 'fa-solid' , 'fa-trash');   //remove클래스와 fontAwesome에 아이콘 라이브러리에 있는 클래스 추가.

    //checkbox에 체크 시 complete = true 되도록 설정/ checkboxEL에 change이벤트리스너추가.
    checkboxEL.addEventListener('change', () => {
        item.complete = checkboxEL.checked; //checkboxEL.checked에 따라 아이템의complete속성 업데이트.
        if (item.complete) {
            itemEL.classList.add('complete');    //complete로 itemEL의 클래스를 조정.
        } else {
            itemEL.classList.remove('complete'); 
        }

        saveToLocalStorage(); //체크박스 체크여부 스토리지에 저장되게.
    })
    //input에 작성한 것 저장하기
    inputEL.addEventListener('input', () => {   //input이벤트리스너. inputEL입력필드에 입력할때마다 이벤트발생.
        item.text = inputEL.value;  //입력하면 바로 inputEL.value가 item객체의 text(item.text)로 업데이트됨.

    })

    //input 저장 후 input 클릭 시 수정 막기 설정 - disabled
    inputEL.addEventListener('blur', () => { //blur이벤트리스너. inputEL입력필드에서 포커스를 잃었을 때(다른요소를 클릭 or 입력필드 외부로이동시)발생.
        inputEL.setAttribute('disabled', '')

        saveToLocalStorage(); //블러할 때도 스토리지에 저장되게.
    })

    //edit 버튼 클릭 시 focus 되도록 설정
    editEL.addEventListener('click', () =>{ //클릭이벤트리스너.
        inputEL.removeAttribute('disabled'); //수정가능하게 비활성화(disabled)해제.
        inputEL.focus();    //입력필드에 포커스.
    })

    //remove 버튼 클릭 시 todo-list 제거
    removeEL.addEventListener('click', () =>{
        todos = todos.filter(t => t.id !== item.id); //데이터 제거
        itemEL.remove();    //DOM에서 할 일 요소 제거. 페이지에서 사라지게됨.

        saveToLocalStorage(); //원래 있던거 제거 할때 스토리지에서도 지워지게.
    })

    leftEL.append(checkboxEL);
    leftEL.append(inputEL);

    rightEL.append(editEL);
    rightEL.append(removeEL);

    itemEL.append(leftEL);
    itemEL.append(rightEL);

    return {itemEL, inputEL, editEL, removeEL} //생성된 HTML요소를 객체로 반환.
}



function saveToLocalStorage(){
    const data = JSON.stringify(todos); //todos배열을 JSON형식의 문자열string으로 변환.
    //window.localStorage.setItem("our_todos", data) 윈도우 객체 안에 로컬 스토리지를 넣으려면. setItem('키',밸류);
    localStorage.setItem("our_todos", data); //window 객체는 생략가능 //변환된문자열data를 로컬스토리지의 our_todos라는 키 아래에 저장.
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("our_todos"); // 로컬스토리지에 저장된 데이터 가져오기. 키는 our_todos

	if (data) {
		todos = JSON.parse(data); // 저장된 스트링(문자열) 데이터를 JSON으로 파싱하여 자바스크립트 배열로 변환.
	} 
}

function displayTodos() {
	loadFromLocalStorage(); //로컬 스토리지에서 데이터 불러오기.

	for (let i = 0; i < todos.length; i++) {
		const item = todos[i];  //각 할 일 아이템을 순회.

		const { itemEL } = createTodoElement(item); //이거였음....망할!!!!!!!!!!!! // 각 아이템에 대한 HTML요소 생성.

		list.append(itemEL);    //생성된 요소 리스트에 추가. 반환된 itemEL를 list라는 DOM요소에 추가. append메소드는 ()요소를 리스트끝에 추가해줌.
	}
}

displayTodos(); //이함수를 호출해서 할 일 목록에 화면 표시.
