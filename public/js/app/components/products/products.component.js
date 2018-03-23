function controller($scope, productService) {
    productService.query().$promise.then(function (data) {
        $scope.dataList = data;
    });
}


app.component('products', {
    templateUrl: '/js/app/components/products/products.html',
    controller: controller,
});

