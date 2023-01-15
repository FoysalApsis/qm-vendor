import serverAPI from "../config/serverAPI";

const setCookie = (id)=>{
    if (id) {
        serverAPI.defaults.headers.common["Cookie"] = `session_id ${id}`;
    }else{
        delete serverAPI.defaults.headers.common["Cookie"];
    }

}

export default setCookie;