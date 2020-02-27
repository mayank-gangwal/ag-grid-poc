(function() {
    agGrid.initialiseAgGridWithAngular1(angular);

    var app = angular.module('basic', ['agGrid']);

    app.controller('basicController', function($scope) {

        var firstNames = ["Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella", "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby", "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"];
        var lastNames = ["Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell", "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane", "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner", "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane", "Keating", "Keegan", "Kingston", "Kobe"];

        var dataType = ['IP Adress', 'Email Address', 'Channel']

        var columnDefs = [
            {
                headerName: '', 
                width: 40, 
                checkboxSelection: true,
                headerCheckboxSelection: true,
                sortable: false,
                pinned: true
            },
            {
                headerName: 'NAME',
                field: 'name',
                width: 100                
            },
            {
                headerName: 'DATA TYPE',
                field: 'dataType',
                width: 100                
            },
            {
                headerName: 'SIZE',
                field: 'size',
                width: 100                
            },
            {
                headerName: 'STATUS',
                field: 'status',
                width: 100                
            },
            {
                headerName: 'LAST UPDATED',
                field: 'lastUpdated',
                width: 100                
            },
            {
                headerName: 'ASSOCIATIONS',
                field: 'associations',
                width: 100,
                cellRenderer: 'associationRenderer'
            },
            {
                headerName: 'RATING',
                field: 'rating',
                width: 100,
                cellRenderer: 'ratingRenderer'                
            }
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: createRowData(),
            rowSelection: 'multiple',
            onModelUpdated: onModelUpdated,
            suppressRowClickSelection: true,
            pagination: true,
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

            for (var i = 0; i < 50; i++) {
                var dataType1 = dataType[i % dataType.length];
                var status1 = ['Active', 'Inactive'][i%2];
                var date = '10/10/2010'
                rowData.push({
                    name: firstNames[i % firstNames.length] + ' ' + lastNames[i % lastNames.length],
                    //mayank
                    dataType: dataType1,             
                    size: Math.round(Math.random() * 100),
                    status: status1,
                    lastUpdated: date,
                    associations: Math.round(Math.random() * 10),
                    rating: Math.round((Math.random() * 10)/2)
                });
            }
            return rowData;
        }

        function ratingRenderer(params){
            var stars = '';
            for(var i =0; i < params.data; i++){
                stars+= '*'
            }
            return stars;
        }
        
        function associationRenderer(params){
            return params.data + ' types'
        }
    });
    
})();
