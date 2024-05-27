class Github { //github에 api요청 관련된 것이 github.js에 들어있음.
    constructor() { //constructor() 생성자 이 클래스를 이용해서 인스턴스 객체를 만들 때 가장 먼저 실행되는 부분(주로 필드들을 많이 정의) const github = new Github(); 라고 했을 때 가장 먼저 실행되는 부분 = constructor()
      this.client_id = 'e932ba1d163e2d200af4'; //github API에 요청해서 데이터 가져오는 거니까 할당량 정해져 있음. github쪽에서 그걸 체크하기 위해 key와 secret사용.
      this.client_secret = '0e1ae9f3a7ec4b8dbdf6ab4108dd7af75030dfbb'; //github가서 생성. 일단 강의나오는거 사용.
      this.repos_count = 5; //저장소 데이터에 repos 몇 개를 한번에 달라고 할 건가. 5개.
      this.repos_sort = 'created:asc'; //데이터를 가져올 때 생성순(오름차순)으로 가져와라.
    }

    //유저정보가져오는 메소드 만들기(비동기요청:병렬으로,하나처리하면서다른것도처리-fetch라는메소드사용(브라우저도움,자바스크립트만으로는안됨),await사용)
    async getUser(user) { //async함수 자바스크립트에서 비동기요청을 위해 사용. await는 async함수 내에서만 사용가능. 결과 값 나올때까지 코드의 실행을 기다리게 하는것.
        //user저장소
        const profileResponse =
          await fetch(
            //요청을보내는경로(아래주소), 메소드호출시 인수로 user 사용, 3번째줄 client_id사용, 4번째줄 client_secret사용. 이건github이 약속해놓은거를 따라한거임.
            `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
          );
    
        //user의 저장소에있는 repo요청
        const repoResponse =
          await fetch(
            `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
          );
        
        //위에서 받은 데이터 변환. 비동기로 하니까 await.
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
    
        return { //타이핑할때 호출
          profile,
          repos
        }
      }
    }
