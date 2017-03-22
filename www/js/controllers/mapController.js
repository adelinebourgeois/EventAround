angular.module('starter.controllers', [])

    .controller('MapCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){
        $scope.map = {
            center: {
                latitude: 48.864716,
                longitude: 2.349014
            },
            zoom: 11,
            window: {
                model: {},
                show: false,
                options:{
                    pixelOffset: {width:-1,height:-20}
                }
            },
            markersEvents: {
                click: function(marker, eventName, model, args) {
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;

                }
            }
        };

        // Markers Events
        var getEventsMarkers = function (idKey) {
            IledefranceService.getEvents().then(function (response) {
                var finalReturn = [];

                for (var i = 0; i < response.data.records.length; i++) {
                    var events = response.data.records[i];
                    var eventsLocation = events.geometry.coordinates;

                    var latitude = eventsLocation[1];
                    var longitude = eventsLocation[0];

                    var eventName = events.fields.title;
                    var eventPhoto = events.fields.image;
                    var eventDescription = events.fields.description;

                    var info = {
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i,
                        name: eventName,
                        photo: eventPhoto,
                        body: eventDescription
                    };
                    if (idKey == null) {
                        idKey = "id";
                    }

                    info[idKey] = i;
                    finalReturn.push(info);

                }
                $scope.eventMarker = finalReturn;
                console.log($scope.eventMarker);

            }, function (error) {
                console.log(error.message);
            })
        };

        getEventsMarkers();

        //Geolocation
        // navigator.geolocation.getCurrentPosition(function(position){
        //
        //     var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //
        //     var mapOptions = {
        //         center: latLng,
        //         zoom: 12,
        //         mapTypeId: google.maps.MapTypeId.ROADMAP
        //     };
        //
        //     $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        //
        //
        // }, function(error){
        //     console.log(error);
        // });

    }])