const setCookie = (id)=>{
    console.log(id);
    if (id) {
        localStorage.setItem("session_id", id);
    }else{
        localStorage.removeItem("session_id");
    }

}

export default setCookie;