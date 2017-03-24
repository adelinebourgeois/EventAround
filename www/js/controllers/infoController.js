angular.module('InfoCtrl', [])

    .controller('InfoCtrl', ['$scope','$stateParams','$rootScope', function($scope, $stateParams, $rootScope){
        var id = $stateParams.id;
        $scope.event = $rootScope.eventMarker[id];
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
    }).filter('customDate', function() {
        return function(input) {
            if(!input)
                return;
            var startAt = input.split(' ')[0].split('T');
            var date = startAt[0].split('-');
            var hour = startAt[1].split(':');

            return date[2] + '/' + date[1] + '/' + date[0] + " à " + hour[0] + 'h' + hour[1];
        }
    });