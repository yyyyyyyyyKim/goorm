const spreadsheetcontainer = document.querySelector("#spreadsheet-container"); //html 12번째줄.
const expBtn = document.querySelector("#exp-btn");//html 10번째줄.
const ROWS = 13;
const COLS = 19;
const spreadsheet = []; //배열생성.
const alphabets = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];


class Cell {    //클래스의 생성자constructor 정의. 인스턴스의 초기 상태 설정. Cell이라는 이름의 클래스 정의(속성들). constructor는 가장 먼저 실행되는거.
    constructor(isHeader, disabled, data, row, col, rowname, colname, active = false){
        this.isHeader = isHeader;   //헤더셀인지아닌지를나타내는 불린값.
        this.disabled = disabled;   //셀이비활성화상태인지를나타내는 불린값.
        this.data = data;   //셀에 저장된 데이터값.
        this.row = row; //셀의 행 인덱스
        this.col = col;   //셀의 열 인덱스
        this.rowname = rowname; //셀의 행 이름 
        this.colname = colname;   //셀의 열 이름
        this.active = active;   //셀이 활성상태인지를나타내는 불린값. 기본값false.
    }
}

initSpreadsheet();

function initSpreadsheet() {    //스프레드시트 셀 초기화.
    for(let i=0; i<ROWS; i++){
        let spreadsheetrow = [];    //const spreadsheet = []; 배열이니까배열로만들어줌.
        for (let j=0; j<COLS; j++){  //각 셀의 데이터,헤더여부,비활성화여부 초기화.
            let cellData = '';
            let isHeader = false;
            let disabled = false;

            if( j===0 ) {   //모든 row 첫 번째 컬럼에 숫자 넣기(열).
                cellData = i;
                isHeader = true;
                disabled = true;
            }
            if( i===0 ) {   //모든 row 첫 번째 컬럼에 알파벳 넣기(행).
                cellData = alphabets[j-1];
                isHeader = true;
                disabled = true;
            }
            if (!cellData) {    // 첫 번째 row의 컬럼은 ''; 셀데이터가 undefined거나 null일경우 빈공간으로.
                cellData = '';
            }

            const rowname = i;
            const colname = alphabets[j-1];
            //cell객체 생성. class cell 정보.
            const cell = new Cell(isHeader, disabled, cellData, i, j, rowname, colname, false);
            spreadsheetrow.push(cell);  //행 배열에 셀 추가. push메소드는 뒤에 추가해주는 것.
        }
        spreadsheet.push(spreadsheetrow);   //위에서 완성된 행 배열을 전체스프레드시트spreadsheet 배열에 추가.
    }
    drawSheet(); //spreadsheet배열의 데이터를 기반으로 HTML 테이블 형식으로 인터페이스에 그림.
    console.log('spreadsheet', spreadsheet)
}   

function createcellEL(cell){    //셀 생성. 셀의요소 만들기.
    const cellEL = document.createElement('input');
    cellEL.className = 'cell';
    cellEL.id = 'cell_' + cell.row + cell.col; //claas와 id의 차이 : class는 중복이 되도 되지만, id는 중복이 되면 안됨.
    cellEL.value = cell.data; //셀에 저장된 데이터를 input요소의 값으로 설정.
    cellEL.disabled = cell.disabled;    //셀의 비활성화 여부.

    if(cell.isHeader){
        cellEL.classList.add('header');
    }

    cellEL.onclick = () => handlecellClick(cell); //cellEl 요소에 클릭 이벤트 리스너를 추가. 이 요소를 클릭할 때마다 handleCellClick 함수가 호출. 화살표 함수 (() => handleCellClick(cell))는 handleCellClick 함수를 콜백으로 사용하며, cell 객체를 인자로 전달.
    cellEL.onchange = (e) => handleonChange(e.target.value, cell); //cellEl 요소에 변경 이벤트 리스너를 추가. cell에 타이핑시 이벤트발생.  e는 이벤트 객체, e.target은 이벤트가 발생한 요소를 참조. e.target.value는 이벤트가 발생한 요소의 현재 값(현재타이핑한값). handleOnChange 함수는 이 값을 첫번째인자, cell객체를 두번째인자로 받아처리. 

    return cellEL;
}

