function IndexController($scope) {
    
    $scope.toggle = true;
    
    $scope.toggleLoginRegister = function() {
        $scope.toggle = !$scope.toggle;
    };
    
}