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
    const id = 1;
    window.sessionStorage.setItem('id',1);
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("logout")[0].style.display = "block";
    modal.style.display = "none";
}

const logout = () =>{
    const id = 1;
    window.sessionStorage.removeItem('id');
    document.getElementsByClassName("logout")[0].style.display = "none";
    document.getElementsByClassName("login")[0].style.display = "block";
    modal.style.display = "none";
}

if(!localStorage.getItem('num')){
    localStorage.setItem('num',0);
}else{
    const now = localStorage.getItem('num')
    let result = ''
    console.log(now)
    for(let i=1; i<Number(now)+1;i++){
        const user = JSON.parse(localStorage.getItem(i))
        inner = `<div class="comment-user"> user:${user.user}</div><div class="comment-text">text:${user.text} </div>`
        result = result+inner
    }
    document.getElementsByClassName('comment')[0].innerHTML = result;
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

            let result = '';
            for(let i=1; i<now+1;i++){
                const user = JSON.parse(localStorage.getItem(i))
                inner = `<div class="comment-user"> user:${user.user}</div><div class="comment-text">text:${user.text} </div>`
                result = result+inner
            }
            document.getElementsByClassName('comment')[0].innerHTML = result;
        }
    }else{
        openModal();
    }
}

// const creComment = () => {
//    data= [{   title : "damaged JEAN",
//     content : "18f/w hot item",
//     price : 75000
//     },
//     {
//     title: "long-sleeve T-shirt",
//     content: "2019s/s new!",
//     price: 25000
//     }];
//     var html = "<li><h4>{title}</h4><p>{content}</p><div>{price}</div></li>";

//     data.forEach( (el) => {
//     let result = html.replace("{title}",el.title)
//          .replace("{content}", el.content)
//            .replace("{price}", el.price);
//     el.innerHTML += result;
//         document.getElementsByClassName('comment')[0].innerHTML = result
// })
// }

const thumbUpDown = (value) => {
    console.log(value)
    if(value===1){
        let num = document.getElementsByClassName('up_num')[0].outerHTML;
        console.log(typeof(num))
        console.log(Number(num)+1)
        document.getElementsByClassName('up_num')
    }
}