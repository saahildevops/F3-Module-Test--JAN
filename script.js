$( window ).load(function() {
    // Run code
    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showDefaultPosition);
    }
    else{
       $('#current_timezone').html('<div class="alertmessage"><h1><center>Geolocation is not supported by this browser.</center></h1></div>');
    }
    
  });
  let adminApiKey = '3a42386f37924ae2810b6984f0d9741c';
  function showDefaultPosition(position) {
        fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=${adminApiKey}`)
        .then(response => response.json())
        .then(result => {
            let defaultAddress = result.results[0];
            showAddressInformation(defaultAddress, 'default_timezone');
        })
        .catch(error => {
            $('#current_timezone').html('<div class="alertmessage"><h1><center>Some thing went wrong with API call, Please try after some time / check API call.</center></h1></div>');
        });
   }

   function showAddressInformation(address, postId){
       let postcode = '-';
       if(address.postcode!=undefined) {
         postcode = address.postcode;
       }
       let addressInfo = "<div id='defalut_address'>";
       addressInfo +="<div id='top_inner_text'>Name of Time Zone: "+address.timezone.name+"</div>";
       addressInfo +="<div id='top_inner_text_lat'><div>Lat: "+address.lat+"</div><div>Long: "+address.lon+"</div><span></span></div>";
       addressInfo +="<div id='top_inner_text'>Offset STD: "+address.timezone.offset_STD+"</div>";
       addressInfo +="<div id='top_inner_text'>Offset STD Seconds: "+address.timezone.offset_STD_seconds+"</div>";
       addressInfo +="<div id='top_inner_text'>Offset DST: "+address.timezone.offset_DST+"</div>";
       addressInfo +="<div id='top_inner_text'>Offset DST Seconds: "+address.timezone.offset_DST_seconds+"</div>";
       addressInfo +="<div id='top_inner_text'>Country: "+address.country+"</div>";
       addressInfo +="<div id='top_inner_text'>PostCode: "+postcode+"</div>";
       addressInfo +="<div id='top_inner_text'>City: "+address.city+"</div>";
       addressInfo +="</div>";
       $('#'+postId).html(addressInfo);
   }

function searchAddress() {
    let searchAddress=$('#Address_input').val();
    $('#address_status').html('');
    if(searchAddress=='') {
        $('#address_status').html('<div class="alertmessage">Please enter an address!</div>');
        return false;
    }
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(searchAddress)}&apiKey=${adminApiKey}`)
    .then(resp => resp.json())
    .then((geocodingResult) => {
        let searchData = geocodingResult.features[0].properties;
        showAddressInformation(searchData, 'search_timezone');
    }).catch(error => {
         $('#search_timezone').html('<div class="alertmessage"><h1><center>Time zone could not be found.</center></h1></div>');
     });

}