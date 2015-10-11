var app = angular.module('app',['ui.grid']);

app.controller('FitnessGrid', ['$scope', '$http', 
        function($scope, $http) {
            var weights = []; var dates = [];

            $scope.gridOptions = {
            };
            
            $scope.gridOptions.columnDefs = [
                { name: 'Lift'}, 
                { name : 'Date', type: 'date', cellFilter: 'date:"yyyy-MM-dd"'}, 
                { name: 'Reps' }, 
                { name: 'Sets' }, 
                { name: 'Weight', type: 'number'},
                { name: 'Comment'},
            ];

            $http.get('out.json').success(function(data) {
                $scope.gridOptions.data = data;
                $scope.makeArray(data);
                var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                        x: 'dates',
                        x_format: '%d-%m-%Y',
                        columns: [ weights, dates ] },
                    axis: {
                        x: {
                            type: 'timeseries'
                        }
                    }
                });
            });

            $scope.makeArray = function (dataIn) {
                weights.push('weights');
                dates.push('dates');
                for (var doc in dataIn) {
                    weights.push(dataIn[doc]['Weight']);
                    dates.push(dataIn[doc]['Date']);
                };
            };
        }]);
