const request = require('request');

let getLocation = function(address, callback){
	let encodedAddress = encodeURIComponent(address);

	request({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress,
		json: true
		}, (error, response, body) => {
		if(error) {
			callback('Unable to connect to Google servers');
		} else if (body.status === 'ZERO_RESULTS'){
			callback('Unable to find address')
		} else if (body.status === 'OK') {
			callback(undefined, {
				address: body.results[0].formatted_address,
				latitude: body.results[0].geometry.location.lat,
				longitude: body.results[0].geometry.location.lng
			});
		}
	});

}

//74a75783807b5f5005069e52cf823c1d

exports.getLocation = getLocation;