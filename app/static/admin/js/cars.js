
car_functions = () => {
    
    let id;
    let images = [];

    let archiveOffset = 0;
    let liveOffset = 0;
    let soldOffset = 0;
    let limit = 20;

    let car_image_get = "/api/v1/image/thumbnail/photos/";
    let car_image_upload = "/api/v1/admin/thumbnail/photos/";
    let car_image_delete = "/api/v1/admin/thumbnail/photos/";

    Object.defineProperty(String.prototype, 'capitalize', {
        value: function() {
          return this.charAt(0).toUpperCase() + this.slice(1);
        },
        enumerable: false
    });

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    // Register the plugin
    FilePond.registerPlugin(FilePondPluginFilePoster);
    FilePond.registerPlugin(FilePondPluginFileRename);
    FilePond.registerPlugin(FilePondPluginFileValidateSize);
    FilePond.registerPlugin(FilePondPluginFileValidateType);
    
    FilePond.registerPlugin(FilePondPluginImageEdit);
    FilePond.registerPlugin(FilePondPluginImageCrop);
    FilePond.registerPlugin(FilePondPluginImageResize);
    FilePond.registerPlugin(FilePondPluginImagePreview);
    FilePond.registerPlugin(FilePondPluginImageTransform);
    FilePond.registerPlugin(FilePondPluginImageValidateSize);

    //INITIALISING FILEPOND
    var FilePondElement = document.querySelector("#thumbnail_filepond");   
    
    pond = FilePond.create( FilePondElement, {
        allowImageEdit : true,
        allowImageValidateSize : true,
        imageValidateSizeMaxWidth : 1920,
        imageValidateSizeMaxHeight : 1080,
    });
    
    $(".add-car").show();
    $(".list-car").hide();
    $(".archive-car").hide();
    
    //Load car brands
    axios.get("/api/v1/main/cars/all/brands/")
    .then( (res) => {
        data = res.data.data;        
        carBrand = Object.keys(data);

        carBrand.forEach((brandName) => {
            $('#car_brand').append(`<option value="`+brandName+`">`+brandName.capitalize()+`</option>`)
            $('#car_brand_update').append(`<option value="`+brandName+`">`+brandName.capitalize()+`</option>`) 
        });
    });

    //Load Fuel Types
    axios.get("/api/v1/main/cars/all/fuel_type/")
    .then( (res) => {
        data = res.data.data;

        data.forEach((d) => {
            $('#fule_type').append(`<option value="`+d.fuel_type+`">`+d.fuel_type+`</option>`)            
        });
    });

    get_form_data = (e) => {
        let formData = new FormData();
        formData.append("regestration_number", id);
        forms = e.target.form.elements;
        //debugger;
        //console.log(forms[0].id, forms[0].value);
        
        for(i = 0; i < forms.length; i++){
            
            if(e.target.form[i].type == "checkbox"){
                formData.append(forms[i].id, forms[i].checked);               
            }  
            else if(e.target.form[i].type == "number"){
                formData.append(forms[i].id, forms[i].value);                
            }
            else if(e.target.form[i].type == "text"){
                formData.append(forms[i].id, forms[i].value);                
            }
            else{
                formData.append(forms[i].id, forms[i].value);
            }
        }

        //console.log("formData:", formData);
        return formData;
    }
    
    insert_form_data = (data) => {
        keys = Object.keys(data);
        keys.shift();
        
        keys.forEach(i => {
            if( $("#"+i.toLowerCase())[0].type == "checkbox"){                
                if(data[i]){                    
                    $("#"+i.toLowerCase())[0].checked = true;
                }
                else{
                    $("#"+i.toLowerCase())[0].checked = false;
                }
            }
            else if($("#"+i.toLowerCase())[0].type == "number"){
                $("#"+i.toLowerCase())[0].value = data[i];
            }
            else if($("#"+i.toLowerCase())[0].type == "text"){
                $("#"+i.toLowerCase())[0].value = data[i];
            }
            else if($("#"+i.toLowerCase())[0].type == "select-one"){
                $("#"+i.toLowerCase())[0].value = data[i];
            }

            //console.log("Type:",$("#"+i.toLowerCase())[0].type);

        });
    }

    //Car navigation 
    $(".nav_add_car").on("click", () => {
        $(".nav_add_car").addClass("active");
        $(".nav_archive_car").removeClass("active");
        $(".navLiveCar").removeClass("active");
        $(".navSoldCars").removeClass("active");      

        $(".add-car").show();
        $(".list-car").hide();
        $(".archive-car").hide();
        $(".soldCars").hide();
    });

    //Load archive cars
    $(".nav_archive_car").on("click", nav_archive_car = (load = true) => {
        $(".nav_add_car").removeClass("active");
        $(".nav_archive_car").addClass("active");
        $(".navLiveCar").removeClass("active");
        $(".navSoldCars").removeClass("active");      

        $(".add-car").hide();
        $(".list-car").hide();
        $(".archive-car").show();
        $(".soldCars").hide();
        
        if(load){
            archiveOffset = 0; 
            $("#archive_car").empty();
            $(".loadMoreContainer").empty();

            $(".loadMoreContainer").append(`<button id="loadMore" style="cursor: pointer; font-size: 14px; padding: 6px 22px; border: 0; background-color: #FFD230; color: #454545;">Load More</button>`);
            $("#loadMore").click( ()=> { nav_archive_car(false) });
        }
        
        axios.get(`/api/v1/admin/cars/hidden/?offset=${archiveOffset}&limit=${limit}`).then( async (response) => {
            let list = response.data["data"];   

            if(!list.length || list.length < limit){
                $(".loadMoreContainer").empty();
            }

            for(i = 0; i < list.length; i++){
                let date = new Date( list[i]["created"] + "+00:00");
                
                // Image Ratio 16:9
                // Pixel size 520 * 292 For Thumbnail
                let image = list[i]["thumbnail"] == null ? '' : JSON.parse(list[i]["thumbnail"])[0].image;                
                
                //Incase No image present for thumbnail
                if(image.length <= 0 || image == '')
                {                    
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEiCAQAAACluOgzAAACgUlEQVR42u3TQQ0AAAgDMeZf9DDBi7QSLrm0AzwXo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkY3OhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHQRwOiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoY3ehgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRjQ5GB4wOGB0wOmB04MYCCatC/acif6YAAAAASUVORK5CYII=";
                }
                
                uniqueVal = list[i]["number_plate"];

                $("#archive_car").append(`
                    <div class="archive-car-card archive_card_`+ uniqueVal +` ">
                        <input type="checkbox" name="archive_checkbox" class="archive_card_checkbox archive_checkbox_`+ uniqueVal +`" id="`+ uniqueVal +`" >
                        <div class="archive_car_image_container ">
                            <img class="archive_car_image" src="`+image+`" alt="">
                        </div>
                        <div class="archive_card_content">
                            <input type="hidden" class="archive_id_`+ uniqueVal +`" value="`+ list[i]["regestration_number"] +`">
                            <span class="archive-title">`+ list[i]["car_name"].toUpperCase() +`</span>
                            <span class="archive-id small-1 "> `+ list[i]["number_plate"] +  ` </span>
                            <span class="archive-owner-name small-1">`+ list[i]["owner_name"] +`</span>
                            <span class="archive-date small-1" >`+ date.toLocaleString() +`</span>
                            <button class="archive_modify_btn archive_modify_btn_`+ uniqueVal +`" id="`+ uniqueVal +`" > Modify </button>
                                                        
                        </div>
                    </div>
                `);
                
                $(".archive_card_"+ uniqueVal +" .archive_card_content .archive_modify_btn_"+ uniqueVal)
                .click( (event) => {
                    id =  $(".archive_id_"+event.target.id.toString() ).val();
                    //$(".modal").css("display","block");
                    modifyCarsClick();
                });
                
                $(".archive_card_"+ uniqueVal +" .archive_checkbox_"+ uniqueVal)
                .click( (event) => {
                    val = event.target.checked;
                    id =  $(".archive_id_"+event.target.id.toString() ).val();
                    axios
                    .put("/api/v1/admin/car/"+ id +"/viewable/?viewable="+val)
                    .then(() => { 
                        nav_archive_car();
                    });                                                
                });
            }

        });

        archiveOffset += limit;
    });    

    //Load active cars
    $(".navLiveCar").on("click", navLiveCar = (load = true) => {
        $(".nav_add_car").removeClass("active");
        $(".nav_archive_car").removeClass("active");
        $(".navLiveCar").addClass("active");
        $(".navSoldCars").removeClass("active");

        $(".add-car").hide();
        $(".list-car").show();
        $(".archive-car").hide();
        $(".soldCars").hide();

        if(load){
            liveOffset = 0;
            $("#car_lists").empty();
            $(".loadMoreContainer").empty();

            $(".loadMoreContainer").append(`<button id="loadMore" style="cursor: pointer; font-size: 14px; padding: 6px 22px; border: 0; background-color: #FFD230; color: #454545;">Load More</button>`);
            $("#loadMore").click( ()=> { navLiveCar(false) });
        }

        axios.get(`/api/v1/admin/cars/?offset=${liveOffset}&limit=${limit}`).then( async (response) => {   
            let list = response.data["data"];

            if(!list.length || list.length < limit){
                $(".loadMoreContainer").empty();
            }

            //console.log(list);

            for(i=0; i < list.length; i++){
                let date = new Date( list[i]["created"] + "+00:00");
                
                // Image Ratio 16:9
                // Pixel size 520 * 292 For Thumbnail                              
                let image = list[i]["thumbnail"] == null ? '' : JSON.parse(list[i]["thumbnail"])[0].image;                
                
                //Incase No image present for thumbnail
                if(image.length <= 0 || image == '')
                {                    
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEiCAQAAACluOgzAAACgUlEQVR42u3TQQ0AAAgDMeZf9DDBi7QSLrm0AzwXo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkY3OhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHQRwOiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoY3ehgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRjQ5GB4wOGB0wOmB04MYCCatC/acif6YAAAAASUVORK5CYII=";
                }

                uniqueVal = list[i]["number_plate"];

                $("#car_lists").append(`
                    <div class="car-card card_`+ uniqueVal +` ">
                        <input type="checkbox" name="car_checkbox" class="car_card_checkbox car_checkbox_`+ uniqueVal +`" id="`+ uniqueVal +`" checked >
                        <div class="car_image_container ">
                            <img class="car_image" src="`+image+`" alt="">
                        </div>
                        <div class="card_content">
                            <input type="hidden" class="id_`+ uniqueVal +`" value="`+ list[i]["regestration_number"] +`">
                            <span class="title">`+ list[i]["car_name"].toUpperCase() +`</span>
                            <span class="id small-1 "> `+ list[i]["number_plate"] +  ` </span> 
                            <span class="owner_name small-1">`+ list[i]["owner_name"] +`</span>
                            <span class="date small-1" >`+ date.toLocaleString() +`</span>
                            <button class="modify_btn modify_btn_`+ uniqueVal +`" id="`+ uniqueVal +`"  width="50%"> Modify </button>
                            <button class="sold_btn sold_btn_`+ uniqueVal +`" id="`+ uniqueVal +`"  width="50%"> Sold </button>                            
                        </div>
                    </div>
                `);
                                                
                //Modify btn click
                $("#car_lists .card_"+ uniqueVal +" .card_content .modify_btn_"+ uniqueVal)
                .click( (event) => {                    
                    id =  $("#car_lists .id_"+event.target.id.toString() ).val();    
                    console.log(id);
                    modifyCarsClick();
                });
                
                //Sold btn click
                $("#car_lists .card_"+ uniqueVal +" .card_content .sold_btn_"+ uniqueVal)
                .click( (event) => {                    
                    id =  $(" .id_"+event.target.id.toString() ).val();                                     
                    $(".soldCarsModal").css("display","block");
                });
                
                $("#car_lists .card_"+ uniqueVal +" .car_checkbox_"+ uniqueVal)
                .click( (event) => {
                    val = event.target.checked;                        
                    id =  $("#car_lists .id_"+event.target.id.toString() ).val();
                    
                    axios
                    .put("/api/v1/admin/car/"+ id +"/viewable/?viewable="+val)
                    .then(() => { 
                        navLiveCar();
                    });;
                });
                
            }           

        });

        liveOffset += limit;
    });
    
    //Load sold cars
    $(".navSoldCars").on("click", navSoldCar = (load = true) => {
        $(".nav_add_car").removeClass("active");
        $(".nav_archive_car").removeClass("active");
        $(".navLiveCar").removeClass("active");
        $(".navSoldCars").addClass("active");

        $(".add-car").hide();
        $(".list-car").hide();
        $(".archive-car").hide();
        $(".soldCars").show();
        
        if(load){
            soldOffset = 0;
            $("#soldCars").empty();
            $(".loadMoreContainer").empty();
            
            $(".loadMoreContainer").append(`<button id="loadMoreSoldCar" style="cursor: pointer; font-size: 14px; padding: 6px 22px; border: 0; background-color: #FFD230; color: #454545;">Load More</button>`);
            $("#loadMoreSoldCar").click( ()=> { navSoldCar(false) });
        }
        
        axios.get(`/api/v1/admin/cars/sold/?offset=${soldOffset}&limit=${limit}`).then( async (response) => {
            let list = response.data["data"];

            if(!list.length || list.length < limit){
                $(".loadMoreContainer").empty();
            }               
            
            //console.log(list);

            for(i=0; i < list.length; i++){
                let date = new Date( list[i]["created"] + "+00:00");
                
                // Image Ratio 16:9
                // Pixel size 520 * 292 For Thumbnail
                let image = list[i]["thumbnail"] == null ? '' : JSON.parse(list[i]["thumbnail"])[0].image;                

                //Incase No image present for thumbnail
                if(image.length <= 0 || image == '')
                {                    
                    image="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAEiCAQAAACluOgzAAACgUlEQVR42u3TQQ0AAAgDMeZf9DDBi7QSLrm0AzwXo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkY3OhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHQRwOiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHYwOGB0wOmB0wOiA0QGjA0YHowNGB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOhgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB6MDRgeMDhgdMDpgdMDogNHB6IDRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoYHTA6YHTA6IDRAaMDRgeMDkYHjA4YHTA6YHTA6IDRAaMDRgejA0YHjA4YHTA6YHTA6IDRweiA0QGjA0YHjA4YHTA6YHQwOmB0wOiA0QGjA0YHjA4YHTA6GB0wOmB0wOiA0QGjA0YHjA5GB4wOGB0wOmB0wOiA0QGjg9EBowNGB4wOGB0wOmB0wOiA0cHogNEBowNGB4wOGB0wOmB0MDpgdMDogNEBowNGB4wOGB2MDhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRAaMDRgeMDhgdMDpgdMDoYHTA6IDRAaMDRgeMDhgdMDoY3ehgdMDogNEBowNGB4wOGB0wOhgdMDpgdMDogNEBowNGB4wORgeMDhgdMDpgdMDogNEBo4PRjQ5GB4wOGB0wOmB04MYCCatC/acif6YAAAAASUVORK5CYII=";
                }
                
                uniqueVal = list[i]["number_plate"];

                $("#soldCars").append(`
                    <div class="car-card card_`+ uniqueVal +` ">
                        <div class="car_image_container ">
                            <img class="car_image" src="`+image+`" alt="">
                        </div>
                        <div class="card_content">
                            <input type="hidden" class="id_`+ uniqueVal +`" value="`+ list[i]["regestration_number"] +`">
                            <span class="title">`+ list[i]["car_name"].toUpperCase() +`</span>
                            <span class="id small-1 "> `+ list[i]["number_plate"] +  ` </span> 
                            <span class="owner_name small-1">`+ list[i]["owner_name"] +`</span>
                            <span class="date small-1" >`+ date.toLocaleString() +`</span>
                            <button class="modify_btn modify_btn_`+ uniqueVal +`" id="`+ uniqueVal +`"  width="50%"> View </button>
                            <button class="sold_btn sold_btn_`+ uniqueVal +`" id="`+ uniqueVal +`"  width="50%"> Sold </button>                            
                        </div>
                    </div>
                `);
                
                $("#soldCars .card_"+ uniqueVal +" .card_content .modify_btn_"+ uniqueVal)
                .click( (event) => {                    
                    id =  $("#soldCars .id_"+event.target.id.toString() ).val();    
                    //console.log("sold", id);
                    modifyCarsClick(true);
                });

                $("#soldCars .card_"+ uniqueVal +" .card_content .sold_btn_"+ uniqueVal)
                .click( (event) => {                    
                    id =  $("#soldCars .id_"+event.target.id.toString() ).val();                                     
                    $(".soldCarsModal").css("display","block");
                });

                $("#soldCars .card_"+ uniqueVal +" .car_checkbox_"+ uniqueVal)
                .click( (event) => {
                    val = event.target.checked;                        
                    id =  $("#soldCars .id_"+event.target.id.toString() ).val();                    
                    axios
                    .put("/api/v1/admin/car/"+ id +"/viewable/?viewable="+val)
                    .then(() => { 
                        navLiveCar();
                    });;

                });
            }

        });

        soldOffset += limit;
        
    });
    
    //Add car click event 
    $("#add_car_submit").on("click", () => {
        let specialCharPattern = "^[a-zA-Z0-9]*$";
        let alphabetPattern = "^[a-zA-Z]+$";
        let numberPattern = "^[0-9]+$";
        
        let reg_number = ($("#reg_number").val().match(specialCharPattern) == null) ? '' : $("#reg_number").val();
        
        let owner_name = ($("#owner_name").val().match(alphabetPattern) == null) ? '' : $("#owner_name").val();

        let owner_number = ($("#owner_number").val().match(numberPattern) == null) ? '' : $("#owner_number").val();
        let chassis_number = ($("#chassis_number").val().match(specialCharPattern) == null) ? '' : $("#chassis_number").val();
        let history = $("#history").val();
        let kilometer = ($("#kilometer").val().match(numberPattern) == null) ? '' : $("#kilometer").val();
        let car_model = ($("#car_model").val().match(alphabetPattern) == null) ? '' : $("#car_model").val();
        let car_brand = ($("#car_brand").val().match(alphabetPattern) == null) ? '' : $("#car_brand").val();
        let car_mfg_year = ($("#car_mfg_year").val().match(numberPattern) == null) ? '' : $("#car_mfg_year").val();
        let car_color = ($("#car_color").val().match(alphabetPattern) == null) ? '' : $("#car_color").val();
        let car_price = ($("#car_price").val().match(numberPattern) == null) ? '' : $("#car_price").val();

        //console.log(reg_number,owner_name,owner_number,chassis_number,kilometer );
        const errorMessage =
            reg_number == '' ? "Fill Registartion number" :
            owner_name == '' ? "Fill Owner Name" :
            owner_number == '' ? "Fill Owner Number" :
            chassis_number == '' ? "Fill Chassis Number" :
            kilometer == '' ? "Fill Kilometer" :
            car_model == '' ? "Fill Car Model" :
            car_brand == '' ? "Fill Car Brand" :
            car_mfg_year == '' ? "Fill Car Manufacture Year" :
            car_color == '' ? "Fill Car Color" :
            car_price == '' ? "Fill Car Price" : null;

        if (errorMessage) {
            alert(errorMessage);
            return;
        }
        
        //console.log(car_model,car_brand,car_mfg_year,car_color,car_price );
        // if(car_model == '' || car_brand == '' || car_mfg_year == '' || car_color == '' || car_price == ''){
        //     console.log( {car_model, car_brand, car_mfg_year, car_color, car_price })
        //     alert("Fill all details");
        //     return
        // }
        
        let form = new FormData();
        form.append("number_plate", reg_number);
        form.append("owner_name", owner_name);
        form.append("owner_phone_number", owner_number);
        form.append("chassis_number", chassis_number);
        form.append("history", history);
        form.append("kilometer", kilometer);
        form.append("model", car_model);
        form.append("brand", car_brand);
        form.append("manufacture_year", car_mfg_year);
        form.append("color", car_color); 
        form.append("price", car_price);     

        //console.log("success");

        axios
        .post("/api/v1/admin/car/", form)
        .then((response) => {
                alert("Created successfully");
                location.reload();          
            },            
            (error) => {                
            alert(error.response.data['message']);            
        });    
        
    });
    
    //Modify Car Informations MODAL
    modifyCarsClick = (sold = false) => {
        $(".amendCarDetail").css("display","block");
                
        //Initial Modal loading
        axios.get("/api/v1/admin/basic/"+id+"/")
        .then( (response) => {
            let data = response.data["data"];

            $("#car_brand_update").val(data['BRAND']);
            $("#car_model_update").val(String(data.MODEL).capitalize());
            $("#car_mfg_year_update").val(data.MANUFACTURE_YEAR);
            $("#reg_number_update").val(data.number_plate);
            $("#kilometer_update").val(data.KILOMETER);
            $("#car_color_update").val(data.COLOR);
            $("#owner_name_update").val(data.OWNER_NAME);
            $("#owner_number_update").val(data.OWNER_PHONE_NUMBER);
            $("#chassis_number_update").val(data.CHASSIS_NUMBER);
            $("#car_price_update").val(data.price);
            $("#history_update").val(data.HISTORY);
        });

        //#region  Modify Car Info
        $("#cac_apply").click( (e) => {
            e.preventDefault();       
            data = get_form_data(e);        
            axios
            .post("/api/v1/admin/comfort_and_convenience/", data)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success"); 
                }
            });
        });

        $("#dac_apply").click( (e) => {
            e.preventDefault();        
            data = get_form_data(e);
            // console.log("Data", data);
            // console.log("Data", e);
            axios
            .post("/api/v1/admin/dimensions_and_capacity/", data)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");
                }            
            },(error) => { alert("Fill all fields"); });
        });

        $("#eat_apply").click( (e) => {
            e.preventDefault();       
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/engine_and_transmission/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert(error.message); });
        });

        $("#eac_apply").click( (e) => {
            e.preventDefault();       
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/entertainment_and_communication/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }           
            },(error) => { alert(error.message); });
            
                
        });

        $("#exterior_apply").click( (e) => {
            e.preventDefault();       
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/exterior/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
                else{
                    alert("Failed");
                }
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#extrep_apply").click( (e) => {
            e.preventDefault();       
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/exteriors_report/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
                else{
                    alert("Failed");
                }
            },(error) => { alert("Fill all fields"); });
            
                
        });

        $("#feature_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/features/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
                else{
                    alert("Failed");
                }
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#fap_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/fuel_and_performance/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#hab_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/hood_and_bonnet/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
                else{
                    alert("Failed");
                }
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#intr_apply").click( (e) => {
            e.preventDefault();
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/interior/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
                else{
                    alert("Failed");
                }
            },(error) => { alert("Fill all fields"); });            
        });

        $("#intrp_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/interiors_report/", dat)
            .then((response)=>{            
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#oar_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/over_all_rating/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#safety_apply").click( (e) => {
            e.preventDefault();        
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/safety/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#sab_apply").click( (e) => {
            e.preventDefault();       
            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/suspension_and_brakes/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });
                
        });

        $("#saf_apply").click( (e) => {
            e.preventDefault();        

            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/system_and_functions/", dat)
            .then((response)=>{            
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });             
        });

        $("#vd_apply").click( (e) => {
            e.preventDefault();        

            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/vehicle_documents/", dat)
            .then((response)=>{
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });             
        });

        $("#whl_apply").click( (e) => {
            e.preventDefault();        

            dat = get_form_data(e);
            axios
            .post("/api/v1/admin/wheels/", dat)
            .then((response)=>{
                //console.log(response);
                if(response.data["code"] == 200){
                    alert("Success");               
                }            
            },(error) => { alert("Fill all fields"); });
                
        });
        //#endregion
        
        if(sold){
            $("#update_car_submit").hide();
            $("#cac_apply").hide();
            $("#dac_apply").hide();
            $("#eat_apply").hide();
            $("#eac_apply").hide();
            $("#exterior_apply").hide();
            $("#extrep_apply").hide();
            $("#feature_apply").hide();
            $("#fap_apply").hide();
            $("#hab_apply").hide();
            $("#intr_apply").hide();
            $("#intrp_apply").hide();
            $("#oar_apply").hide();
            $("#safety_apply").hide();
            $("#sab_apply").hide();
            $("#saf_apply").hide();
            $("#vd_apply").hide();
            $("#whl_apply").hide();
        }
    }
    
    //UPDATE BASIC/GENERAL CAR DETAILS
    $("#update_car_submit").click( () => {
        let form = new FormData();
        form.append("brand", $("#car_brand_update").val());
        form.append("model", $("#car_model_update").val());
        form.append("manufacture_year", $("#car_mfg_year_update").val());
        form.append("number_plate", $("#reg_number_update").val() );
        form.append("kilometer", $("#kilometer_update").val());
        form.append("color", $("#car_color_update").val());
        form.append("owner_name", $("#owner_name_update").val());
        form.append("owner_phone_number", $("#owner_number_update").val());
        form.append("chassis_number", $("#chassis_number_update").val());
        form.append("price", $("#car_price_update").val());
        form.append("history", $("#history_update").val());
        
        form.append("regestration_number", id);
        //console.log(form);
        //debugger;
        axios.put("/api/v1/admin/car/", form)
        .then((response)=>{
            if(response.data["code"] == 200){
                alert("Success"); 
            }
        });

    });

    //Sold Car click event
    $("#soldCarSubmit").click( () => {

        let price = $("#soldPrice").val();
        let date = $("#soldDate").val();

        if(date == null || date == '' ){
            alert('Please select a date');
            return;
        }
        
        if( !hasNumber(price) ){
            alert('Enter valid price');
            return;
        }        

        let form = new FormData();

        form.append("reg_no", id);
        form.append("price", price);
        form.append("date", date);        
        form.append("sold_notes", $("#soldNotes").val());
        
        axios.post("/api/v1/admin/cars/sold/", form)
        .then((response)=> {

            if(response.data["code"] == 200){
                alert("Success"); 
            }

            window.location.reload();

        });

    });

    //#region Accordions
    var acc = document.getElementsByClassName("accordion");

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            
            var panel = this.nextElementSibling;

            if (panel.style.display === "grid") {
                panel.style.display = "none";
            }
            else {
                panel.style.display = "grid";
                
                if(panel.classList[0] == "comfort_and_convenience"){                    
                    axios.get("/api/v1/admin/comfort_and_convenience/"+id+"/")
                    .then( (response) => { 
                        //console.log(response.data["data"]); 
                        insert_form_data(response.data["data"]);  
                                    
                    })
                }
                else if(panel.classList[0] == "dimensions_and_capacity"){
                    axios.get("/api/v1/admin/dimensions_and_capacity/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "engine_and_transmission"){
                    axios.get("/api/v1/admin/engine_and_transmission/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "entertainment_and_communication"){
                    axios.get("/api/v1/admin/entertainment_and_communication/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "exterior"){                    
                    axios.get("/api/v1/admin/exterior/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "exteriors_report"){                    
                    axios.get("/api/v1/admin/exteriors_report/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "features"){                    
                    axios.get("/api/v1/admin/features/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "fuel_and_performance"){                    
                    axios.get("/api/v1/admin/fuel_and_performance/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "hood_and_bonnet"){                    
                    axios.get("/api/v1/admin/hood_and_bonnet/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "interior"){                    
                    axios.get("/api/v1/admin/interior/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "interiors_report"){                    
                    axios.get("/api/v1/admin/interiors_report/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "over_all_rating"){                    
                    axios.get("/api/v1/admin/over_all_rating/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "safety"){                    
                    axios.get("/api/v1/admin/safety/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "suspension_and_brakes"){                    
                    axios.get("/api/v1/admin/suspension_and_brakes/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "system_and_functions"){                    
                    axios.get("/api/v1/admin/system_and_functions/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "vehicle_documents"){                    
                    axios.get("/api/v1/admin/vehicle_documents/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                else if(panel.classList[0] == "wheels"){                    
                    axios.get("/api/v1/admin/wheels/"+id+"/")
                    .then( (response) => {  
                        insert_form_data(response.data["data"]);               
                    })
                }
                
            }
            
        });
    }
    //#endregion
    
    //Modal close
    $(".close_modal").click( () => { 
        $("#nav_general").addClass("active");
        $("#nav_specs").removeClass("active");
        $("#nav_images").removeClass("active");

        $(".general_details").show();
        $(".specs_and_features").hide();
        $(".car_images").hide();

        $(".accordion").removeClass("active");
        $(".specs_and_features .panel").css("display","none");

        for(i=0; i<$(".specs_and_features form").length; i++ ){
            $(".specs_and_features form")[i].reset();
        }

        $(".amendCarDetail").css("display","none"); 

        $(".soldCarsModal").css("display","none"); 
        
    });
    
    //Modal Navigation
    $(".general_details").show();
    $(".specs_and_features").hide();
    $(".car_images").hide();
    
    $("#nav_general").click( () => {
        $("#nav_general").addClass("active");
        $("#nav_specs").removeClass("active");
        $("#nav_images").removeClass("active");

        $(".general_details").show();
        $(".specs_and_features").hide();
        $(".car_images").hide();
    });

    $("#nav_specs").click(() => {
        $("#nav_general").removeClass("active");
        $("#nav_specs").addClass("active");
        $("#nav_images").removeClass("active");

        $(".general_details").hide();
        $(".specs_and_features").show();
        $(".car_images").hide();
    });

    $("#nav_images").click(() => {
        $("#nav_general").removeClass("active");
        $("#nav_specs").removeClass("active");
        $("#nav_images").addClass("active");

        $(".general_details").hide();
        $(".specs_and_features").hide();
        $(".car_images").show();        

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        pond = FilePond.create( FilePondElement );

        car_image_get = "/api/v1/image/thumbnail/photos/";
        car_image_upload = "/api/v1/admin/thumbnail/photos/";

        axios
        .get(car_image_get+id+"/")
        .then( (response) => {                     
            show_images(response.data["data"]);            
        });
        
    });

    //-----Modal > Car Images
    
    show_images = (res) => {
        let imageList = [];
        
        for(i=0; i<res.length; i++){            
            imageList.push( res[i]["image"]);            
        }        
        
        if( imageList.length > 0 ){            
            pond.addFiles(imageList);
        }     

        filepondRemoveEvent();        
    }

    //navigation
    $(".thumbnail").click(() => {
        $(".car_images_body .show_images").empty()
        $(".car_images_nav").removeClass("active");
        $(".thumbnail").addClass("active");
        
        var FilePondElement = document.querySelector("#thumbnail_filepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        pond = FilePond.create( FilePondElement );

        car_image_get ="/api/v1/image/thumbnail/photos/";
        car_image_upload ="/api/v1/admin/thumbnail/photos/";
        car_image_delete = "/api/v1/admin/thumbnail/photos/";

        axios
        .get(car_image_get+id+"/")
        .then( (response) => {
            show_images(response.data["data"]);
        });

    });

    $(".interior").click(() => {
        $(".car_images_nav").removeClass("active");
        $(".interior").addClass("active");

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        pond = FilePond.create( FilePondElement );

        car_image_get ="/api/v1/image/interoir/photos/";
        car_image_upload ="/api/v1/admin/interoir/photos/";
        car_image_delete = "/api/v1/admin/interoir/photos/";

        axios
        .get(car_image_get+id+"/")
        .then( (response) => {          
            show_images(response.data["data"]);
        });        
    });

    $(".exterior").click(() => {
        $(".car_images_nav").removeClass("active");
        $(".exterior").addClass("active");

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        pond = FilePond.create( FilePondElement );

        car_image_get ="/api/v1/image/exterior/photos/";
        car_image_upload ="/api/v1/admin/exterior/photos/";
        car_image_delete = "/api/v1/admin/exterior/photos/";
        
        axios
        .get(car_image_get+id+"/")
        .then( (response) => {          
            show_images(response.data["data"]);
        });
    });

    $(".engine").click(() => {
        $(".car_images_nav").removeClass("active");
        $(".engine").addClass("active");

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#thumbnail_filepond");
        pond = FilePond.create( FilePondElement );

        car_image_get ="/api/v1/image/engine/photos/";
        car_image_upload ="/api/v1/admin/engine/photos/";
        car_image_delete = "/api/v1/admin/engine/photos/";

        axios
        .get(car_image_get+id+"/")
        .then( (response) => {          
            show_images(response.data["data"]);
        });
    });
    
    //Remove Image EventListener
    deleteImage = (fileName) => {
        axios.delete(car_image_delete+fileName+"/");        
    }

    filepondRemoveEvent = () => {
        pond.on('removefile', (error, file) => {
            if (error) {
                //console.log('Oh no');
                return;
            }

            if(file["file"].name[0] == "." || file["file"].name.length <= 4 ){
                deleteImage(file.source.split("/")[ file.source.split("/").length - 2 ]);
            }

        });
    }

    //UPLOAD IMAGES TO SERVER
    $("#upload_imagee").click( () => {
        let files = pond.getFiles();
        
        if(files.length <= 0)
        {
            return
        }
        
        files.forEach( (file) => {
            if(file["file"].name[0] == "." || file["file"].name.length <= 4 ){
                //console.log("Can Delete");
                deleteImage(file.source.split("/")[ file.source.split("/").length - 2 ]);
            }
            
            let formdata = new FormData();
            formdata.append("photos", file["file"]);
            
            axios.post(car_image_upload+id+"/", formdata);
        });

        alert("Successfully Uploaded");        
    });

}





$(".cars").ready( car_functions );
