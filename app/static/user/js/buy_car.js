
//$(".nav_list_outer").css;

buycar_fn = async () => {
    loadOffset = 0;
    allowApiCall = true;
    let orientation = '';
    limit = 20;

    loadCars = async ( kilometer, minPrice , maxPrice , owners, brand, body, year ) => {
        allowApiCall = false;               

        let url = `/api/v1/main/cars/?offset=${loadOffset}&limit=${limit}&kilometer=${kilometer}&min_price=${minPrice}&max_price=${maxPrice}&number_of_owners=${owners}`;
        
        //fuelType.length > 0 ? fuelType.forEach( (fuel) => { url = url +'&fule_type='+fuel }) : null
        //transmission.length > 0 ? transmission.forEach( (value) => { url = url +'&transmission='+value }) : null
        
        brand.length > 0 ? brand.forEach( (val) => { url = url +'&brand='+val.replace("%", " ").replace("_", " ") }) : []
        body.length > 0 ? body.forEach( (val) => { url = url +'&body='+val }) : []
        year.length > 0 ? year.forEach( (val) => { url = url +'&year='+val }) : []
        
        //console.log(url);

        let res = await axios.get(url);
        let data = res.data.data;

        if(data.length <= 0){
            return;
        }
        
        for(i = 0; i < data.length; i++){
            //Image Ratio 16:9
            //Pixel size 520 * 292 For Thumbnail                              
            let image = data[i]["thumbnail"] == null ? '' : JSON.parse(data[i]["thumbnail"])[0].image;                
            
            $("#used_car_list").append(`
                <a class="car_card" href="/buy-used-car/`+data[i]["car_name"]+`/`+data[i]["regestration_number"]+`" >
                    <div class="car_image_container">
                        <div class="car_bg"></div>
                        <img class="car_image" src="`+image+`" alt="">
                    </div>
                    <div class="card_content">
                        <h6 class="title">`+data[i]["car_name"].replace(/(^\w|\s\w)/g, m => m.toUpperCase()) +`</h6>
                        <span class="kilometer small-2">`+data[i]["kilometer"]+`</span>
                        <span class="fuel small-2">`+data[i]["fule_type"]  +`</span>
                        <span class="transmission small-2">`+data[i]["transmission_type"]  +`</span>
                        <h6 class="price " >Rs `+data[i]["price"]+`</h6>
                        <span class="location small-1">Chennai</span>
                    </div>
                </a>                
            `);

        }
        
        loadOffset = loadOffset + limit;
        
        allowApiCall = true;
    }
    
    clearCars = () => {
        $("#used_car_list").empty();
    };

    //Hide Desktop Filter on load for mobile
    if(window.innerWidth < 430){
        $(".desktopFilter").empty();
        orientation = 'vertical';
        //$(".mobileFilterBody .filter_budget").hide();
        $(".mobileFilterBody .filter_brand").hide();
        $(".mobileFilterBody .filter_year").hide();
        $(".mobileFilterBody .filter_kilometer").hide();
    }
    else{
        $(".mobileFilterBody").empty();
        orientation = 'horizontal';
    }
    
    noUiSlider.create(slider, {
        start: [100000, 1000000],     
        step: 100000,
        padding: [15, 10],   
        connect: true,   
        orientation: orientation,   
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
        orientation: orientation,
        tooltips: {            
            to: function(numericValue) {
                return Math.round( numericValue.toFixed(1) );
            }
        },
        format: {
            to: function (value) {
                return String(Math.round( value ));
            },
            from: function (value) {
                return Number(value.split('.')[0]);
            }
        }
    });
    
    //Update price in real time
    slider.noUiSlider.on('update', async (values, handle) => {        
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
        margin: 0,        
        stagePadding: 25,
    });
    
    //Advertisement Images
    await axios
    .get('/api/v1/image/tag/advertisement/')
    .then( (response) => {
        // $("#homePageImage2").empty();
        
        if( !response.data.data.length == 0){            
            image = response.data["data"][0].image;
            
            //console.log(image);
            
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

    //Landing Page Filter
    let url = window.location.href.split("?")[1];
    let kilometer = '100000000';
    let minPrice = '0';
    let maxPrice = '100000000';
    let brand = [];
    let body = '';
    let owners = '5';
    let year = [];

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
    
    loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
    
    //Buy Car Page Filters
    slider.noUiSlider.on('change', async (values, handle) => {        
        loadOffset = 0;
        clearCars();
        
        minPrice =  String(values[0]);
        maxPrice = String(values[1]);

        await loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
        
    });

    //------Year Filter
    dateSlider.noUiSlider.on('change', async (values, handle) => {        
        loadOffset = 0;
        clearCars();

        //console.log("date", values);
        year = values

        await loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
        
    });

    //------Brand Filter
    $('.desktopFilter .checkboxFilter').on('change', async function() {    

        if(this.checked)
        {
            brand.push(this.id);
        }
        else{
            brand = brand.filter(item => item !== this.id)
        }       
        
        loadOffset = 0;
        clearCars();

        await loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
    })
    
    //------Kilometer Filter
    $(".desktopFilter .kilometerFilter").on('change', () => {
        //console.log("kilometer:",$('input[name="kilometer"]:checked').val());
        kilometer = $('input[name="kilometer"]:checked').val();
        
        loadOffset = 0;
        clearCars();

        loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
    });

    //#region Mobile Filter
    toggleActiveClass = (cls) => {
        if(cls == "budget"){
            $(".mobileFilterBody .budget").addClass("active");
            $(".mobileFilterBody .brand").removeClass("active");
            $(".mobileFilterBody .year").removeClass("active");
            $(".mobileFilterBody .kilometer").removeClass("active");

            $(".mobileFilterBody .filter_budget").show();
            $(".mobileFilterBody .filter_brand").hide();
            $(".mobileFilterBody .filter_year").hide();
            $(".mobileFilterBody .filter_kilometer").hide();
        }
        else if(cls == "brand"){
            $(".mobileFilterBody .budget").removeClass("active");
            $(".mobileFilterBody .brand").addClass("active");
            $(".mobileFilterBody .year").removeClass("active");
            $(".mobileFilterBody .kilometer").removeClass("active");

            $(".mobileFilterBody .filter_budget").hide();
            $(".mobileFilterBody .filter_brand").show();
            $(".mobileFilterBody .filter_year").hide();
            $(".mobileFilterBody .filter_kilometer").hide();
        }
        else if(cls == "year"){
            $(".mobileFilterBody .budget").removeClass("active");
            $(".mobileFilterBody .brand").removeClass("active");
            $(".mobileFilterBody .year").addClass("active");
            $(".mobileFilterBody .kilometer").removeClass("active");

            $(".mobileFilterBody .filter_budget").hide();
            $(".mobileFilterBody .filter_brand").hide();
            $(".mobileFilterBody .filter_year").show();
            $(".mobileFilterBody .filter_kilometer").hide();
        }
        else{
            $(".mobileFilterBody .budget").removeClass("active");
            $(".mobileFilterBody .brand").removeClass("active");
            $(".mobileFilterBody .year").removeClass("active");
            $(".mobileFilterBody .kilometer").addClass("active");

            $(".mobileFilterBody .filter_budget").hide();
            $(".mobileFilterBody .filter_brand").hide();
            $(".mobileFilterBody .filter_year").hide();
            $(".mobileFilterBody .filter_kilometer").show();
        }
    }
    
    $(".mobileFilterBody .budget").on('click', () => {
        toggleActiveClass('budget');
    });

    $(".mobileFilterBody .brand").on('click', () => {
        toggleActiveClass('brand');
    });

    $(".mobileFilterBody .year").on('click', () => {
        toggleActiveClass('year');
    });

    $(".mobileFilterBody .kilometer").on('click', () => {
        toggleActiveClass('kilometer');
    });

    //brand filter
    $('.mobileModalFilter .checkboxFilter').on('change', async function() {    
        //console.log("this", this);
        if(this.checked)
        {
            brand.push(this.name);
        }
        else{
            brand = brand.filter(item => item !== this.id)
        }

    })
    
    //Mobile Filter Apply button
    $("#applyFilter").on("click", async () => {
        minPrice =  String(slider.noUiSlider.get()[0]);
        maxPrice = String(slider.noUiSlider.get()[1]);

        year = dateSlider.noUiSlider.get();

        kilometer = $('input[name="kilometer"]:checked').val();
        
        if( kilometer == undefined ){
            kilometer = '100000000';
        }
        
        loadOffset = 0;
        clearCars();

        await loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);

        $('#modalFilter').modal('hide');

    } );
    //#endregion

    
    //Load content on scroll
    $(window).scroll(async () => {
        let percentage = (100 * $(window).scrollTop()) / ($(document).height() - $(window).height());        
        //console.log(Math.round(percentage));
        if (percentage >= 75 && allowApiCall) {
            await loadCars(kilometer, minPrice, maxPrice, owners, brand, body, year);
        }
    });
    
}    






$(".buycars").ready( buycar_fn );
