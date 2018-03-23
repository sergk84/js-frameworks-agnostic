function controller($scope, productService, $timeout, invoiceItemService) {
    var ctrl = this;
    $scope.newItem;
    $scope.invoice;

    var timeOutPromise = [];
    var timeOutWatchIndex = [];
    var collectionWatch = function () {};
    var addWatchToItem = function (item, index) {
        var itemIndex = index;
        $scope.$watchGroup(['invoiceItems[' + index + '].product_id', 'invoiceItems[' + index + '].quantity'],
            function (n, o) {
                if (timeOutWatchIndex[itemIndex]) {
                    $timeout.cancel(timeOutPromise[itemIndex]);
                    timeOutPromise[itemIndex] = $timeout(function () {
                        $scope.invoiceItems[itemIndex].$update(function () {
                            chackQuantity();
                        });
                    }, 1000);
                }
                timeOutWatchIndex[itemIndex] = true;
            });
    };

    var loadData = function () {
        ctrl.resource.query().$promise.then(function (data) {
            $scope.invoiceItems = data;
            angular.forEach($scope.invoiceItems, addWatchToItem);
            chackQuantity();
        });
    };

    var chackQuantity = function () {
        collectionWatch();
        collectionWatch = $scope.$watchCollection('invoiceItems', function (newVal) {
            var quantity = 0;
            angular.forEach(newVal,function (item) {
                var id = item.product_id;
                var price = $scope.productList.filter(function(item) {
                    return item.id === id;
                })[0].price;
                var itemPrice = price * item.quantity;
                item.itemPrice = itemPrice;
                quantity+= itemPrice;
            });
            ctrl.invoice.total = quantity;
        })
    };


    var watchIndex = 0;
    var watcher;
    $scope.add = function () {
        $scope.newItem = null;
        $scope.newItem = new ctrl.resource();
        watcher = $scope.$watchGroup(['newItem.product_id', 'newItem.quantity'], function (newVal, oldVal) {
            if (watchIndex > 0 && ($scope.newItem.product_id && $scope.newItem.quantity)) {
                $scope.newItem.$save({}, function (data) {
                    $scope.newItem = null;
                    watcher();
                    loadData();
                });
            }
            watchIndex++
        });
    };

    $scope.remove = function (id) {
        ctrl.resource.delete_item({id: id}, function (data) {
            loadData();
        })
    };

    ctrl.$onInit = function () {
        ctrl.resource = invoiceItemService.getResource(ctrl.invoice.id);
        $scope.invoice = ctrl.invoice;
        productService.query().$promise.then(function (data) {
            $scope.productList = data;
            loadData();
        });
    };

}

app.component('invoiceItem', {
    templateUrl: '/js/app/components/invoiceItems/invoiceItems.html',
    controller: controller,
    bindings: {
        invoice: '='
    }
});