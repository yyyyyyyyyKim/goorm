//ui.js는 HTML(index.html)에서  26번째줄 <div id="profile">에 들어가는 것.
//메소드를 덩어리 하나로 처리하기보단 하나하나 나눠서 처리해주는게 좋음.
class UI {
    constructor(){
        this.profile = document.getElementById('profile');
    }

    showProfile(user){ //user이름으로 프로필 가져오기.
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2" src="${user.avatar_url}">
              <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>` //여기에 40-51번째줄 애들이 들어가게됨.
    }

    showRepos(repos) { //저장소.레파지토리를 보여주는 메소드. 똑같은건데 데이터만 다르니까 재사용해줌!
        let output = '';

        repos.forEach(function(repo) { 
            output += `
            <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div class="col-md-6">
              <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
              <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
              <span class="badge badge-success">Forks: ${repo.forms_count}</span>
              </div>
            </div>
          </div>`
        })

        document.getElementById('repos').innerHTML = output; //이걸로 다 더해준 애들을 32번째줄에 들어가게함.
    }

      // alert message 띄우기
      showAlert(message, className) { //app.js18번쨰줄에서 전달받은 인자들. message=User not found, className=alert alert-danger(스타일링위한css클래스,부트스트랩이제공하는거).
        
        this.clearAlert(); //기존에있던 경고 메세지 지우기.

        const div  =  document.createElement('div'); //메세지를 담기위한 div생성(컨테이너역할).

        div.className = className; //div이름에 58번쩨줄에서 받은 className추가.

        div.appendChild(document.createTextNode(message)); //div에 58번째줄에서 받은 message추가.

        const container =  document.querySelector('.searchContainer'); //경고메세지를 삽입할 부모 요소 선택(index.html에서 19번째줄 searchContainer클래스를 가진 요소 선택)

        const search = document.querySelector('.search'); //index.html 20번째줄 search클래스 가진 요소 선택.

        container.insertBefore(div, search); //생성한div요소를 container요소 내에 search요소 앞에 삽입.
    
        setTimeout(() => {
          this.clearAlert();    //3초 후에 alert message 지워주기.
        }, 3000);
      }

    // alert message 지워주기
    clearAlert() {
        const currentAlert = document.querySelector('.alert');
    
        if(currentAlert){
          currentAlert.remove();
        }
      }

    clearProfile() {    //프로필지워주기.
        this.profile.innerHTML = '';
      }

}