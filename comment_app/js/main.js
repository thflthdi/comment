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
                    <div class="up" onclick="thumbUpDown(1)">좋아요
                        <span class="up_num">30</span>
                    </div>
                    <div class="down" onclick="thumbUpDown(2)">싫어요</div>`

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
    localStorage.setItem('num',0);
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
            localStorage.setItem(now,JSON.stringify({user:isLogin(),text:comment}))
            localStorage.setItem('num',now)
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
                <button onclick="updateComment(${comId})">입력</button>`
        }else{
            console.log('update error')
        }
    }catch(e){console.log(e)
        console.log('Update Error : cant get Info',e)}
}

const updateComment = (comId) => {
    try{
        let comment = document.getElementsByClassName('com-write')[0].value;
        localStorage.setItem(comId,JSON.stringify({user:isLogin(),text:comment}))
        document.getElementsByClassName('comment')[0].innerHTML = getComment();
    }catch(e){console.log(e)}
}

const thumbUpDown = (value) => {
    if(value===1){
        let num = document.getElementsByClassName('up_num')[0].outerHTML;
        document.getElementsByClassName('up_num')
    }
}