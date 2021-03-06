//전역 변수
const modal = document.getElementsByClassName("loginModal")[0];

//login 확인 값
const isLogin = () => {
    return window.sessionStorage.getItem('id')
} 

//modal
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

const isLogined = () => {
    if(!isLogin()){
        openModal()
    }
}

//로그인
const login = () =>{
    let userId = '';
    const choice = document.getElementsByName('choiceUser');
    choice.forEach((user)=>{if(user.checked){userId=user.id}})
    window.sessionStorage.setItem('id',userId);
    if(!localStorage.getItem(userId)){
        localStorage.setItem(userId,JSON.stringify({ctn:0}))
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

//enter
const onEnter = (e,isMod=false,userId) => {
    if(e.keyCode==13){
        if(isMod){
            updateComment(userId);
        }else{
            creComment();
        }
    }
}

//댓글 폼
const getComment = () => {
    const now = localStorage.getItem('num')
    let result = ''

    for(let i=1; i<Number(now)+1;i++){

        try{let user = JSON.parse(localStorage.getItem(i))
            inner = `<div class="comment-user">ㄴ ${user.user}</div>
                        <div class="comment-text">${user.text} </div>
                        <button class="up" isclicked="false" onclick="thumbsUp(${i})">좋아요
                            <span class="up_num">${user.up}</span>
                        </button>
                        <button class="down" isclicked="false" onclick="thumbsDown(${i})">싫어요
                            <span class="up_num">${user.down}</span>
                        </button>`

            if(user.user===isLogin()){
                inner=inner+`<button class="com-mod" onclick="comMod(${i})">수정</button>
                <button class="com-del" id="${i}" onclick="comDel(id)">삭제</button>`
            }
            inner=inner+`<hr/`
            result = result+inner
        }catch(e){
            }
    }
        return result
}

//페이지 로딩 시
//댓글 수를 count 하는 num을 행성
//댓글이 존재하면 페이지에 댓글 출력
if(!localStorage.getItem('num')){
    localStorage.setItem('num', 0);
}else{
    document.getElementsByClassName('comment')[0].innerHTML = getComment();
}


//댓글 금지어 검사
const regBad = (comment) => {
    const badwords = [/^바[.\s-]*?보|\s바[.\s-]*?보|바보$/, /^멍[.\s-]*?청[.\s-]*?이|\s멍[.\s-]*?청[.\s-]*?이|멍청이$/
    , /^똥[.\s-]*?개|\s똥[.\s-]*?개|똥개$/, /^해[.\s-]*?삼|\s해[.\s-]*?삼|해삼$/
    , /^말[.\s-]*?미[.\s-]*?잘|\s말[.\s-]*?미[.\s-]*?잘|말미잘$/];
    let badword = []
    badwords.forEach((word)=>{
        badword.push(`${word.exec(comment)}`)
    })
    let result = badword.filter( bad => bad !== "null")
    return result
}

const eraseInput = () => {
    document.getElementsByClassName('com-write')[0].outerHTML = 
    `<input class="com-write" type="text" onkeypress="onEnter(event)" placeholder="댓글을 입력해 주세요" autofocus value="" />`
}

//댓글 생성
const creComment = () => {
    if(isLogin()){
        let comment = document.getElementsByClassName('com-write')[0].value;
        const num = localStorage.getItem('num')
        const user = JSON.parse(localStorage.getItem(isLogin()));
        const now_time =+ new Date()
        if(!comment){
            alert("내용을 입력해 주세요");
        }else{    
            if(regBad(comment).length > 0){
                alert(`금지어를 사용하셨습니다.`);
            }else{
                if(user.isBad){
                    if(now_time-user.com_time > 60000){
                        localStorage.setItem(isLogin(),JSON.stringify({...user,ctn:0, com_time:'', isBad:false}))
                    }
                    alert('도배로 인해 1분 동안 댓글을 쓸 수 없습니다.')
                }else{
                    if(user.com_time){
                        if(now_time-user.com_time < 10000 && user.ctn > 4){
                            alert('도배를 감지하였습니다. 1분 동안 댓글을 쓸 수 없습니다.')
                            localStorage.setItem(isLogin(),JSON.stringify({...user, com_time:now_time, isBad:true}))
                        }else{
                            if(now_time-user.com_time < 10000){
                                localStorage.setItem(isLogin(),JSON.stringify({...user,ctn:user.ctn+1}))
                            }else{
                                localStorage.setItem(isLogin(),JSON.stringify({...user,ctn:1, com_time:now_time}))
                            }
                            const now_ctn = Number(num)+1
                            localStorage.setItem(now_ctn, JSON.stringify({user:isLogin(), text:comment, up:0, down:0, time:now_time}))
                            localStorage.setItem('num', now_ctn)
                            document.getElementsByClassName('comment')[0].innerHTML = getComment();
                        }
                    }else{
                        localStorage.setItem(isLogin(),JSON.stringify({...user, ctn:1, com_time:now_time}))
                        const now_ctn = Number(num)+1
                        localStorage.setItem(now_ctn, JSON.stringify({user:isLogin(), text:comment, up:0, down:0, time:now_time}))
                        localStorage.setItem('num', now_ctn)
                        document.getElementsByClassName('comment')[0].innerHTML = getComment();
                    }
                }
            }
            eraseInput();
        }
    }else{
        openModal();
    }
}


//댓글 삭제
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


//댓글 수정 폼
const comMod = (comId) => {
    try{
        const getInfo = JSON.parse(localStorage.getItem(comId));
        const isMod = true
        if(getInfo && getInfo.user === isLogin()){
            document.getElementsByClassName('com-new')[0].innerHTML = 
                `<input class="com-write" type="text" onkeypress="onEnter(event,${isMod},${comId})" placeholder="댓글을 입력해 주세요" autofocus value="${getInfo.text}" />
                <button onclick="updateComment(${comId})">입력</button>`
        }else{
            console.log('update error')
        }
    }catch(e){console.log(e)
        console.log('Update Error : cant get Info',e)}
}


//댓글 수정
const updateComment = (comId) => {
    try{
        let comment = document.getElementsByClassName('com-write')[0].value;
        const pre_comment = JSON.parse(localStorage.getItem(comId));
        if(regBad(comment).length > 0){
            alert(`금지어를 사용하셨습니다 ${regBad(comment)}`);
        }else{
            localStorage.setItem(comId, JSON.stringify({...pre_comment, user:isLogin(), text:comment}))
            document.getElementsByClassName('comment')[0].innerHTML = getComment();
            eraseInput();
        }
    }catch(e){console.log(e)}
}


//좋아요
const thumbsUp = (comId) => {
    try{
        const comment = JSON.parse(localStorage.getItem(comId));
        const user = JSON.parse(localStorage.getItem(isLogin()));

        if(user[comId] === 'down'){
            alert('이미 싫어요한 댓글 입니다.')
        }else{
            if(user[comId] === 'up'){
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:''}))
                localStorage.setItem(comId, JSON.stringify({...comment, up:comment.up-1}))
            }else{
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:'up'}))
                localStorage.setItem(comId, JSON.stringify({...comment, up:comment.up+1}))
                    
            }
        }
        document.getElementsByClassName('comment')[0].innerHTML = getComment();

    }catch(e){
        console.log(e)
        openModal();
    }
}


//싫어요
const thumbsDown = (comId) => {
    try{
        const comment = JSON.parse(localStorage.getItem(comId));
        const user = JSON.parse(localStorage.getItem(isLogin()));
        if(user[comId] === 'up'){
            alert('이미 좋아요한 댓글 입니다.')
        }else{
            if(user[comId] === 'down'){
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:''}))
                localStorage.setItem(comId, JSON.stringify({...comment, down:comment.down-1}))

            }else{
                localStorage.setItem(isLogin(),JSON.stringify({...user,[comId]:'down'}))
                localStorage.setItem(comId, JSON.stringify({...comment, down:comment.down+1}))
            }
        }
        document.getElementsByClassName('comment')[0].innerHTML = getComment();

    }catch(e){
        openModal();
    }
}