 angular.module('starter.controllers', [])
.factory('alert', function($uibModal) {

    function show(action, event) {
      return $uibModal.open({
        templateUrl: 'modalContent.html',
        controller: function() {
          var vm = this;
          vm.action = action;
          vm.event = event;
        },
        controllerAs: 'vm'
      });
    }

    return {
      show: show
    };

})
.controller('CalendarCtrl', ['$scope','IledefranceService', function($scope, IledefranceService){
        
        $scope.events = [];
        $scope.viewDate = Date.now()
       
        var IDFData = [];
        $scope.calendarView = 'month';

        //Calendrier Events
        function getEvents() {
            if (IDFData == null) {
                // Do nothing
            } else {
                IledefranceService.getEvents().then(function (response) {
                    IDFData = response.data;
                    for (var i = 0; i < response.data.records.length; i++) {
                        var events = response.data.records[i];
                        console.log(events);
                        var eventsName =  events.fields.title;
                        var eventTime = events.fields.timetable;
                        var eventStartDate = eventTime.split(' ')[0];
                        var eventEndDate = eventTime.split(' ')[1];

                        $scope.events.push(
                            {
                                title: eventsName,
                                startsAt  : new Date(eventStartDate),
                                endsAt    : new Date(eventEndDate),
                                color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                                  primary: '#e3bc08', // the primary event color (should be darker than secondary)
                                  secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
                                },
                                actions: [{ // an array of actions that will be displayed next to the event title
                                  label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                                  cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                                  onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                                    console.log('Edit event', args.calendarEvent);
                                  }
                                }],
                                draggable: false, //Allow an event to be dragged and dropped
                                resizable: false, //Allow an event to be resizable
                                incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
                                recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
                                cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
                                allDay: false // set to true to display the event as an all day event on the day view
                            }
                        );
                    }

                }, function (error) {
                    console.log(error.message);
                });
            }
            
        }

        $scope.eventClicked = function(){

        }
        

        getEvents();

    }]);
