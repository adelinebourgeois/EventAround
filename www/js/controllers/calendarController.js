 angular.module('starter.controllers', [])
.controller('CalendarCtrl', ['$scope', '$document','IledefranceService', '$ionicPopup', '$ionicModal', '$timeout', function($scope, $document, IledefranceService, $ionicPopup,$ionicModal, $timeout){
        
        this.animationEnabled = true;

        $scope.events = [];
        $scope.viewDate = Date.now();
        $scope.currentEvent = [];
        $scope.modalData = [];
        $scope.calendarView = 'month';

        var IDFData = [];

        $scope.switchView = function (viewType){
          //here I switch the calendar-view
          $scope.calendarView = viewType;
        }

        //Calendrier Events
        function getEvents() {
            if (IDFData == null) {
                // Do nothing
            } else {
                IledefranceService.getEvents().then(function (response) {
                    for (var i = 0; i < response.data.records.length; i++) {
                        var event = response.data.records[i];

                        var eventsName =  event.fields.title;
                        var eventTime = event.fields.timetable;
                        var eventStart= eventTime.split(' ')[0];
                        var eventStartDate = new Date(eventStart);
                        var eventEnd = eventTime.split(' ')[1];
                        var eventEndDate = new Date(eventEnd);

                        var color1 = { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                                  primary: '#44DE4C', // the primary event color (should be darker than secondary)
                                  secondary: '#7EEF88' // the secondary event color (should be lighter than primary)
                                }
                        var color2 = {
                                  primary: '#e3bc08',
                                  secondary: '#fdf1ba'
                                }

                        var eventColor = eventsName == undefined ? color2:color1;
                        eventsName = eventsName||event.fields.placename;

                        if(eventEndDate > eventStartDate){
                            IDFData.push(event)
                            $scope.events.push(
                                {
                                    title: eventsName,
                                    startsAt  : eventStartDate,
                                    endsAt    : eventEndDate,
                                    color: eventColor,
                                    actions: [{ // an array of actions that will be displayed next to the event title
                                      label: '', // the label of the action
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
                    }

                }, function (error) {
                    console.log(error.message);
                });
            }
            
        }

        $ionicModal.fromTemplateUrl('modalContent.html', {
        scope: $scope,
        animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal;
          });
          $scope.openModal = function(event) {
          console.log(event);
          for (var i = 0; i < IDFData.length; i++) {
              if(i == event.calendarEventId){
                $scope.currentEvent = IDFData[i].fields;
                console.log($scope.currentEvent);
                $scope.event = event;
              }
          }
            $scope.modal.show();
          };
          $scope.closeModal = function() {
            $scope.modal.hide();
          };
            // Cleanup the modal when we're done with it!
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });
            // Execute action on hide modal
          $scope.$on('modal.hidden', function() {
            // Execute action
          });
            // Execute action on remove modal
          $scope.$on('modal.removed', function() {
            // Execute action
          });

        getEvents();

}]).config(['calendarConfig', function(calendarConfig) {

    // Change the month view template globally to a custom template
    //calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; 

    // Use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.
    calendarConfig.dateFormatter = 'moment';

    // Change the month view template globally to a custom template
    calendarConfig.templates.calendarMonthView = 'templates/custom/calendarMonthView.html'; 
    calendarConfig.templates.calendarMonthCell = 'templates/custom/calendarMonthCell.html'; 
    calendarConfig.templates.calendarMonthCellEvents = 'templates/custom/calendarMonthCellEvents.html'; 
    calendarConfig.templates.calendarSlideBox = 'templates/custom/calendarSlideBox.html'; 

    // This will configure times on the day view to display in 24 hour format rather than the default of 12 hour
    calendarConfig.allDateFormats.moment.date.hour = 'HH:mm';

    // This will configure the day view title to be shorter
    calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM';

    // This will set the week number hover label on the month view
    calendarConfig.i18nStrings.weekNumber = 'Week {week}';

    // This will display all events on a month view even if they're not in the current month. Default false.
    calendarConfig.displayAllMonthEvents = false;

    // Make the week view more like the day view, ***with the caveat that event end times are ignored***.
    calendarConfig.showTimesOnWeekView = false;

  }]).filter('splitTags', function() {
        return function(input, splitChar) {
            var tags = input.split(splitChar);

            var string = "";

            tags.forEach( function(element, index) {
                if(element == " " || element == "")
                    return null;
                index == 0 ? 
                 string += "#"+tags[index] : string += " #"+tags[index];
            });

            return string;
        }
    }).filter('customDate', function() { // Date formatter
        return function(input) {
            if(!input)
                return;
            var startAt = input.split(' ')[0].split('T');
            var date = startAt[0].split('-');
            var hour = startAt[1].split(':');

            return date[2] + '/' + date[1] + '/' + date[0] + " à " + hour[0] + 'h' + hour[1];
        }
    });
