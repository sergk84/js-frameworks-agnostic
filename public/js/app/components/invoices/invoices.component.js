function controller($scope, invoiceService) {
    var ctrl = this;

    var loadData = function () {
        invoiceService.query().$promise.then(function (data) {
            $scope.dataList = data;
        });
    };

    $scope.removeInvoice = function (id) {
        invoiceService.delete_item({id: id}, function (data) {
            loadData();
        })
    };

    ctrl.$onInit = function() {
        loadData()
    };

}

app.component('invoices', {
    templateUrl: '/js/app/components/invoices/invoices.html',
    controller: controller,
});