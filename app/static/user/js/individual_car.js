specific_car_fn = async () => {
    let url = window.location.href;

    let id = url.split("/")[url.split("/").length - 1];

    let carDetails = await axios.get("/api/v1/main/cars/"+id);
    carDetails = carDetails.data["data"]
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

    $("#bookNowSubmit").on('click', async () => {

        let bookNowName = $('#bookNowName').val();
        let bookNowPhone = $('#bookNowPhone').val();
        let bookNowMail = $('#bookNowMail').val();        

        if(bookNowName.trim() == ''){
            alert('Enter name');
            return;
        }
        else if(bookNowPhone.trim() == ''){
            alert('Enter phone number');
            return;
        }
        else if(bookNowMail.trim() == ''){
            alert('Enter email address');
            return;
        }
        
        let form = new FormData();

        //form.append("regestration_number", regestrationNumber);
        form.append("inquiry_type", 'book now');
        form.append("name", bookNowName);
        form.append("phone", bookNowPhone);
        form.append("email", bookNowMail);
        form.append('regestration_number', url);//.split('/').slice(3,).join('/'));
        
        await axios.post(insertInqury, form)
        .then( (response) => {
            response.data.message == "ok" ? alert("Response sent succesfully.") : alert("Failed to send, try again.") 
        });
        
    });
    //--------------------------------------

    let general_details = $(".general_details");
    
    //Inspection report scroll
    $("#scroll_list").on("scroll", () => {
        let threshold = 9;

        if( $("#scroll_list .engine_and_transmission").position().top < threshold){
            $("#scroll_item .s1").addClass("active");            
        }
        if( $("#scroll_list .fuel_and_performance").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").addClass("active");            
        }
        // if( $("#scroll_list .suspension_and_breaks").position().top < threshold){
        //     $("#scroll_item .s1").removeClass("active");
        //     $("#scroll_item .s2").removeClass("active"); 
        //     $("#scroll_item .s3").addClass("active");           
        // }
        if( $("#scroll_list .dimensions_and_capacity").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active"); 
            $("#scroll_item .s3").removeClass("active"); 
            $("#scroll_item .s4").addClass("active");            
        }
        if( $("#scroll_list .comfort_and_convenience").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active"); 
            $("#scroll_item .s3").removeClass("active"); 
            $("#scroll_item .s4").removeClass("active");   
            $("#scroll_item .s5").addClass("active");            
        }
        if( $("#scroll_list .tech_interior").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active");
            $("#scroll_item .s3").removeClass("active");
            $("#scroll_item .s4").removeClass("active");
            $("#scroll_item .s5").removeClass("active");
            $("#scroll_item .s6").addClass("active");
        }
        if( $("#scroll_list .tech_exterior").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active"); 
            $("#scroll_item .s3").removeClass("active"); 
            $("#scroll_item .s4").removeClass("active");   
            $("#scroll_item .s5").removeClass("active");
            $("#scroll_item .s6").removeClass("active");
            $("#scroll_item .s7").addClass("active");
        }
        if( $("#scroll_list .safety").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active"); 
            $("#scroll_item .s3").removeClass("active"); 
            $("#scroll_item .s4").removeClass("active");   
            $("#scroll_item .s5").removeClass("active"); 
            $("#scroll_item .s6").removeClass("active");
            $("#scroll_item .s7").removeClass("active");  
            $("#scroll_item .s8").addClass("active");
        }
        if( $("#scroll_list .entertainment_and_communication").position().top < threshold){
            $("#scroll_item .s1").removeClass("active");
            $("#scroll_item .s2").removeClass("active"); 
            $("#scroll_item .s3").removeClass("active"); 
            $("#scroll_item .s4").removeClass("active");   
            $("#scroll_item .s5").removeClass("active"); 
            $("#scroll_item .s6").removeClass("active");
            $("#scroll_item .s7").removeClass("active");  
            $("#scroll_item .s8").removeClass("active");          
            $("#scroll_item .s9").addClass("active");          
        }        
        if( $("#scroll_list .fuel_and_performance").position().top > threshold){            
            $("#scroll_item .s2").removeClass("active");            
        }
        if( $("#scroll_list .suspension_and_breaks").position().top > threshold){
            $("#scroll_item .s3").removeClass("active");           
        }
        if( $("#scroll_list .dimensions_and_capacity").position().top > threshold){
            $("#scroll_item .s4").removeClass("active");            
        }
        if( $("#scroll_list .comfort_and_convenience").position().top > threshold){              
            $("#scroll_item .s5").removeClass("active");            
        }
        if( $("#scroll_list .tech_interior").position().top > threshold){
            $("#scroll_item .s6").removeClass("active");
        }
        if( $("#scroll_list .tech_exterior").position().top > threshold){
            $("#scroll_item .s7").removeClass("active");
        }
        if( $("#scroll_list .safety").position().top > threshold){
            $("#scroll_item .s8").removeClass("active");
        }
        if( $("#scroll_list .entertainment_and_communication").position().top > threshold){         
            $("#scroll_item .s9").removeClass("active");          
        }
        
    });
    
    //$("#inspectionreportmodal").show();

    //var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));

    //Load Carousel Images   
    let interiorImage;
    let exteriorImage;
    let engineImage;

    //let interiorImage;

    await axios.get("/api/v1/image/interoir/photos/"+id+"/").then( (res) => { 
        interiorImage = res.data["data"];
        
        for(i = 0; i < interiorImage.length; i++) 
        {
            $("#car_carousel_control .carousel-inner").append(`
                <div class="carousel-item `+(i == 0 ? "active" : "")+`">
                <img src="`+interiorImage[i].image+`" class="carousel_images"  alt="...">
                </div>`
            );
        };
    });

    await axios.get("/api/v1/image/exterior/photos/"+id+"/").then( (res) => { 
        exteriorImage = res.data["data"];
        
        for(i = 0; i < exteriorImage.length; i++) 
        {
            $("#car_carousel_control .carousel-inner").append(`
                <div class="carousel-item ">
                <img src="`+exteriorImage[i].image+`" class="carousel_images"  alt="...">
                </div>`
            );        
        };
    });

    await axios.get("/api/v1/image/engine/photos/"+id+"/").then( (res) => { 
        engineImage = res.data["data"];
        //console.log({interiorImage});
        for(i = 0; i < engineImage.length; i++) 
        {
            $("#car_carousel_control .engine").append(`
                <div class="carousel-item `+(i == 0 ? "active" : "")+`">
                <img src="`+engineImage[i].image+`" class="carousel_images"  alt="...">
                </div>`
            );
        
        };
    });

    // $("#car_carousel_control .exterior").hide();
    // $("#car_carousel_control .engine").hide();
    // $("#car_carousel_control .wheels").hide();  
    
    $("#interior_carousel_image").on("click", () => {
        $("#car_carousel_control .interior").show();
        $("#car_carousel_control .exterior").hide();
        $("#car_carousel_control .engine").hide();
        $("#car_carousel_control .wheels").hide();

        $("#interior_carousel_image").addClass("active");
        $("#exterior_carousel_image").removeClass("active");
        $("#engine_carousel_image").removeClass("active");
        $("#wheels_carousel_image").removeClass("active"); 
        
        $(".car_carousel .title .carouselTitle").html("INTERIOR");
    });

    $("#exterior_carousel_image").on("click", () => {

        $("#car_carousel_control .interior").hide();
        $("#car_carousel_control .exterior").show();
        $("#car_carousel_control .engine").hide();
        $("#car_carousel_control .wheels").hide();

        $("#interior_carousel_image").removeClass("active");
        $("#exterior_carousel_image").addClass("active");
        $("#engine_carousel_image").removeClass("active");
        $("#wheels_carousel_image").removeClass("active");
        
        $(".car_carousel .title .carouselTitle").html("EXTERIOR");
    });

    $("#engine_carousel_image").on("click", () => {
        $("#car_carousel_control .interior").hide();
        $("#car_carousel_control .exterior").hide();
        $("#car_carousel_control .engine").show();
        $("#car_carousel_control .wheels").hide();

        $("#interior_carousel_image").removeClass("active");
        $("#exterior_carousel_image").removeClass("active");
        $("#engine_carousel_image").addClass("active");
        $("#wheels_carousel_image").removeClass("active");

        $(".car_carousel .title .carouselTitle").html("ENGINE");
    });

    $("#wheels_carousel_image").on("click", () => {
        $("#car_carousel_control .interior").hide();
        $("#car_carousel_control .exterior").hide();
        $("#car_carousel_control .engine").hide();
        $("#car_carousel_control .wheels").show();

        $("#interior_carousel_image").removeClass("active");
        $("#exterior_carousel_image").removeClass("active");
        $("#engine_carousel_image").removeClass("active");
        $("#wheels_carousel_image").addClass("active");

        $(".car_carousel .title .carouselTitle").html("WHEELS");
    });

    basic = carDetails["basic"];
    comfortConv = carDetails["comfort_and_convenience"];
    dimenCapacity = carDetails["dimensions_and_capacity"];
    engTransmission = carDetails["engine_and_transmission"];
    entComm = carDetails["entertainment_and_communication"];
    exterior = carDetails["exterior"];
    exteriorReport = carDetails["exteriors_report"];
    features = carDetails["features"];
    fuelPerformance = carDetails["fuel_and_performance"];
    hoodBonnet = carDetails["hood_and_bonnet"];    
    interior = carDetails["interior"];
    interiorReport = carDetails["interiors_report"];
    overAllRating = carDetails["over_all_rating"];
    safety = carDetails["safety"];
    suspension = carDetails["suspension_and_brakes"];
    functions = carDetails["system_and_functions"];
    docs = carDetails["vehicle_documents"];
    wheels = carDetails["wheels"];  
    
    //CAR DETAILS
    let logo;
    await axios.get("/api/v1/main/cars/all/brands/").then( (res) => { 
        logo = res.data["data"];        
    });
    
    //debugger;

    $(".header-logo").append( `<img class="logo" width="50px" src="`+logo[basic["brand"]]+`" alt="">` );
    $(".car_title").html( basic["brand"].toUpperCase() +" "+ basic["model"].toUpperCase() +" "+ basic["manufacture_year"] );
    $(".carPrice").html("&#8377;" + basic["price"] );
    //console.log(basic["brand"]);

    //General Details
    $(".general_details .make_year .body").html(basic["manufacture_year"]);
    $(".general_details .fuel .body").html(fuelPerformance["fule_type"]);
    $(".general_details .km_driven .body").html(basic["kilometer"]);
    $(".general_details .transmission .body").html(engTransmission["transmission_type"]);
    $(".general_details .no_of_owners .body").html(docs["number_of_owner"]);
    $(".general_details .insurance_validity .body").html(docs["insurance"] > 0 ? 'Yes' : 'No');
        
    // Inspection report modal

    let thumb = await axios.get("/api/v1/image/thumbnail/photos/"+id+"/");
    image = thumb.data.data[0].image;
    
    // --- Zeroo Rating
    $(".overall_rating_section .title .carName").html(basic["brand"].toUpperCase() +" "+ basic["model"].toUpperCase());

    $(".overall_rating_section .image_container ").append(`
    <img src="`+image+`" alt="Car Image">`);

    $(".overall_rating_section .zeroo_rating .rating").html(overAllRating["zeroo_rating"]+'/5');
    
    $(".overall_rating_exterior .rating").html(overAllRating["exterior_condition"]+'/5');
    $(".overall_rating_engine  .rating").html((overAllRating["engine_rating"] ? '' : '2' )+'/5');
    $(".overall_rating_interior .rating").html(overAllRating["interior_condition"]+'/5');
    $(".overall_rating_checkpoint  .rating").html(overAllRating["checkpoints_fulfilled"]+'/5');

    for(i=0; i < 5; i++){
        let html = "";
        
        if(i < overAllRating["zeroo_rating"]){
            html = '<i class="fas fa-star"></i>';
        }
        else{
            html = '<i class="far fa-star"></i>';
        }
        
        $(".zeroo_rating .rating_group ").append(html);
    }

    $(".zeroo_rating .rating_group i").css("color", "#5ece5e");

    if( overAllRating["zeroo_rating"] < 2 ){
        $(".zeroo_rating .rating_group i").css("color", "#bb4444");
    }
    else if( overAllRating["zeroo_rating"] < 4 ){
        $(".zeroo_rating .rating_group i").css("color", "#ffcb2d");
    }


    for(const item in exteriorReport){        
        for(i=0; i < 5; i++){
            let html = "";

            if(i < exteriorReport[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            $(".exterior_rating_section ."+item+" .rating").append(html);

        }

        $(".exterior_rating_section ."+item+" .rating i").css("color", "#5ece5e");

        if( exteriorReport[item] < 2 ){
            $(".exterior_rating_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if(exteriorReport[item] < 4){
            $(".exterior_rating_section ."+item+" .rating i").css("color", "#ffcb2d");
        }        
                
    }
    
    for(const item in interiorReport){        
        for(i=0; i < 5; i++){
            let html = "";
            
            if(i < interiorReport[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            if(item != "jack_and_tommy_available" && item != "wheel_spanner_available" && item != "cruise_control"){

                $(".interior_rating_section ."+item+" .rating").append(html);
            }

        }
        
        if( interiorReport[item] < 2 ){
            $(".interior_rating_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if(interiorReport[item] < 4){
            $(".interior_rating_section ."+item+" .rating i").css("color", "#ffcb2d");
        }
                
    }

    for(const item in functions){        
        for(i=0; i < 5; i++){
            let html = "";
            
            if(i < functions[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            if(item != "abs" && item != "esp" && item != "heater" && item != "airbags"){
                $(".system_and_functions_rating_section ."+item+" .rating").append(html);
            }

        }
        
        if( functions[item] < 2 ){
            $(".system_and_functions_rating_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if(functions[item] < 4){
            $(".system_and_functions_rating_section ."+item+" .rating i").css("color", "#ffcb2d");
        }
                
    }

    for(const item in suspension){        
        for(i=0; i < 5; i++){
            let html = "";
            
            if(i < suspension[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            $(".suspension_and_brakes_section ."+item+" .rating").append(html);

        }
        
        if( suspension[item] < 2 ){
            $(".suspension_and_brakes_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if(suspension[item] < 4){
            $(".suspension_and_brakes_section ."+item+" .rating i").css("color", "#ffcb2d");
        }
                
    }
    
    for(const item in hoodBonnet){        
        for(i=0; i < 5; i++){
            let html = "";
            
            if(i < hoodBonnet[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            $(".hood_and_bonnet_section ."+item+" .rating").append(html);

        }
        
        if( hoodBonnet[item] < 2 ){
            $(".hood_and_bonnet_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if( hoodBonnet[item] < 4 ){
            $(".hood_and_bonnet_section ."+item+" .rating i").css("color", "#ffcb2d");
        }
                
    }

    for(const item in wheels){        
        for(i=0; i < 5; i++){
            let html = "";
            
            if(i < wheels[item]){
                html = '<i class="fas fa-star"></i>';
            }
            else{
                html = '<i class="far fa-star"></i>';
            }

            if(item != "alloy_wheels"){
                $(".wheels_rating_section ."+item+" .rating").append(html);
            }
        }
        
        if( wheels[item] < 2 ){
            $(".wheels_rating_section ."+item+" .rating i").css("color", "#bb4444");
        }
        else if( wheels[item] < 4 ){
            $(".wheels_rating_section ."+item+" .rating i").css("color", "#ffcb2d");
        }
                
    }

    let check = '<i class="fa fa-check" aria-hidden="true" style="color:#5ece5e;"></i>';
    let close = '<i class="fa fa-close" style="color:#bb4444;" aria-hidden="true"></i>';

    $(".interior_rating_section .jack_and_tommy_available .rating").append(interiorReport["jack_and_tommy_available"] >= 1 ? check : close );
    $(".interior_rating_section .wheel_spanner_available .rating").append(interiorReport["wheel_spanner_available"] >= 1 ? check : close );
    $(".interior_rating_section .cruise_control .rating").append(interiorReport["cruise_control"] >= 1 ? check : close );
    
    $(".system_and_functions_rating_section .abs .rating").append(functions["abs"] >= 1 ? check : close );
    $(".system_and_functions_rating_section .esp .rating").append(functions["esp"] >= 1 ? check : close );
    $(".system_and_functions_rating_section .heater .rating").append(functions["heater"] >= 1 ? check : close );
    $(".system_and_functions_rating_section .airbags .rating").append(functions["airbags"] >= 1 ? check : close );

    $(".wheels_rating_section .alloy_wheels .rating").html(wheels["alloy_wheels"] >= 1 ? check : close);

    $(".documents_rating_section .insurance .rating").append(docs["insurance"] >= 1 ? check : close );
    $(".documents_rating_section .rc_status .rating").append(docs["rc_status"] >= 1 ? check : close );
    $(".documents_rating_section .fc_validity .rating").append(docs["fc_validity"] >= 1 ? check : close );

    $(".documents_rating_section .number_of_owner .rating").html(docs["number_of_owner"]);

    //Specification And Feature Section
    $(".specification_and_feature .specification .head").html("Key Specifications of "+basic["brand"].toUpperCase() +" "+ basic["model"].toUpperCase());
    $(".specification_and_feature .specification .specArai .right").html( fuelPerformance["mileage_arai"] );
    $(".specification_and_feature .specification .specFuelType .right").html( fuelPerformance["fule_type"] );
    $(".specification_and_feature .specification .specCylinder .right").html(  engTransmission["number_of_cylinder"] );
    $(".specification_and_feature .specification .specMaxTorque .right").html( engTransmission["max_torque"] );
    $(".specification_and_feature .specification .specBodyType .right").html( dimenCapacity["body_type"] );
    $(".specification_and_feature .specification .specCityMileage .right").html( fuelPerformance["city_mileage"] );
    $(".specification_and_feature .specification .specEngineDisplacement .right").html( engTransmission[""] );    
    $(".specification_and_feature .specification .specPower .right").html( engTransmission["max_power"] );
    $(".specification_and_feature .specification .specSeat .right").html( dimenCapacity["seating_capacity"] );
    $(".specification_and_feature .specification .specFuelCapacity .right").html( fuelPerformance["fuel_tank_capacity"] );
    
    $(".specification_and_feature .features .head").html("Key Features of "+basic["brand"].toUpperCase() +" "+ basic["model"].toUpperCase());
    $(".specification_and_feature .features .fPowerSteering .right").html( features["power_steering"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fLBS .right").html( safety["anti_lock_braking_system"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fAirbag .right").html( safety["anti_lock_braking_system"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fClimateControl .right").html( features["automatic_climate_control"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fAlloyWheels .right").html( features["alloy_wheels"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fPowerWindow .right").html( features["power_windows_front"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fAirConditioner .right").html( features["air_conditioner"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fPassengerAirbag .right").html( features["passenger_airbag"] > 0 ? 'Yes' : 'No' );
    $(".specification_and_feature .features .fFogLight .right").html( features["fog_lights_front"] > 0 ? 'Yes' : 'No' );
    

    //Technical Specifications Section

    // --- Engine And Transmission
    
    $(".technical_specs .title .heading").html(basic["brand"].toUpperCase() +" "+ basic["model"].toUpperCase()+" Specifications");
    $(".technical_specs .engine_and_transmission .gear_box .right").html( engTransmission["gear_box"] );
    $(".technical_specs .engine_and_transmission .max_power .right").html( engTransmission["max_power"] );
    $(".technical_specs .engine_and_transmission .drive_type .right").html( engTransmission["drive_type"] );
    $(".technical_specs .engine_and_transmission .max_torque .right").html( engTransmission["max_torque"] );
    $(".technical_specs .engine_and_transmission .engine_type .right").html( engTransmission["engine_type"] );
    $(".technical_specs .engine_and_transmission .mild_hybrid .right").html( engTransmission["mild_hybrid"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .engine_and_transmission .super_charger .right").html( engTransmission["super_charger"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .engine_and_transmission .turbo_charger .right").html( engTransmission["turbo_charger"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .engine_and_transmission .cubic_capacity .right").html( engTransmission["cubic_capacity"] );
    $(".technical_specs .engine_and_transmission .transmission_type .right").html( engTransmission["transmission_type"] );
    $(".technical_specs .engine_and_transmission .number_of_cylinder .right").html( engTransmission["number_of_cylinder"] );
    $(".technical_specs .engine_and_transmission .valve_configration .right").html( engTransmission["valve_configration"] );
    $(".technical_specs .engine_and_transmission .valves_per_cylinder .right").html( engTransmission["valves_per_cylinder"] );
    
    
    // --- Fuel and Performance
    $(".technical_specs .fuel_and_performance .fuel_type .right").html( fuelPerformance["fule_type"] );
    $(".technical_specs .fuel_and_performance .city_mileage .right").html( fuelPerformance["city_mileage"] );
    $(".technical_specs .fuel_and_performance .mileage_arai .right").html( fuelPerformance["mileage_arai"] );
    $(".technical_specs .fuel_and_performance .fuel_tank_capacity .right").html( fuelPerformance["fuel_tank_capacity"] );
    $(".technical_specs .fuel_and_performance .emission_norm_compliance .right").html( fuelPerformance["emission_norm_compliance"] );


    // // --- Suspension and Brakes
    // $(".technical_specs .suspension_and_breaks .front_disc_and_pads .right").html( suspension["front_disc_and_pads"] );
    // $(".technical_specs .suspension_and_breaks .rear_drum_and_shoes .right").html( suspension["rear_drum_and_shoes"] );
    // $(".technical_specs .suspension_and_breaks .rear_shock_assembly .right").html( suspension["rear_shock_assembly"] );
    // $(".technical_specs .suspension_and_breaks .front_strut_assembly .right").html( suspension["front_strut_assembly"] );
    // $(".technical_specs .suspension_and_breaks .steering_box_assembly .right").html( suspension["steering_box_assembly"] );
    // $(".technical_specs .suspension_and_breaks .power_steering_assembly .right").html( suspension["power_steering_assembly"] );


    // -- Dimensions and Capacity
    $(".technical_specs .dimensions_and_capacity .width .right").html( dimenCapacity["width"] ? dimenCapacity["width"] : 'N/A' );
    $(".technical_specs .dimensions_and_capacity .height .right").html( dimenCapacity["height"]  );
    $(".technical_specs .dimensions_and_capacity .length .right").html( dimenCapacity["length"] );
    $(".technical_specs .dimensions_and_capacity .body_type .right").html( dimenCapacity["body_type"] );
    $(".technical_specs .dimensions_and_capacity .rear_tread .right").html( dimenCapacity["rear_tread"] );
    $(".technical_specs .dimensions_and_capacity .wheel_base .right").html( dimenCapacity["wheel_base"] );
    $(".technical_specs .dimensions_and_capacity .kerb_weight .right").html( dimenCapacity["kerb_weight"] );
    $(".technical_specs .dimensions_and_capacity .no_of_doors .right").html( dimenCapacity["no_of_doors"] );
    $(".technical_specs .dimensions_and_capacity .gross_weight .right").html( dimenCapacity["gross_weight"] );
    $(".technical_specs .dimensions_and_capacity .seating_capacity .right").html( dimenCapacity["seating_capacity"] );
    

    // -- Comfort And Convenience
    $(".technical_specs .comfort_and_convenience .heater .right").html( comfortConv["heater"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .power_boot .right").html( comfortConv["power_boot"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .trunk_light .right").html( comfortConv["trunk_light"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .usb_charger .right").html( comfortConv["usb_charger"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .rear_curtain .right").html( comfortConv["rear_curtain"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .battery_saver .right").html( comfortConv["battery_saver"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .keyless_entry .right").html( comfortConv["keyless_entry"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .rear_ac_vents .right").html( comfortConv["rear_ac_vents"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .tailgate_ajar .right").html( comfortConv["tailgate_ajar"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .vanity_mirror .right").html( comfortConv["vanity_mirror"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .voice_control .right").html( comfortConv["voice_control"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .cruise_control .right").html( comfortConv["cruise_control"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .power_steering .right").html( comfortConv["power_steering"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .air_conditioner .right").html( comfortConv["air_conditioner"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .parking_sensors .right").html( comfortConv["parking_sensors"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .cup_holders_rear .right").html( comfortConv["cup_holders_rear"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .cup_holders_front .right").html( comfortConv["cup_holders_front"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .glove_box_cooling .right").html( comfortConv["glove_box_cooling"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .heated_seats_rear .right").html( comfortConv["heated_seats_rear"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .navigation_system .right").html( comfortConv["navigation_system"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .rear_reading_lamp .right").html( comfortConv["rear_reading_lamp"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .foldable_rear_seat .right").html( comfortConv["foldable_rear_seat"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .heated_seats_front .right").html( comfortConv["heated_seats_front"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .power_windows_rear .right").html( comfortConv["power_windows_rear"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .power_windowsfront .right").html( comfortConv["power_windowsfront"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .rear_seat_headrest .right").html( comfortConv["rear_seat_headrest"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .adjustable_headrest .right").html( comfortConv["adjustable_headrest"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .adjustable_steering .right").html( comfortConv["adjustable_steering"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .air_quality_control .right").html( comfortConv["air_quality_control"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .remote_trunk_opener .right").html( comfortConv["remote_trunk_opener"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .seat_lumbar_support .right").html( comfortConv["seat_lumbar_support"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .find_my_car_location .right").html( comfortConv["find_my_car_location"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .gear_shift_indicator .right").html( comfortConv["gear_shift_indicator"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .luggage_hook_and_net .right").html( comfortConv["luggage_hook_and_net"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .lane_change_indicator .right").html( comfortConv["lane_change_indicator"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .accessory_power_outlet .right").html( comfortConv["accessory_power_outlet"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .low_fuel_warning_light .right").html( comfortConv["low_fuel_warning_light"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .remote_fuel_lid_opener .right").html( comfortConv["remote_fuel_lid_opener"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .central_console_armrest .right").html( comfortConv["central_console_armrest"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .smart_access_card_entry .right").html( comfortConv["smart_access_card_entry"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .engine_start_stop_button .right").html( comfortConv["engine_start_stop_button"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .remote_engine_start_stop .right").html( comfortConv["remote_engine_start_stop"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .active_noise_cancellation .right").html( comfortConv["active_noise_cancellation"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .automatic_climate_control .right").html( comfortConv["automatic_climate_control"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .rear_seat_centre_arm_rest .right").html( comfortConv["rear_seat_centre_arm_rest"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .real_time_vehicle_tracking .right").html( comfortConv["real_time_vehicle_tracking"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .comfort_and_convenience .steering_wheel_gearshift_paddles .right").html( comfortConv["steering_wheel_gearshift_paddles"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .height_adjustable_front_seat_belts .right").html( comfortConv["height_adjustable_front_seat_belts"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .comfort_and_convenience .drive_modes .right").html( comfortConv["drive_modes"] );


    // -- Interior
    $(".technical_specs .tech_interior .lighting .right").html( interior["lighting"] );
    $(".technical_specs .tech_interior .tachometer .right").html( interior["tachometer"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .tech_interior .digital_clock .right").html( interior["digital_clock"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .leather_seats .right").html( interior["leather_seats"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .digital_odometer .right").html( interior["digital_odometer"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .ventilated_seats .right").html( interior["ventilated_seats"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .cigarette_lighter .right").html( interior["cigarette_lighter"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .fabric_upholstery .right").html( interior["fabric_upholstery"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .glove_compartment .right").html( interior["glove_compartment"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .dual_tone_dashboard .right").html( interior["dual_tone_dashboard"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .leather_steering_wheel .right").html( interior["leather_steering_wheel"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .electric_adjustable_seats .right").html( interior["electric_adjustable_seats"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .folding_table_in_the_rear .right").html( interior["folding_table_in_the_rear"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .electronic_multi_tripmeter .right").html( interior["electronic_multi_tripmeter"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .outside__temperature_display .right").html( interior["outside__temperature_display"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .height_adjustable_driver_seat .right").html( interior["height_adjustable_driver_seat"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .driving_experience_control_eco .right").html( interior["driving_experience_control_eco"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_interior .leather_wrap_gear_shift_selector .right").html( interior["leather_wrap_gear_shift_selector"] > 0 ? 'Yes' : 'No');


    // -- Exterior
    $(".technical_specs .tech_exterior .led_drls .right").html( exterior["led_drls"]> 0 ? 'Yes' : 'No' );
    $(".technical_specs .tech_exterior .lighting .right").html( exterior["lighting"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .sun_roof .right").html( exterior["sun_roof"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .moon_roof .right").html( exterior["moon_roof"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .tyre_size .right").html( exterior["tyre_size"] );
    $(".technical_specs .tech_exterior .alloy_wheels .right").html( exterior["alloy_wheels"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .rear_spoiler .right").html( exterior["rear_spoiler"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .roof_carrier .right").html( exterior["roof_carrier"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .side_stepper .right").html( exterior["side_stepper"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .tinted_glass .right").html( exterior["tinted_glass"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .trunk_opener .right").html( exterior["trunk_opener"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .wheel_covers .right").html( exterior["wheel_covers"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .chrome_grille .right").html( exterior["chrome_grille"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .led_fog_lamps .right").html( exterior["led_fog_lamps"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .chrome_grille .right").html( exterior["chrome_grille"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .power_antenna .right").html( exterior["power_antenna"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .chrome_garnish .right").html( exterior["chrome_garnish"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .led_headlights .right").html( exterior["led_headlights"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .led_taillights .right").html( exterior["led_taillights"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .fog_lights_rear .right").html( exterior["fog_lights_rear"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .smoke_headlamps .right").html( exterior["smoke_headlamps"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .fog_lights_front .right").html( exterior["fog_lights_front"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .alloy_wheels_size .right").html( exterior["alloy_wheels_size"] );
    $(".technical_specs .tech_exterior .halogen_headlamps .right").html( exterior["halogen_headlamps"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .rear_window_wiper .right").html( exterior["rear_window_wiper"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .integrated_antenna .right").html( exterior["integrated_antenna"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .rain_sensing_wiper .right").html( exterior["rain_sensing_wiper"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .rear_window_washer .right").html( exterior["rear_window_washer"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .rear_window_defogger .right").html( exterior["rear_window_defogger"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .adjustable_headlights .right").html( exterior["adjustable_headlights"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .removable_convertible_top .right").html( exterior["removable_convertible_top"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .electric_folding_rear_view_mirror .right").html( exterior["electric_folding_rear_view_mirror"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .outside_rear_view_mirror_turn_indicators .right").html( exterior["outside_rear_view_mirror_turn_indicators"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .power_adjustable_exterior_rear_view_mirror .right").html( exterior["power_adjustable_exterior_rear_view_mirror"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .tech_exterior .manually_adjustable_exterior_rear_view_mirror .right").html( exterior["manually_adjustable_exterior_rear_view_mirror"] > 0 ? 'Yes' : 'No' );




    // -- SAFETY
    $(".technical_specs .safety .ebd .right").html( safety["rain_sensing_wiper"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .clutch_lock .right").html( safety["rain_sensing_wiper"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .hill_assist .right").html( safety["rain_sensing_wiper"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .rear_camera .right").html( safety["rain_sensing_wiper"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .brake_assist .right").html( safety["rain_sensing_wiper"]  > 0 ? 'Yes' : 'No');
    $(".technical_specs .safety .crash_sensor .right").html( safety["crash_sensor"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .knee_airbags .right").html( safety["knee_airbags"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .driver_airbag .right").html( safety["driver_airbag"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .central_locking .right").html( safety["central_locking"]  > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .geo_fence_alert .right").html( safety["geo_fence_alert"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .head_up_display .right").html( safety["head_up_display"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .rear_seat_belts .right").html( safety["rear_seat_belts"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .view_camera_360 .right").html( safety["view_camera_360"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .xenon_headlamps .right").html( safety["xenon_headlamps"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .adjustable_seats .right").html( safety["adjustable_seats"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .anti_theft_alarm .right").html( safety["anti_theft_alarm"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .number_of_airbag .right").html( safety["number_of_airbag"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .passenger_airbag .right").html( safety["passenger_airbag"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .power_door_locks .right").html( safety["power_door_locks"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .side_airbag_rear .right").html( safety["side_airbag_rear"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .traction_control .right").html( safety["traction_control"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .anti_theft_device .right").html( safety["anti_theft_device"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .door_ajar_warning .right").html( safety["door_ajar_warning"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .seat_belt_warning .right").html( safety["seat_belt_warning"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .side_airbag_front .right").html( safety["side_airbag_front"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .side_impact_beams .right").html( safety["side_impact_beams"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .blind_spot_monitor .right").html( safety["blind_spot_monitor"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .child_safety_locks .right").html( safety["child_safety_locks"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .engine_immobilizer .right").html( safety["engine_immobilizer"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .front_impact_beams .right").html( safety["front_impact_beams"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .automatic_headlamps .right").html( safety["automatic_headlamps"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .engine_check_warning .right").html( safety["engine_check_warning"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .hill_descent_control .right").html( safety["hill_descent_control"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .tyre_pressure_monitor .right").html( safety["tyre_pressure_monitor"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .anti_lock_braking_system .right").html( safety["anti_lock_braking_system"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .follow_me_home_headlamps .right").html( safety["follow_me_home_headlamps"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .isofix_child_seat_mounts .right").html( safety["isofix_child_seat_mounts"]  > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .centrally_mounted_fuel_tank .right").html( safety["centrally_mounted_fuel_tank"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .electronic__stability_control .right").html( safety["electronic__stability_control"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .speed_sensing_auto_door__lock .right").html( safety["speed_sensing_auto_door__lock"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .day_and_night_rear_view_mirror .right").html( safety["day_and_night_rear_view_mirror"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .impact_sensing_auto_door_unlock .right").html( safety["impact_sensing_auto_door_unlock"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .passenger_side_rear_view_mirror .right").html( safety["passenger_side_rear_view_mirror"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .vehicle_stability_control_system .right").html( safety["vehicle_stability_control_system"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .safety .pretensioners_and_force_limiter_seatbelts .right").html( safety["pretensioners_and_force_limiter_seatbelts"] > 0 ? 'Yes' : 'No' );

    // -- Entertainment And Communication
    $(".technical_specs .entertainment_and_communication .radio .right").html( entComm["radio"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .cd_player .right").html( entComm["cd_player"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .entertainment_and_communication .cd_changer .right").html( entComm["cd_changer"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .dvd_player .right").html( entComm["dvd_player"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .android_auto .right").html( entComm["android_auto"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .connectivity .right").html( entComm["connectivity"] );
    $(".technical_specs .entertainment_and_communication .touch_screen .right").html( entComm["touch_screen"] > 0 ? 'Yes' : 'No');
    $(".technical_specs .entertainment_and_communication .apple_carplay .right").html( entComm["apple_carplay"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .speakers_rear .right").html( entComm["speakers_rear"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .speakers_front .right").html( entComm["speakers_front"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .internal_storage .right").html( entComm["internal_storage"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .touch_screen_size .right").html( entComm["touch_screen_size"]  );
    $(".technical_specs .entertainment_and_communication .wifi_connectivity .right").html( entComm["wifi_connectivity"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .number_of_speakers .right").html( entComm["number_of_speakers"]  );
    $(".technical_specs .entertainment_and_communication .integrated_2din_audio .right").html( entComm["integrated_2din_audio"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .bluetooth_connectivity .right").html( entComm["bluetooth_connectivity"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .usb_and_auxiliary_input .right").html( entComm["usb_and_auxiliary_input"]  > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .rear_entertainment_system .right").html( entComm["rear_entertainment_system"] > 0 ? 'Yes' : 'No' );
    $(".technical_specs .entertainment_and_communication .audio_system_remote_control .right").html( entComm["audio_system_remote_control"] > 0 ? 'Yes' : 'No' );
    







}    


$(".specific_car").ready( specific_car_fn );