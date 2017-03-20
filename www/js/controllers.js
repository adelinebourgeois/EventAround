angular.module('starter.controllers', [])

    .controller('MapCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){
        $scope.map = {
            center: {
                latitude: 48.864716,
                longitude: 2.349014
            },
            zoom: 11
        };
        //Map info
        // var paris = new google.maps.LatLng(48.864716, 2.349014);
        //
        // var map = new google.maps.Map(document.getElementById('map'), {
        //     center: paris,
        //     scrollwheel: true,
        //     zoom: 11
        // });

        // Markers Events
        var getEvents = function (idKey) {
            IledefranceService.getEvents().then(function (response) {
                var finalReturn = [];

                for (var i = 0; i < response.data.records.length; i++) {
                    var events = response.data.records[i];
                    var eventsLocation = events.geometry.coordinates;
                    // var infoWindowContent = events.fields.placename;

                    var latitude = eventsLocation[0];
                    var longitude = eventsLocation[1];

                    var ret = {
                        latitude: latitude,
                        longitude: longitude,
                        title: 'm' + i
                    };
                    if (idKey == null) {
                        idKey = "id";
                    }

                    ret[idKey] = i;
                    finalReturn.push(ret);

                    // var latLng = {lat: eventsLocation[0], lng: eventsLocation[1]};

                    // var markers = new google.maps.Marker({
                    //     position: latLng,
                    //     setMap: $scope.map
                    // });


                    // google.maps.event.addListener(markers, 'click', (function (markers) {
                    //     return function () {
                    //         infoWindow.setContent(infoWindowContent);
                    //         infoWindow.open($scope.map, markers);
                    //     }
                    // }));
                }
                $scope.eventMarker = finalReturn;
                console.log(finalReturn);

            }, function (error) {
                console.log(error.message);
            })
        };

        getEvents();

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

    .controller('CalendarCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){
        $scope.eventSource = [];


        //Calendrier Events
        function getEvents() {
            IledefranceService.getEvents().then(function (response) {
                for (var i = 0; i < response.data.records.length; i++) {
                    var events = response.data.records[i];
                    console.log(events);
                    var eventsName =  events.fields.title;
                    var eventsStart = events.fields.date_start;
                    var eventsEnd = events.fields.date_end;

                    $scope.eventSource.push(
                        {
                            title: eventsName,
                            startTime  : new Date(eventsStart),
                            endTime    : new Date(eventsEnd),
                            allDay : false
                        }
                    );
                }

            }, function (error) {
                console.log(error.message);
            })
        }

        getEvents();

    }]);



