 angular.module('starter.controllers', [])

   .controller('CalendarCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){
        $scope.eventSource = [];

        //Calendrier Events
        function getEvents() {
            IledefranceService.getEvents().then(function (response) {
                for (var i = 0; i < response.data.records.length; i++) {
                    var events = response.data.records[i];
                    console.log(events);
                    var eventsName =  events.fields.title;
                    var eventTime = events.fields.timetable;
                    var eventStartDate = eventTime.split(' ')[0];
                    var eventEndDate = eventTime.split(' ')[1];

                    $scope.eventSource.push(
                        {
                            title: eventsName,
                            startTime  : new Date(eventStartDate),
                            endTime    : new Date(eventEndDate),
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
