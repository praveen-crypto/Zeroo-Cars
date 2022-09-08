$("#signin_submit").on("click", () => {
    let phone = $("#signin-email").val();
    let password = $("#signin-password").val();
    let remember_me = $("#rememberme").val();    
    
    let form = new FormData();
    form.append("phone", phone);
    form.append("password", password);
    form.append("remember_me", false);
    
    if(phone.length == null || phone.length == '' ){
        alert("Enter valid mobile number");    
    }
    else{
        axios({
            method: 'post',
            url: "/api/v1/admin/token/",
            data: form,
        })
        .then((res) => {
            //console.log(res);
            data = res.data;
            localStorage.setItem("at", res.data.access);
            localStorage.setItem("rt", res.data.refresh);
            window.location.replace("/admin/");
        }, (error) => {
            if(error.response.status == 401){
                alert(error.response.data['message']);
            }
            else if(error.response.status == 422){
                alert("Enter valid login credentials")
            }
            else{
                alert(error.response.data['message']);  
            }
        });    
    }
    
});


$("#logout").on("click", ()=> {
    axios.delete("/api/v1/admin/logout/")
    window.location.replace("/admin/signin/");
});






