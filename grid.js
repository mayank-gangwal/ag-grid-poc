(function() {
    agGrid.initialiseAgGridWithAngular1(angular);

    var app = angular.module('basic', ['agGrid']);

    app.controller('basicController', function($scope, $http) {

        var columnDefs = [
            {
                headerName: 'NAME',
                field: 'name',
                checkboxSelection: true,
                headerCheckboxSelection: true,
            },
            {
                headerName: 'DATA TYPE',
                field: 'dataField'
            },
            {
                headerName: 'SIZE',
                field: 'itemCount',
                cellRenderer: sizeRenderer
            },
            {
                headerName: 'STATUS',
                field: 'status',
                cellRenderer: statusRenderer
            },
            {
                headerName: 'LAST UPDATED',
                field: 'auditData.lastUpdatedTime',
                cellRenderer: dateRenderer
            },
            {
                headerName: 'ASSOCIATIONS',
                field: 'rulesCount',
                cellRenderer: associationRenderer
            },
            {
                headerName: 'RATING',
                field: 'rating',
                cellRenderer: ratingRenderer,
                filter: false
            }
        ];

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowData: createRowData(),
            //setRowData: setRowData(),
            rowSelection: 'multiple',
            //onModelUpdated: onModelUpdated,
            suppressRowClickSelection: true,
            pagination: true,
            floatingFilter: true,
            paginationPageSize: 10,
            defaultColDef: {
                sortable: true,
                filter: true,
                width: 182
            }
        };

        function createRowData() {
            $http({
                method: 'GET',
                url: 'http://demo7622837.mockable.io//list'
              }).then(
                    function successCallback(response) {
                        console.log(response);
                        $scope.gridOptions.api.setRowData(response.data.slice(0,response.data.length));
                },  function errorCallback(response) {
                        console.log(response);
                });
        }

        function statusRenderer(params){
            var statusType = params.data.status === 'active' ? 'green' : 'grey';
            var statusDot = '<span style = "height: 10px; width: 10px; background-color:' + statusType +  '; border-radius: 50%; display: inline-block;"> </span>'
            return statusDot + ' ' + params.data.status.charAt(0).toUpperCase() + params.data.status.substring(1);
        }

        function ratingRenderer(params){
            var stars = '';
            //var fontAwesomeStar = '<i class="fas fa-star"></i>'
            for(var i =0; i < params.value; i++){
                //stars+= fontAwesomeStar;
                stars += '<img src="images/star.svg" class="star" width="12" height="12"></img>'
                //stars+='* ';
            }
            return stars;
        }

        function dateRenderer(params){
            var dateFormat = new Date(params.data.auditData.lastUpdatedTime);
            return dateFormat.toLocaleString();
        }
        
        function associationRenderer(params){
            var association = (params.data.rulesCount === 0 || params.data.rulesCount === 1 ) ? 'Rule' : 'Rules' ;
            return params.data.rulesCount + ' ' + association;
        }

        function sizeRenderer(params){
            var size = (params.data.itemCount === 0 || params.data.itemCount === 1 ) ? 'Item' : 'Items' ;
            return params.data.itemCount + ' ' + size;
        }

        $scope.disableSave = function(){
            return ($scope.newListName && $scope.newListDataType && $scope.newListDescription) ? false : true;
        }
        $scope.onCancel = function(){
            clearDataModal();
        }
        $scope.onSave = function(){
            clearDataModal();
            $('#newListModal').modal('hide');
        }
        function clearDataModal(){
            $scope.newListName = '';
            $scope.newListDataType = '';
            $scope.newListDescription = '';
        }
    });

})();
