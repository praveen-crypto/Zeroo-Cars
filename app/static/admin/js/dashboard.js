
zeroocar_fn = async  () => {
    //console.log("zeroo cars dashboard");
    
    let res = await axios.get("/api/v1/admin/cars/count/");

    let data = res.data["data"];
    
    $(".section-cars-available .cars-available").html(data["available_count"]);

    $(".section-cars-archive .cars-archive").html(data["archive_count"]);

    $(".section-cars-sold .cars-sold").html(data["sold_count"]);
    
}

zeroocar_fn();

