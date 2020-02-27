(function() {
    agGrid.initialiseAgGridWithAngular1(angular);

    var app = angular.module('basic', ['agGrid']);

    app.controller('basicController', function($scope) {

        var firstNames = ["Sophie", "Isabelle", "Emily", "Olivia", "Lily", "Chloe", "Isabella",
            "Amelia", "Jessica", "Sophia", "Ava", "Charlotte", "Mia", "Lucy", "Grace", "Ruby",
            "Ella", "Evie", "Freya", "Isla", "Poppy", "Daisy", "Layla"];
        var lastNames = ["Beckham", "Black", "Braxton", "Brennan", "Brock", "Bryson", "Cadwell",
            "Cage", "Carson", "Chandler", "Cohen", "Cole", "Corbin", "Dallas", "Dalton", "Dane",
            "Donovan", "Easton", "Fisher", "Fletcher", "Grady", "Greyson", "Griffin", "Gunner",
            "Hayden", "Hudson", "Hunter", "Jacoby", "Jagger", "Jaxon", "Jett", "Kade", "Kane",
            "Keating", "Keegan", "Kingston", "Kobe"];

        var COUNTRY_CODES = {
            Ireland: "ie",
            Spain: "es",
            "United Kingdom": "gb",
            France: "fr",
            Germany: "de",
            Sweden: "se",
            Italy: "it",
            Greece: "gr",
            Iceland: "is",
            Portugal: "pt",
            Malta: "mt",
            Norway: "no",
            Brazil: "br",
            Argentina: "ar",
            Colombia: "co",
            Peru: "pe",
            Venezuela: "ve",
            Uruguay: "uy"
        };
        var dataType = ['IP Adress', 'Email Address', 'Channel']

        var countries = [
            {country: "Ireland", continent: "Europe", language: "English"},
            {country: "Spain", continent: "Europe", language: "Spanish"},
            {country: "United Kingdom", continent: "Europe", language: "English"},
            {country: "France", continent: "Europe", language: "French"},
            {country: "Germany", continent: "Europe", language: "(other)"},
            {country: "Sweden", continent: "Europe", language: "(other)"},
            {country: "Norway", continent: "Europe", language: "(other)"},
            {country: "Italy", continent: "Europe", language: "(other)"},
            {country: "Greece", continent: "Europe", language: "(other)"},
            {country: "Iceland", continent: "Europe", language: "(other)"},
            {country: "Portugal", continent: "Europe", language: "Portuguese"},
            {country: "Malta", continent: "Europe", language: "(other)"},
            {country: "Brazil", continent: "South America", language: "Portuguese"},
            {country: "Argentina", continent: "South America", language: "Spanish"},
            {country: "Colombia", continent: "South America", language: "Spanish"},
            {country: "Peru", continent: "South America", language: "Spanish"},
            {country: "Venezuela", continent: "South America", language: "Spanish"},
            {country: "Uruguay", continent: "South America", language: "Spanish"}
        ];

        var IT_SKILLS = ['android', 'css', 'html5', 'mac', 'windows'];
        var IT_SKILLS_NAMES = ['Android', 'CSS', 'HTML 5', 'Mac', 'Windows'];

        var columnDefs = [
            {
                headerName: '', 
                width: 40, 
                checkboxSelection: true,
                sortable: false,
                suppressMenu: true,
                pinned: true
            },
            {
                headerName: 'NAME',
                field: 'name',
                width: 300                
            },
            {
                headerName: 'DATA TYPE',
                field: 'dataType',
                width: 300                
            },
            {
                headerName: 'SIZE',
                field: 'size',
                width: 300                
            },
            {
                headerName: 'STATUS',
                field: 'status',
                width: 300                
            },
            {
                headerName: 'LAST UPDATED',
                field: 'lastUpdated',
                width: 300                
            },
            {
                headerName: 'ASSOCIATIONS',
                field: 'associations',
                width: 300                
            },
            {
                headerName: 'RATING',
                field: 'rating',
                width: 300                
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
                filter: true,
                resize: true
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
                    proficiency: Math.round(Math.random() * 100),
                    status: status1,
                    lastUpdated: date,
                    associations: Math.round(Math.random() * 10),
                    rating: Math.round((Math.random() * 10)/2)
                });
            }

            return rowData;
        }

        function skillsCellRenderer(params) {
            var data = params.data;
            var skills = [];
            IT_SKILLS.forEach(function (skill) {
                if (data && data.skills[skill]) {
                    skills.push('<img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
                }
            });
            return skills.join(' ');
        }

        function countryCellRenderer(params) {
            var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/flags/" + COUNTRY_CODES[params.value] + ".png'>";
            return flag + " " + params.value;
        }

        function createRandomPhoneNumber() {
            var result = '+';
            for (var i = 0; i < 12; i++) {
                result += Math.round(Math.random() * 10);
                if (i === 2 || i === 5 || i === 8) {
                    result += ' ';
                }
            }
            return result;
        }

        function percentCellRenderer(params) {
            var value = params.value;

            var eDivPercentBar = document.createElement('div');
            eDivPercentBar.className = 'div-percent-bar';
            eDivPercentBar.style.width = value + '%';
            if (value < 20) {
                eDivPercentBar.style.backgroundColor = 'red';
            } else if (value < 60) {
                eDivPercentBar.style.backgroundColor = '#ff9900';
            } else {
                eDivPercentBar.style.backgroundColor = '#00A000';
            }

            var eValue = document.createElement('div');
            eValue.className = 'div-percent-value';
            eValue.innerHTML = value + '%';

            var eOuterDiv = document.createElement('div');
            eOuterDiv.className = 'div-outer-div';
            eOuterDiv.appendChild(eDivPercentBar);
            eOuterDiv.appendChild(eValue);

            return eOuterDiv;
        }

        var SKILL_TEMPLATE =
            '<label style="border: 1px solid lightgrey; margin: 4px; padding: 4px;">' +
            '  <span>' +
            '    <div style="text-align: center;">SKILL_NAME</div>' +
            '    <div>' +
            '      <input type="checkbox"/>' +
            '      <img src="https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/images/skills/SKILL.png" width="30px"/>' +
            '    </div>' +
            '  </span>' +
            '</label>';

        var FILTER_TITLE =
            '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
            '<b>TITLE_NAME</b>' +
            '</div>';

        function SkillFilter() {
        }

        SkillFilter.prototype.init = function (params) {
            this.filterChangedCallback = params.filterChangedCallback;
            this.model = {
                android: false,
                css: false,
                html5: false,
                mac: false,
                windows: false
            };
        };

        SkillFilter.prototype.getModel = function () {

        };

        SkillFilter.prototype.setModel = function (model) {

        };

        SkillFilter.prototype.getGui = function () {
            var eGui = document.createElement('div');
            var eInstructions = document.createElement('div');
            eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
            eGui.appendChild(eInstructions);

            var that = this;

            IT_SKILLS.forEach(function (skill, index) {
                var skillName = IT_SKILLS_NAMES[index];
                var eSpan = document.createElement('span');
                var html = SKILL_TEMPLATE.replace("SKILL_NAME", skillName).replace("SKILL", skill);
                eSpan.innerHTML = html;

                var eCheckbox = eSpan.querySelector('input');
                eCheckbox.addEventListener('click', function () {
                    that.model[skill] = eCheckbox.checked;
                    that.filterChangedCallback();
                });

                eGui.appendChild(eSpan);
            });

            return eGui;
        };

        SkillFilter.prototype.doesFilterPass = function (params) {

            var rowSkills = params.data.skills;
            var model = this.model;
            var passed = true;

            IT_SKILLS.forEach(function (skill) {
                if (model[skill]) {
                    if (!rowSkills[skill]) {
                        passed = false;
                    }
                }
            });

            return passed;
        };

        SkillFilter.prototype.isFilterActive = function () {
            var model = this.model;
            var somethingSelected = model.android || model.css || model.html5 || model.mac || model.windows;
            return somethingSelected;
        };

        var PROFICIENCY_TEMPLATE =
            '<label style="padding-left: 4px;">' +
            '<input type="radio" name="RANDOM"/>' +
            'PROFICIENCY_NAME' +
            '</label>';

        var PROFICIENCY_NONE = 'none';
        var PROFICIENCY_ABOVE40 = 'above40';
        var PROFICIENCY_ABOVE60 = 'above60';
        var PROFICIENCY_ABOVE80 = 'above80';

        var PROFICIENCY_NAMES = ['No Filter', 'Above 40%', 'Above 60%', 'Above 80%'];
        var PROFICIENCY_VALUES = [PROFICIENCY_NONE, PROFICIENCY_ABOVE40, PROFICIENCY_ABOVE60, PROFICIENCY_ABOVE80];

        function ProficiencyFilter() {
        }

        ProficiencyFilter.prototype.init = function (params) {
            this.filterChangedCallback = params.filterChangedCallback;
            this.selected = PROFICIENCY_NONE;
            this.valueGetter = params.valueGetter;
        };

        ProficiencyFilter.prototype.getModel = function () {

        };

        ProficiencyFilter.prototype.setModel = function (model) {

        };

        ProficiencyFilter.prototype.getGui = function () {
            var eGui = document.createElement('div');
            var eInstructions = document.createElement('div');
            eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Proficiency Filter');
            eGui.appendChild(eInstructions);

            var random = '' + Math.random();

            var that = this;
            PROFICIENCY_NAMES.forEach( function (name, index) {
                var eFilter = document.createElement('div');
                var html = PROFICIENCY_TEMPLATE.replace('PROFICIENCY_NAME', name).replace('RANDOM', random);
                eFilter.innerHTML = html;
                var eRadio = eFilter.querySelector('input');
                if (index === 0) {
                    eRadio.checked = true;
                }
                eGui.appendChild(eFilter);

                eRadio.addEventListener('click', function () {
                    that.selected = PROFICIENCY_VALUES[index];
                    that.filterChangedCallback();
                });
            });

            return eGui;
        };

        ProficiencyFilter.prototype.doesFilterPass = function (params) {

            var value = this.valueGetter(params);
            var valueAsNumber = parseFloat(value);

            switch (this.selected) {
                case PROFICIENCY_ABOVE40 : return valueAsNumber >= 40;
                case PROFICIENCY_ABOVE60 : return valueAsNumber >= 60;
                case PROFICIENCY_ABOVE80 : return valueAsNumber >= 80;
                default : return true;
            }

        };

        ProficiencyFilter.prototype.isFilterActive = function () {
            return this.selected !== PROFICIENCY_NONE;
        };

    });

})();
