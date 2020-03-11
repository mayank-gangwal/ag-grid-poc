describe('testing angularjs test suite', function(){
    describe('testing angularjs controller', function(){
        it('should initialize title in scope', function(){
            module('myApp');
            var scope = {};
            var ctrl;

            inject(function($controller){
                ctrl = $controller('ctrl', {$scope: scope});
            });

            expect(scope.test).toBeDefined();
            expect(scope.test).toBe('wohoooooo');
        });
    });
});