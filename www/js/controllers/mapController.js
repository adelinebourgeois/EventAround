angular.module('starter.control', [])


    .controller('MapCtrl', ['$scope','$rootScope','IledefranceService', function($scope, $rootScope, IledefranceService){
        // Markers Events
        var getEventsMarkers = function () {
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
                    var eventDetail = events.fields.free_text;
                    var eventAddress = events.fields.address;
                    var eventCity = events.fields.city;
                    var eventSpaceTimeInfo = events.fields.space_time_info;
                    var eventPrice = events.fields.pricing_info;

                    var info = {
                        id: i,
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i,
                        name: eventName,
                        photo: eventPhoto,
                        body: eventDescription,
                        detail: eventDetail,
                        address: eventAddress,
                        city: eventCity,
                        time: eventSpaceTimeInfo,
                        price: eventPrice
                    };

                    finalReturn.push(info);

                }
                $rootScope.eventMarker = finalReturn;

            }, function (error) {
                console.log(error.message);
            })
        };

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
            },
            searchbox: {
                template:'templates/searchbox.html',
                events:{
                    places_changed: function (searchBox) {
                        var place = searchBox.getPlaces();
                        console.log(place);
                        $scope.map.center.latitude = place[0].geometry.location.lat();
                        $scope.map.center.longitude = place[0].geometry.location.lng();
                        $scope.map.zoom = 15;
                        if (!place || place == 'undefined' || place.length == 0) {
                            console.log('no place data :(');
                            return;
                        }
                    }
                },
                options: {
                    types: ['(cities)'],
                    componentRestrictions: {country: "fr"}
                }
            }
        };
        getEventsMarkers();

        // if(navigator.geolocation) {
        //     //Geolocation
        //     navigator.geolocation.getCurrentPosition(function(position){
        //
        //         $scope.map = {
        //             center: {
        //                 latitude: position.coords.latitude,
        //                 longitude: position.coords.longitude
        //             },
        //             zoom: 14
        //         };
        //
        //         getEventsMarkers();
        //
        //     }, function(error){
        //         console.log(error);
        //     });
        // } else {
        //     $scope.map = {
        //         center: {
        //             latitude: 48.864716,
        //             longitude: 2.349014
        //         },
        //         zoom: 11,
        //         window: {
        //             model: {},
        //             show: false,
        //             options:{
        //                 pixelOffset: {width:-1,height:-20}
        //             }
        //         },
        //         markersEvents: {
        //             click: function(marker, eventName, model, args) {
        //                 $scope.map.window.model = model;
        //                 $scope.map.window.show = true;
        //
        //             }
        //         }
        //     };
        // }



    }]);