

notification = async () => {

    let getUrl = '/api/v1/admin/inquiry/';
    let postUrl = '/api/v1/admin/inquiry/';
    
    //OnLoad get all car notifications  
    //$('.sellCar').hide();
    // $('.buyCar').hide();
    $('.contactUs').hide();
    $('.bookNow').hide();

    let res = await axios.get(getUrl+"sell car/");
    let data = res.data.data;

    //debugger;
    // <div class="phone">
    //                 <span style="font-weight: 600;" >Phone:</span> `+ele.phone+`
    //             </div>
    data.forEach(ele => {        
        $(".sellCar").append(`
        <button class="accordion">Name: `+ele.name+` (Phone : `+ele.phone+`)</button>
        <div class="panel">
            <div class="contentBody">
                <div class="carBrand">
                    <span style="font-weight: 600;" >Car name:</span> `+ele.car_brand +` `+ele.car_model+`
                </div>
                <div class="carYear">
                    <span style="font-weight: 600;" >Reg year:</span> `+ele.registration_year+`
                </div>
                
                <div class="mailId">
                    <span style="font-weight: 600;" >Email:</span> `+ele.email+`
                </div>
                <div class="createdOn">
                    <span style="font-weight: 600;" >Created on: </span> `+ele.created+`
                </div>                
            </div>
        </div>
        `);
    });

    res = await axios.get(getUrl+"contact us/");
    data = res.data.data;

    data.forEach(ele => {
        console.log(ele);  
        $(".contactUs").append(`
        <button class="accordion">Name: `+ele.name+`</button>
        <div class="panel">
            <div class="contentBody">
                <div class="phone">
                    <span style="font-weight: 600;" >Phone:</span> `+ele.phone+`
                </div>
                <div class="mailId">
                    <span style="font-weight: 600;" >Email:</span> `+ele.email+`
                </div>
                <div class="message">
                    <span style="font-weight: 600;" >Message:</span> `+ele.message+`
                </div>

            </div>
        </div>
        `);
    });
    
    res = await axios.get(getUrl+"book now/");
    data = res.data.data;

    data.forEach(ele => {
        $(".bookNow").append(`
        <button class="accordion">Name: `+ele.name+`</button>
        <div class="panel">
            <div class="contentBody">
                <div class="name">
                    <span style="font-weight: 600;" >Car url: </span> <a href="`+ele.regestration_number+`" target="_blank" >link</a>
                </div>
                <div class="phone">
                    <span style="font-weight: 600;" >Phone :</span> `+ele.phone+`
                </div>
                <div class="mailId">
                    <span style="font-weight: 600;" >Email : </span> `+ele.email+`
                </div>                
            </div>
        </div>
        `);

    });

    var acc = document.getElementsByClassName("accordion");
    var i;
    
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");

            var panel = this.nextElementSibling;
            
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                
            } 
            else {
                //console.log(panel.scrollHeight);
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }
    
    navBarClickEvent = (inquiryType) => {
        
        switch( inquiryType.replace(/\s/g, '') ) {
            case 'sellcar':
                $(".sellCar").show();
                $(".buyCar").hide();
                $(".contactUs").hide();
                $(".bookNow").hide();
                
                $(".liSellCar").addClass('active');
                $(".liBuyCar").removeClass('active');
                $(".liContactUs").removeClass('active');
                $(".liBookNow").removeClass('active');

                break;

            case 'buycar':
                $(".sellCar").hide();
                $(".buyCar").show();
                $(".contactUs").hide();
                $(".bookNow").hide();
                
                $(".liSellCar").removeClass('active');
                $(".liBuyCar").addClass('active');
                $(".liContactUs").removeClass('active');
                $(".liBookNow").removeClass('active');

                break;
            case 'contactus':
                
                $(".sellCar").hide();
                $(".buyCar").hide();
                $(".contactUs").show();
                $(".bookNow").hide();      
                
                $(".liSellCar").removeClass('active');
                $(".liBuyCar").removeClass('active');
                $(".liContactUs").addClass('active');
                $(".liBookNow").removeClass('active');
                
                break;

            case 'booknow':
                $(".sellCar").hide();
                $(".buyCar").hide();
                $(".contactUs").hide();
                $(".bookNow").show();

                $(".liSellCar").removeClass('active');
                $(".liBuyCar").removeClass('active');
                $(".liContactUs").removeClass('active');
                $(".liBookNow").addClass('active');

                break;

            default:
                break;
              // code block
            
          }
    };

    $('.notificationNavBar .navList a').each(
        (index, ele) =>  {
            
            $('#'+ele.id).click( () => { 
                
                let type = $('#'+ele.id).attr('name');
                navBarClickEvent(type);

            } );
            
            //this.classList.toggle("active");

        }

    );
    
}

$(".notification").ready( notification );
