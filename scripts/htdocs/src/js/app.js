var app = angular.module('app',['ui.grid','ui.grid.resizeColumns']);

app.controller('FitnessGrid', ['$scope', '$http', 
        function($scope, $http) {
            var weights = []; // TODO: Deprecate 
            var dates = []; // TODO: Deprecate
            var columns = [];
            var plotData = {}; // Data filtered for plotting
            var inData = {}; // All the data
            $scope.gridOptions = {};

            $scope.selection = {
                ids: {"dl": false, 
                    "pc": false,
                    "sn": false,
                    "os": false,
                    "pp": false}
            };

            $scope.lifts = [
            {shortName: "dl",
                properName: "Deadlift"}
            ,
            {shortName: "pc",
                properName: "Power Clean"}
            ,
            {shortName: "sn",
                properName: "Snatch"}
            ,
            {shortName: "os",
                properName: "Overhead Squat"}
            ,
            {shortName: "pp",
                properName: "Push Press"}
            ];
            
            $scope.gridOptions.columnDefs = [
                { name: 'Lift'}, 
                { name : 'Date', type: 'date', cellFilter: 'date:"dd-MMM-yy"'}, 
                { name: 'Reps' }, 
                { name: 'Sets' }, 
                { name: 'Weight', type: 'number'},
                { name: 'Comment'},
            ];

            //$scope.gridOptions.enableColumnResizing = true;

            $http.get('out.json').success(function(data) {
                $scope.gridOptions.data = data; // Make grid 
                inData = data; // Make arrays for C3.js
            });

            $scope.updateChart = function() {
                var newPlotData = dataArrayGen();
                columnified =  columnifyPlotData(newPlotData);
                columns = columnified[0];
                xsys = columnified[1];
                //console.log(columns);
                //console.log(xsys);
                var chartData = {
                    xs: xsys,
                    xFormat: '%Y-%m-%dT%H:%M:%S',
                    columns: columns,
                };

                var chartAxis = {
                    x: { type: 'timeseries' },
                };
                
                var chart = c3.generate({
                    bindto: '#chart', 
                    data: chartData,
                    axis: chartAxis,
//                    size: {
//                        height: 300,
//                        width: 700
//                    }
                });

            };

            var columnifyPlotData = function(inPlotData){
                var columnified = [];
                var weightssubarray = [];
                var datessubarray = [];
                var temparray = [];
                var includedlifts = [];
                inPlotData.forEach( function(el,idx,inData) {
                    liftsubarrayidx = includedlifts.indexOf(el.Lift);
                    if (liftsubarrayidx !== -1){
                        // Then we've already gotten to it
                        weightssubarray[liftsubarrayidx].push(el.Weight);
                        datessubarray[liftsubarrayidx].push(el.Date);
                    }
                    else {
                        includedlifts.push(el.Lift);
                        liftsubarrayidx = includedlifts.indexOf(el.Lift);
                        // update the includedlifts to include this lift
                        weightssubarray[liftsubarrayidx] = [];
                        weightssubarray[liftsubarrayidx][0] = el.Lift;
                        weightssubarray[liftsubarrayidx].push(el.Weight);
                        // add all the weights
                        datessubarray[liftsubarrayidx] = [];
                        datessubarray[liftsubarrayidx][0] = el.Lift + ' Dates';
                        datessubarray[liftsubarrayidx].push(el.Date);
                        // add all the dates
                    };
                });
                columnified = weightssubarray.concat(datessubarray);
                var xsysobj = {}; // stores information regarding x's and y's
                includedlifts.forEach(function(el,idx,weightsarray){
                    xsysobj[el] = el + ' Dates';
                });
                //console.log(xsysobj);
                return [columnified,xsysobj];
            };

            var dataArrayGen = function(){
                plotData = inData.filter(function(dataPt){
                    var lifts = $scope.lifts;
                    for (lift of lifts){
                        if ( (dataPt.Lift === lift.properName) && 
                                $scope.selection.ids[lift.shortName] ){
                        return true;
                        };
                    };
                });
                return plotData;
            };
            

        }]);
