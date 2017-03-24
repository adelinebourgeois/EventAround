angular.module('starter.control', [])


    .controller('MapCtrl', ['$scope','$rootScope','IledefranceService', function($scope, $rootScope, IledefranceService){
        $rootScope.eventMarker = [];
        // Markers Events
            var getEventsMarkers = function () {
                IledefranceService.getEvents().then(function (response) {
                    var finalReturn = [];

                    for (var i = 0; i < response.data.records.length; i++) {
                        var events = response.data.records[i];

                        var eventsLocation = events.geometry.coordinates;

                        var latitude = eventsLocation[1];
                        var longitude = eventsLocation[0];

                        var eventTime = events.fields.timetable;
                        var eventStart= eventTime.split(' ')[0];
                        var eventStartDate = new Date(eventStart);
                        var eventEnd = eventTime.split(' ')[1];
                        var eventEndDate = new Date(eventEnd);


                        var eventName = events.fields.title;
                        var eventPhoto = events.fields.image;
                        var eventDescription = events.fields.description;
                        var eventDetail = events.fields.free_text;
                        var eventAddress = events.fields.address;
                        var eventCity = events.fields.city;
                        var eventSpaceTimeInfo = events.fields.space_time_info;
                        var eventPrice = events.fields.pricing_info;
                        var eventTag = events.fields.tags;

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
                            price: eventPrice,
                            tag: eventTag,
                            timetable: eventTime
                        };


                        if(eventEndDate > eventStartDate){
                            finalReturn.push(info);
                        }
                    }
                    for(var i = 0; i < finalReturn.length; i++) {
                        finalReturn[i].id = i;
                        $rootScope.eventMarker = finalReturn;
                    }

                }, function (error) {
                    console.error;
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

                        $scope.map.center.latitude = place[0].geometry.location.lat();
                        $scope.map.center.longitude = place[0].geometry.location.lng();
                        $scope.map.zoom = 15;
                        if (!place || place == 'undefined' || place.length == 0) {
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

        //Geolocation
        // if(navigator.geolocation) {
        //
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
        //         console.error;
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