angular.module('InfoCtrl', [])

    .controller('InfoCtrl', ['$scope','$stateParams','$rootScope', function($scope, $stateParams, $rootScope){
        var id = $stateParams.id;
        $scope.event = $rootScope.eventMarker[id];
    }]);