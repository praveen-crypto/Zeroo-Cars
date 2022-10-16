
//$(".nav_list_outer").css;

buycar_fn = async () => {

    get_all_cars = async ( kilometer, minPrice, maxPrice, owners, fuelType, brand, transmission, body ) => {
        
        let url = `/api/v1/main/cars/?offset=0&limit=20&kilometer=${kilometer}&min_price=${minPrice}&max_price=${maxPrice}&number_of_owners=${owners}`;
        
        // console.log('adfdsf',brand);

        fuelType.length > 0 ? fuelType.forEach( (fuel) => { url = url +'&fule_type='+fuel }) : null
        brand.length > 0 ? brand.forEach( (brand) => { url = url +'&brand='+brand }) : null
        transmission.length > 0 ? transmission.forEach( (value) => { url = url +'&transmission='+value }) : null
        body.length > 0 ? body.forEach( (value) => { url = url +'&body='+value }) : null
        
        let res = await axios.get(url);
        let car_data = res.data.data;              
        
        for(i = 0; i < car_data.length; i++){

            let thumb = await axios.get("/api/v1/image/thumbnail/photos/"+car_data[i]["regestration_number"]+"/");
            image = thumb.data.data[0].image;
            //console.log(image);
            
            $("#used_car_list").append(`
                <a class="car_card" href="/buy-used-car/`+car_data[i]["car_name"]+`/`+car_data[i]["regestration_number"]+`" >
                    <div class="car_image_container">
                        <div class="car_bg"></div>
                        <img class="car_image" src="`+image+`" alt="">
                    </div>
                    <div class="card_content">
                        <h6 class="title">`+car_data[i]["car_name"].replace(/(^\w|\s\w)/g, m => m.toUpperCase()) +`</h6>
                        <span class="kilometer small-2">`+car_data[i]["kilometer"]+`</span>
                        <span class="fuel small-2">`+car_data[i]["fule_type"]  +`</span>
                        <span class="transmission small-2"> Manual </span>
                        <h6 class="price " >Rs `+car_data[i]["price"]+`</h6>
                        <span class="location small-1"> Avadi, Chennai </span>
                    </div>
                </a>                
            `);

        }
    }

    noUiSlider.create(slider, {
        start: [100000, 1000000],     
        step: 100000,
        padding: [15, 10],   
        connect: true,
        range: {
            'min': 100000,
            'max': 1000000
        },
        format: {
            to: function (value) {
                return Math.round( value );
            },
            
            from: function (value) {
                return Number(value.replace(',-', ' '));
            }
        }
    });

    noUiSlider.create(dateSlider, {        
        range: {
            min: 2000,
            max: 2022
        },

        step: 1,

        start: [2000, 2022],

        tooltips: {            
            to: function(numericValue) {
                return Math.round( numericValue.toFixed(1) ) ;
            }
        }        
    });

    slider.noUiSlider.on('update', (values, handle) => {
        //console.log( "Testing" );
        $("#min_price").html("&#8377; "+values[0]);
        $("#max_price").html("&#8377; "+values[1]);
    });
    
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
        
    });
    
    $(".owl-1").owlCarousel({      
        margin:15,        
        stagePadding: 20,
    }); 
    

    //Advertisement Images
    await axios
    .get('/api/v1/image/tag/advertisement/')
    .then( (response) => {
        // $("#homePageImage2").empty();
        
        if( !response.data.data.length == 0){            
            image = response.data["data"][0].image;
            
            console.log(image);
            
            $(" #carouselExampleIndicators").append(`<img src="`+image+`" alt="">   `);
        
        }
        else{
            $("#carouselExampleIndicators").remove();
        }
        
        // $("#homePageImage2").append(`
        //     <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
        //         <div class="carousel-inner">
        //             <div class="carousel-item active">
        //                 <img src="https://images.unsplash.com/photo-1506057213367-028a17ec52e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="caImage d-block " alt="...">
        //             </div>
        //             <div class="carousel-item ">
        //                 <img src="https://images.unsplash.com/photo-1506057213367-028a17ec52e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="caImage d-block " alt="...">
        //             </div>
        //         </div>

        //         <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        //             <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        //             <span class="visually-hidden">Previous</span>
        //         </button>

        //         <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
        //         <span class="visually-hidden">Next</span>
        //         </button>
        //     </div>    
        // `);

    });

    //--------------------------------------

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

        let form = new FormData();

        //form.append("regestration_number", regestrationNumber);
        form.append("inquiry_type", 'contact us');
        form.append("name", contactName);
        // form.append("phone", sellerPhone);
        form.append("email", contactMail);
        form.append("message", contactMessage);
        
        await axios.post(insertInqury, form)
        .then( (response) => {
            response.data.message == "ok" ? alert("Response sent succesfully.") : alert("Failed to send, try again.") 
        });
        

    });

    //--------------------------------------




    let url = window.location.href.split("?")[1];
    let kilometer = '';
    let minPrice = '0';
    let maxPrice = '100000000';
    let brand = '';
    let body = '';

    if( url?.includes('brand') ){
        brand = [url.split('=')[1]];             
    }

    if( url?.includes('body') ){
        body = [url.split('=')[1]];             
    }

    if( url?.includes('minPrice') ){
        minPrice = [url.split('&')[0].split('=')[1]];
        maxPrice = [url.split('&')[1].split('=')[1]];
    }
    
    get_all_cars(kilometer = '100000000', minPrice = minPrice, 
    maxPrice = maxPrice, owners = '90', fuelType = '',
    brand = brand, transmission = '', body = body);

    //{fuelType:['Petrol','Diesel'], brand : ['Honda','Ford']}
    
}    






$(".buycars").ready( buycar_fn );
