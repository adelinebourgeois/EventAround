angular.module('InfoCtrl', [])

    .controller('InfoCtrl', ['$scope','$stateParams','$rootScope', 'IledefranceService', function($scope, $stateParams, $rootScope, IledefranceService){
        var id = $stateParams.id;
        $scope.event = $rootScope.eventMarker[id];
    }]);