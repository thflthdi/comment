//madal
const modal = document.getElementsByClassName("loginModal")[0];
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
if(window.sessionStorage.getItem('id')){
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

//댓글 생성
const creComment = () => {
    let comment = document.getElementsByClassName('com-write')[0].value;
    if(!comment){
        alert("빈값")
    }else{
        document.getElementsByClassName("comment")[0].innerHTML = `<div class="com">${comment}<div/>`;
    }
}

const thumbUpDown = (value) => {
    console.log(value)
    if(value===1){
        let num = document.getElementsByClassName('up_num')[0].outerHTML;
        console.log(typeof(num))
        console.log(Number(num)+1)
        document.getElementsByClassName('up_num')
    }
}