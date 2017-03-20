angular.module('starter.controllers', [])

    .controller('MapCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){

        //Map info
        var paris = new google.maps.LatLng(48.864716, 2.349014);

        var map = new google.maps.Map(document.getElementById('map'), {
            center: paris,
            scrollwheel: true,
            zoom: 11
        });

        // Markers Events
        function getEvents() {
            IledefranceService.getEvents().then(function (response) {
                for (var i = 0; i < response.data.records.length; i++) {
                    var events = response.data.records[i];
                    console.log(events);
                    var eventsLocation = events.geometry.coordinates;
                    console.log(eventsLocation);
                    var infoWindowContent = events.fields.placename;
                    console.log(infoWindowContent);

                    var latLng = {lat: eventsLocation[0], lng: eventsLocation[1]};
                    console.log(latLng);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', (function (marker) {
                        return function () {
                            infoWindow.setContent(infoWindowContent);
                            infoWindow.open(map, marker);
                        }
                    }));
                }

            }, function (error) {
                console.log(error.message);
            })
        }

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



