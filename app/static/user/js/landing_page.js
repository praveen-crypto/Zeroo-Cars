

zeroocar_fn = async () => {
    //console.log("zeroo cars landing page");


    //Load Landing Page Images
    await axios
    .get('/api/v1/image/tag/homepage1/')
    .then( (response) => {
        $("#homePageImage1").empty();
        //consol.log(response.data["data"][0].image);

        image = response.data["data"][0].image;

        $("#homePageImage1").append(`<img src="`+image+`" alt="">   `);
    });

    await axios
    .get('/api/v1/image/tag/homepage2/')
    .then( (response) => {
        $("#homePageImage2").empty();
        //console.log(response.data["data"][0].image);

        image = response.data["data"][0].image;
        
        $("#homePageImage2").append(`<img src="`+image+`" alt="">   `);

    });



    //For mobile Navigation
    $(".nav_btn").on("click", () => {   
        
        $('html, body').css({
            position: "relative",
            overflow: 'hidden',
        });
        
        $(".circle").css("visibility","visible");
        $(".circle").animate({ height:"1000px", width:"1000px", left: "-250px", top: "-250px",  }, "slow");
        
        $(".nav_list_outer").css("z-index","1");
        $(".nav_list_outer").animate({
            opacity: 1,
        }, "slow");
        
        $(".circle").animate({ height:"30px", width:"30px", left: "5px", top: "4px",  }, "slow");

        //console.log("clicked1");    
    });
    
    $(".nav_list_btn").on("click", () => {
        $(".circle").css("visibility","hidden");
        
        $(".nav_list_outer").css("z-index","-1");
        $(".nav_list_outer").css("opacity","0");
        $('html, body').css({
            position: "",
            overflow: '',
        });
        //console.log("clicked2");
    });
    
    $(".owl-1").owlCarousel({
        margin:20,        
        loop:true,
        autoWidth:true,
        center: true,
    });
    
    $(".owl-2").owlCarousel({
        margin:10,
        loop:false,
        autoWidth:true,
        center: true,
    });

    let insertInqury = '/api/v1/admin/inquiry/';

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    //Sell car on click event
    $("#sellCarSubmit").on('click', async () => { 
        let sellerName = $("#sellerName").val();
        let sellerPhone = $("#sellerPhone").val();
        let sellerMail = $("#sellerMail").val();
        let sellerCarBrand = $("#sellerCarBrand").val();
        let carModel = $("#carModel").val();
        let sellerRegYear = $("#sellerRegYear").val();
        
        if(sellerName.trim() == ''){
            alert('Enter name');
            return;
        }
        else if(sellerPhone.trim() == ''){
            alert('Enter phone');
            return;
        }
        else if(sellerMail.trim() == ''){
            alert('Enter email');
            return;
        }
        else if(sellerCarBrand.trim() == ''){
            alert('Enter car brand');
            return;
        }
        else if(carModel.trim() == ''){
            alert('Enter car model');
            return;
        }
        else if(sellerRegYear == ''){
            alert('Enter registration year');
            return;
        }
                
        if( !hasNumber(sellerPhone) ){
            alert('Enter valid phone number');
            return;
        }

        if( !hasNumber(sellerRegYear) ){
            console.log(sellerRegYear);
            console.log(hasNumber(sellerRegYear));
            alert('Enter valid regestration year');
            return;
        }

        let form = new FormData();

        //form.append("regestration_number", regestrationNumber);
        form.append("inquiry_type", 'sell car');
        form.append("name", sellerName);
        form.append("phone", sellerPhone);
        form.append("email", sellerMail);        
        form.append("car_brand", sellerCarBrand);
        form.append("car_model", carModel);
        form.append("registration_year", sellerRegYear);
        
        await axios.post(insertInqury, form)
        .then( (response) => {
            response.data.message == "ok" ? alert("Response sent succesfully.") : alert("Failed to send, try again.") 
        });
    });

    //contact us on click event
    $("#contactSubmit").on('click', async () => { 

        let contactName = $('#contactName').val();
        let contactMail = $('#contactMail').val();
        let contactMessage = $('#contactMessage').val();
        let contactPhone = $('#contactPhone').val();
        

        if(contactName.trim() == ''){
            alert('Enter name');
            return;
        }
        else if(contactMail.trim() == ''){
            alert('Enter mail');
            return;
        }
        else if(contactMessage.trim() == ''){
            alert('Enter message');
            return;
        }
        else if(contactPhone.trim() == ''){
            alert('Enter message');
            return;
        }

        if( !hasNumber(contactPhone) ){
            alert('Enter valid phone number');
            return;
        }

        let form = new FormData();

        //form.append("regestration_number", regestrationNumber);
        form.append("inquiry_type", 'contact us');
        form.append("name", contactName);
        form.append("phone", contactPhone);
        form.append("email", contactMail);
        form.append("message", contactMessage);
        
        await axios.post(insertInqury, form)
        .then( (response) => {
            response.data.message == "ok" ? alert("Response sent succesfully.") : alert("Failed to send, try again.") 
        });
    }); 
    




    

    

}    



$(".zeroocars").ready( zeroocar_fn );


