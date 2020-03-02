(function() {
    agGrid.initialiseAgGridWithAngular1(angular);

    var app = angular.module('basic', ['agGrid']);

    app.controller('basicController', function($scope, $http) {

        var firstNames = ["Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella", "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby", "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"];
        var lastNames = ["Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell", "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane", "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner", "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane", "Keating", "Keegan", "Kingston", "Kobe"];

        var dataType = ['IP Adress', 'Email Address', 'Channel']

        var columnDefs = [
            {
                headerName: '', 
                width: 50, 
                checkboxSelection: true,
                headerCheckboxSelection: true,
                sortable: false,
                pinned: true,
                filter: false
            },
            {
                headerName: 'NAME',
                field: 'name',
                width: 200                
            },
            {
                headerName: 'DATA TYPE',
                field: 'dataType',
                width: 200                
            },
            {
                headerName: 'SIZE',
                field: 'size',
                width: 200,
                cellRenderer: sizeRenderer                
            },
            {
                headerName: 'STATUS',
                field: 'status',
                width: 200,
                cellRenderer: statusRenderer
            },
            {
                headerName: 'LAST UPDATED',
                field: 'lastUpdated',
                width: 200                
            },
            {
                headerName: 'ASSOCIATIONS',
                field: 'associations',
                width: 200,
                cellRenderer: associationRenderer
            },
            {
                headerName: 'RATING',
                field: 'rating',
                width: 200,
                cellRenderer: ratingRenderer,
                filter: false
            }
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: createRowData(),
            rowSelection: 'multiple',
            onModelUpdated: onModelUpdated,
            suppressRowClickSelection: true,
            pagination: true,
            floatingFilter: true,
            paginationPageSize: 10,
            defaultColDef: {
                sortable: true,
                filter: true
            }
        };

        function onModelUpdated() {
            var model = $scope.gridOptions.api.getModel();
            var totalRows = $scope.gridOptions.rowData.length;
            var processedRows = model.getRowCount();
            $scope.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
        }

        function createRowData() {
            var rowData = [];

            $http({
                method: 'GET',
                url: 'http://demo7622837.mockable.io//list'
              }).then(function successCallback(response) {
                  console.log(response);
                }, function errorCallback(response) {
                    console.log(response);
                });
            for (var i = 0; i < 50; i++) {
                var visibleDataType = dataType[i % dataType.length];
                var visibleStatus = ['Active', 'Inactive'][i%2];
                var date = new Date(1582022442780);
                rowData.push({
                    name: firstNames[i % firstNames.length] + ' ' + lastNames[i % lastNames.length],
                    //mayank
                    dataType: visibleDataType,             
                    size: Math.round(Math.random() * 10),
                    status: visibleStatus,
                    lastUpdated: date.toLocaleString(),
                    associations: Math.round(Math.random() * 10),
                    rating: Math.round((Math.random() * 10)/2)
                });
            }
            return rowData;
        }

        document.addEventListener('DOMContentLoaded', function() {
            var gridDiv = document.querySelector('#myGrid');
            new agGrid.Grid(gridDiv, gridOptions);
        
            agGrid.simpleHttpRequest({url: 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json'}).then(function(data) {
                gridOptions.api.setRowData(data.slice(0, 50));
            });
        });

        function statusRenderer(params){
            var statusType = params.value === 'Active' ? 'green' : 'grey';
            var statusDot = '<span style = "height: 10px; width: 10px; background-color:' + statusType +  '; border-radius: 50%; display: inline-block;"> </span>'
            return statusDot + ' ' + params.value;
        }

        function ratingRenderer(params){
            var stars = '';
            //var fontAwesomeStar = '<i class="fas fa-star"></i>'
            for(var i =0; i < params.value; i++){
                //stars+= fontAwesomeStar;
                stars+='* ';
            }
            return stars;
        }
        
        function associationRenderer(params){
            var association = (params.value === 0 || params.value === 1 ) ? 'rule' : 'rules' ;
            return params.value + ' ' + association;
        }

        function sizeRenderer(params){
            var size1 = (params.value === 0 || params.value === 1 ) ? 'item' : 'items' ;
            return params.value + ' ' + size1;
        }
    });
    
})();
