function controller($scope, invoiceService, customerService, $state, $timeout) {
    var ctrl = this;
    var invoiceId;
    $scope.invoiceForm = {};
    $scope.invoiceItem = {};

    ctrl.$onInit = function() {
        invoiceId = $state.params.invoiceId;

        if(invoiceId){
            $scope.invoiceItem = invoiceService.get({id:invoiceId})
        }else{
            $scope.invoiceItem = new invoiceService();
        }

        customerService.query().$promise.then(function (data) {
            $scope.customersList = data;
            setWatch()
        });

    };

    var watchIndex = 0;
    var setWatch = function () {
        $scope.$watchGroup(['invoiceItem.customer_id','invoiceItem.discount','invoiceItem.total'], function(newVal, oldVal) {
            if(watchIndex > 0){
                saveItem();
            }
            watchIndex++
        });
    };


    var timeOutPromise;
    var saveItem = function () {
        $timeout.cancel(timeOutPromise);
        timeOutPromise = $timeout(function() {
            if($scope.invoiceForm.$valid){
                if(invoiceId){
                    $scope.invoiceItem.$update();
                }else {
                    $scope.invoiceItem.$save({}, function (data) {
                        $state.go('invoices.edit', {invoiceId: data.id})
                    });
                }
            }
        }, 1000);
    }
}

app.component('editInvoice', {
    templateUrl: '/js/app/components/editInvoice/editInvoice.html',
    controller: controller,
    bindings: {
        invoice: '='
    }
});