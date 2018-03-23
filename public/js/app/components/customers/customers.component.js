function controller($scope, customerService) {
    customerService.query().$promise.then(function (data) {
            $scope.dataList = data;
        });
}

app.component('customers', {
    templateUrl: '/js/app/components/customers/customers.html',
    controller: controller,
});