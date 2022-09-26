//exc funtions
document.getElementById("btn_login").addEventListener("click", login);
document.getElementById("btn_register").addEventListener("click", register);
window.addEventListener("resize", page_width);

//Variables
var login_form = document.querySelector(".login_form");
var register_form = document.querySelector(".register_form");
var login_register_container = document.querySelector(".login-register_container");
var back_box_login = document.querySelector(".back_box_login");
var back_box_register = document.querySelector(".back_box_register");

    //Funtions

function page_width(){

    if (window.innerWidth > 850){
        back_box_register.style.display = "block";
        back_box_login.style.display = "block";
    }else{
        back_box_register.style.display = "block";
        back_box_register.style.opacity = "1";
        back_box_login.style.display = "none";
        login_form.style.display = "block";
        login_register_container.style.left = "0px";
        register_form.style.display = "none";   
    }
}

page_width();


    function login(){
        if (window.innerWidth > 850){
            login_form.style.display = "block";
            login_register_container.style.left = "10px";
            register_form.style.display = "none";
            back_box_register.style.opacity = "1";
            back_box_login.style.opacity = "0";
        }else{
            login_form.style.display = "block";
            login_register_container.style.left = "0px";
            register_form.style.display = "none";
            back_box_register.style.display = "block";
            back_box_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            register_form.style.display = "block";
            login_register_container.style.left = "410px";
            login_form.style.display = "none";
            back_box_register.style.opacity = "0";
            back_box_login.style.opacity = "1";
        }else{
            register_form.style.display = "block";
            login_register_container.style.left = "0px";
            login_form.style.display = "none";
            back_box_register.style.display = "none";
            back_box_login.style.display = "block";
            back_box_login.style.opacity = "1";
        }
}