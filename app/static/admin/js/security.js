

security = () => {
    //console.log();

    $(".updatePasswordSubmit").on("click", () => {        
        let formData = new FormData();

        let oldPassword = $("#old_password").val();
        let newPassword = $("#new_password").val();
        let confirmPassword = $("#confirmPassword").val();

        if(newPassword == oldPassword) {
            alert("Password should be different");
            return;
        }

        if(newPassword !== confirmPassword) {
            alert("Password mismatch");
            return;
        }

        formData.append("old_pass", oldPassword);
        formData.append("new_pass", newPassword);
                
        let token = localStorage['at'];

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.post("/api/v1/admin/password/", formData, config)
        .then( (res) => { 
            //console.log(res);
            if(res.data.code == 200){
                alert("Password updated successfully");
                $("#old_password").val('');
                $("#new_password").val('');
                $("#confirmPassword").val('');
            }
            else{
                alert(res.data.message);
            }
        });
        
    });
    
}



$(".securityMain").ready( security );