function drawSheet() {  //cell구조 랜더링(drawSheet()함수). 데이터가 다 만들어진 후에 호출이 되야하는 함수.
    for(let i=0; i<spreadsheet.length; i++){
        const rowcontainerEL = document.createElement('div');   //모든 행을 돌면서 div요소 rowContainerEl생성.
        rowcontainerEL.className = 'cell-row';  //rowContainerEl에 cell-row클래스 할당. css

        for(let j=0; j<spreadsheet[i].length; j++){ //행을 돌면서 createCellEl함수 호출해서 각 셀에 해당하는 HTML요소 생성. 
            const cell = spreadsheet[i][j];
            rowcontainerEL.append(createcellEL(cell));  //createCellEl(cell)생성한 요소를 rowContainerEl에 추가추가.
        }
        spreadsheetcontainer.append(rowcontainerEL);    //맨위2번째줄 spreadsheetcontainer에 넣어줌.
    }
}

function handlecellClick(cell){ //셀 클릭시 호출.
    clearHeaderactive();
    const colHeader = spreadsheet[0][cell.col];
    const rowHeader = spreadsheet[cell.row][0];
    const colHeaderEL = getElfromRowCol(colHeader.row, colHeader.col)
    const rowHeaderEL = getElfromRowCol(rowHeader.row, rowHeader.col)
    colHeaderEL.classList.add('active'); //클릭된 헤더에 하이라이트주기 -> css에 .cell.header.active에서 스타일주기.
    rowHeaderEL.classList.add('active'); ////클릭된 헤더에 하이라이트주기
    document.querySelector("#cell-status").innerHTML = cell.colname + cell.rowname; //HTML 11번째 줄. cell-status에 넣어주기. cell-status요소의 내용을 업데이트하여 현재 셀의 위치를 표시.
}

function getElfromRowCol(row, col) {    //getElfromRowCol(행,열)함수는 특정 행,열에해당하는셀요소반환.
    return document.querySelector("#cell_" + row + col);
}

function handleonChange(data, cell){    //셀의 데이터가 변경될 때 호출. 셀 객체에 data속성 업데이트.
    cell.data = data;   //객체데이의 속성에 타이핑한 데이터 넣어줌.
}

function clearHeaderactive() {  //클릭되었던 이전의 헤더 하이라이트 지워주기.
    const headers = document.querySelectorAll('.header');   //.header클래스 가진 요소 선택(.header클래스의 모든헤더셀)

    headers.forEach((header) => {   //foreach루프사용해서. 모든헤더요소에 active클래스 제거.
        header.classList.remove('active');
    })
}

expBtn.addEventListener('click', ()=> {
    let csv = ''; //빈 스트링 값 생성.
    for(let i=0; i<spreadsheet.length; i++){    //엑셀 데이터 생성. 아이템데이터만 리턴(헤더는 아님1234ABCD 이런거). 
        if(i===0) continue; //헤더는 데이터안넣어줄거니까 건너뛰기 위해 이렇게 함.
        csv +=  //for문 돌면서 스트링 추가추가.
            spreadsheet[i]
                .filter(item => !item.isHeader) //헤더가 아닌 아이템만 필터링. filter메소드=새로운배열에 조건에 맞는 객체들만 넣어주는것.
                .map(item => item.data) //필터링된 아이템의 데이터값만 추출.
                .join(',') + "\r\n"; //,로 구분해서 한줄로 조합하고 한줄바꿔서 배열안에 아이템들 조인.
    }

    const csvObj = new Blob([csv]); //위에서 만든 csv데이터 넣어주기. Blob생성자이용. Blob객체는 불변의 데이터를 표현하는데 사용. CSV문자열을 바이너리 데이터로 캡슐화.
    console.log('csvObj', csvObj);  //생성된 Blob객체를 콘솔에서 로깅.

    const csvUrl = URL.createObjectURL(csvObj); //URL.createObjectURL메소드는 Blob객체에 대한 URL생성함. 이 URL이 아래a태그(42번째줄)의 href속성에 사용됨.
    console.log('csvUrl', csvUrl);

    const a = document.createElement("a");  //a태그
     // 현재 시간을 파일 이름에 사용하기 위해 Date 객체를 사용
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().replace(/:/g, ''); // ISO 형식을 사용하고 ":"를 ""로 대체
    a.download = `spreadsheet_${formattedDateTime}.csv`; // 파일 이름 지정(다운로드시 뜨는 이름).
    a.href = csvUrl;    //위에서 생성한 URL을 받아 href로 사용.
    // a.download = 'spreadsheet name.csv'; //다운로드시 뜨는 이름이 spreadsheet name.csv이거.
    a.click();  //click메소드 = 사용자가 직접 클릭하는 것과 동일한 효과, 요소에 연결된 클릭 이벤트 리스너가 활성화.
})