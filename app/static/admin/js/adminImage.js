

adminImage = () => {

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
    
    var FilePondElement = document.querySelector("#adminImageFilepond");   
    
    pond = FilePond.create( FilePondElement, {
        allowImageEdit : true,
        allowImageValidateSize : true,
        imageValidateSizeMaxWidth : 1920,
        imageValidateSizeMaxHeight : 1080,
    });
    
    axios
    .get('/api/v1/image/tag/'+$("#imageType").val()+'/')
    .then( (response) => {        
        show_images(response.data["data"]);
    });

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

    deleteImage = (fileName) => {
        axios.delete('/api/v1/admin/photos/'+fileName+"/");        
    }

    //Remove Image EventListener
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

    //OnDropDown Change Event
    $("#imageType").on('change', () => {                
        var FilePondElement = document.querySelector("#adminImageFilepond");
        FilePond.destroy(FilePondElement);

        var FilePondElement = document.querySelector("#adminImageFilepond");   
        pond = FilePond.create( FilePondElement );
        
        axios
        .get('/api/v1/image/tag/'+$("#imageType").val()+'/')
        .then( (response) => {
            //console.log(response);
            show_images(response.data["data"]);
        });
    });


    //Upload Images
    $("#uploadAdminImage").click( () => {
        let files = pond.getFiles();
        
        if(files.length <= 0)
        {
            alert("No File Present!");
            return
        }
        let tag = $("#imageType").val();
        
        //console.log(tag);

        files.forEach( (file) => {
            
            if(file["file"].name[0] == "." || file["file"].name.length <= 4 ){
            
                deleteImage(file.source.split("/")[ file.source.split("/").length - 2 ]);
            }
            
            let formdata = new FormData();
            formdata.append("photos", file["file"]);
            
            axios.post('/api/v1/admin/photos/'+tag+'/', formdata);
            
        });

        alert("Successfully Uploaded");        
    });




}

$(".adminImage").ready( adminImage );
