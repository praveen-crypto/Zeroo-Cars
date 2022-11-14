

security = () => {

    //console.log("Security Initialised"); 
    
    $(".updatePasswordSubmit").on("click", () => {
        console.log( $("#old_password").val() );

        let formData = new FormData();

        let oldPassword = $("#old_password");
        let newPassword = $("#new_password");

        formData.append("old_pass", oldPassword);
        formData.append("new_pass", newPassword);

        axios.post("/api/v1/admin/password/", formData)
        .then( (res) => { 
            console.log(res);
            
        });

    });
    
}



$(".securityMain").ready( security );


