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

            for (var i = 0; i < 50; i++) {
                var dataType1 = dataType[i % dataType.length];
                var status1 = ['Active', 'Inactive'][i%2];
                var date = '10/10/2010'
                rowData.push({
                    name: firstNames[i % firstNames.length] + ' ' + lastNames[i % lastNames.length],
                    //mayank
                    dataType: dataType1,             
                    size: Math.round(Math.random() * 10),
                    status: status1,
                    lastUpdated: date,
                    associations: Math.round(Math.random() * 10),
                    rating: Math.round((Math.random() * 10)/2)
                });
            }
            return rowData;
        }

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
