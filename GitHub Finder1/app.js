//app.js는 만든 것들을 사용하기 위한 것. 전체적인 것들.
const github = new Github();
const ui = new UI();

//타이핑하는 부분. HTML 23번째 줄 id = searchUser
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => { //searchUser에 타이핑시 이벤트 발생.
    const userText = e.target.value;    //타이핑한 값이 e.target.value에 들어있음.

    //if text가 있을때만.
    if(userText !== ''){
        //9번째줄 타이핑한값 userText로 github.js에 10번쨰 줄 getUser 호출.
        github.getUser(userText)
            .then(data => { //14번째줄로 요청해서 리턴된 데이터를 받아온 다음에...
                if(data.profile.message === 'Not Found'){
                    ui.clearProfile();  //원래있던거지우고.
                    //data가 없으면  User not found라고 알려주기.
                    ui.showAlert('User not found', 'alert alert-danger');
                }else{
                    //ui.js에 8번째줄 showProfile호출
                    ui.showProfile(data.profile); 
                    ui.showRepos(data.repos);
                }
            })
    }else{//text없으면 떠있던 프로필지우기.
        ui.clearProfile();
    }

})