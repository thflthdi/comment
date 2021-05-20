//전역 변수
const modal = document.getElementsByClassName("loginModal")[0];
const isLogin = () => {
    return window.sessionStorage.getItem('id')
} 
//madal
const openModal = () => {
    modal.style.display = "block";
}

const closeModal = () => {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

//login logout
if(isLogin()){
    document.getElementsByClassName("login")[0].style.display = "none";
}else{
    document.getElementsByClassName("logout")[0].style.display = "none";
}

const login = () =>{
    let userId = '';
    const choice = document.getElementsByName('choiceUser');
    choice.forEach((user)=>{if(user.checked){userId=user.id}})
    window.sessionStorage.setItem('id',userId);
    if(!localStorage.getItem(userId)){
        localStorage.setItem(userId,JSON.stringify({}))
    }
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("logout")[0].style.display = "block";
    modal.style.display = "none";
    document.getElementsByClassName('comment')[0].innerHTML = getComment();
}

const logout = () =>{
    window.sessionStorage.removeItem('id');
    document.getElementsByClassName("logout")[0].style.display = "none";
    document.getElementsByClassName("login")[0].style.display = "block";
    modal.style.display = "none";
    document.getElementsByClassName('comment')[0].innerHTML = getComment();
}

const getComment = () => {
    const now = localStorage.getItem('num')
    let result = ''

    for(let i=1; i<Number(now)+1;i++){

        try{let user = JSON.parse(localStorage.getItem(i))
            // let newDiv = document.createElement("div");
            // let newContent = document.createTextNode(`${user.text}`);
            // newDiv.appendChild(newContent)
            inner = `<div class="comment-user"> user:${user.user}</div>
                        <div class="comment-text">text:${user.text} </div>
                        <div class="up" isclicked="false" onclick="thumbsUp(${i})">좋아요
                            <span class="up_num">${user.up}</span>
                        </div>
                        <div class="down" isclicked="false" onclick="thumbsDown(${i})">싫어요
                            <span class="up_num">${user.down}</span>
                        </div>`

            if(user.user===isLogin()){
                inner=inner+`<button class="com-mod" onclick="comMod(${i})">수정</button>
                <button class="com-del" id="${i}" onclick="comDel(id)">삭제</button>`
            }
            inner=inner+`<hr/`
            result = result+inner
        }catch(e){
            // console.log(e)
            }
    }
        return result
}

if(!localStorage.getItem('num')){
    localStorage.setItem('num', 0);
}else{
    document.getElementsByClassName('comment')[0].innerHTML = getComment();
}

//댓글 생성
const creComment = () => {
    if(isLogin()){
        let comment = document.getElementsByClassName('com-write')[0].value;
        const num = localStorage.getItem('num')
        if(!comment){
            alert("내용을 입력해 주세요");
        }else{
            const now = Number(num)+1
            localStorage.setItem(now, JSON.stringify({user:isLogin(), text:comment, up:0, down:0}))
            localStorage.setItem('num', now)
        document.getElementsByClassName('comment')[0].innerHTML = getComment();
        }
    }else{
        openModal();
    }
}

const comDel = (comId) => {
    try{const getInfo = JSON.parse(localStorage.getItem(comId));
        if(getInfo && getInfo.user === isLogin()){
            localStorage.removeItem(comId)
            document.getElementsByClassName('comment')[0].innerHTML = getComment();
        }else{
            console.log('delete error')
        }
    }catch(e){console.log(e)
        console.log('Delete Error : cant get Info',e)}
}

const comMod = (comId) => {
    try{const getInfo = JSON.parse(localStorage.getItem(comId));
        if(getInfo && getInfo.user === isLogin()){
            document.getElementsByClassName('com-new')[0].innerHTML = 
                `<input class="com-write" type="text" placeholder="댓글을 입력해 주세요" value="${getInfo.text}">
                <button onclick="updateComment(${comId},${getInfo.up},${getInfo.down})">입력</button>`
        }else{
            console.log('update error')
        }
    }catch(e){console.log(e)
        console.log('Update Error : cant get Info',e)}
}

const updateComment = (comId,UP,DOWN) => {
    try{
        let comment = document.getElementsByClassName('com-write')[0].value;
        localStorage.setItem(comId, JSON.stringify({user:isLogin(), text:comment, up:UP, down:DOWN}))
        document.getElementsByClassName('comment')[0].innerHTML = getComment();
    }catch(e){console.log(e)}
}

const thumbsUp = (comId) => {
    try{
        const comment = JSON.parse(localStorage.getItem(comId));
        const user = JSON.parse(localStorage.getItem(isLogin()));
        
        if(user[comId] === 'down'){
            alert('이미 싫어요한 댓글 입니다.')
        }else{
            if(user[comId] === 'up'){
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:''}))
                localStorage.setItem(comId, JSON.stringify({user:comment.user, text:comment.text, 
                    up:comment.up-1, down:comment.down}))
            }else{
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:'up'}))
                localStorage.setItem(comId, JSON.stringify({user:comment.user, text:comment.text, 
                    up:comment.up+1, down:comment.down}))
            }
        }
        document.getElementsByClassName('comment')[0].innerHTML = getComment();

    }catch(e){
        openModal();
    }
}

const thumbsDown = (comId) => {
    try{
        const comment = JSON.parse(localStorage.getItem(comId));
        const user = JSON.parse(localStorage.getItem(isLogin()));
        if(user[comId] === 'up'){
            alert('이미 좋아요한 댓글 입니다.')
        }else{
            if(user[comId] === 'down'){
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:''}))
                localStorage.setItem(comId, JSON.stringify({user:comment.user, text:comment.text, 
                    up:comment.up, down:comment.down-1}))
            }else{
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:'down'}))
                localStorage.setItem(comId, JSON.stringify({user:comment.user, text:comment.text, 
                    up:comment.up, down:comment.down+1}))
            }
        }
        document.getElementsByClassName('comment')[0].innerHTML = getComment();

    }catch(e){
        openModal();
    }
}