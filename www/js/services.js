angular.module('starter.services', [])

    .factory('IledefranceService', ['$http', function($http) {
        IledefranceService = {};

        IledefranceService.getEvents = function () {
            return $http.get('https://data.iledefrance.fr/api/records/1.0/search/?dataset=evenements-publics-cibul&rows=200&sort=updated_at&facet=updated_at&facet=tags&facet=placename&facet=department&facet=region&facet=city&facet=date_start&facet=date_end&facet=pricing_info&timezone=Europe%2FParis')
        };

        return IledefranceService;

    }]);
