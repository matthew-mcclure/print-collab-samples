/* global angular */
angular.module('public.faqs')
    .component('faqsMain', {
        bindings: {
            count: '<'
        },
        templateUrl: '/../../yourURL.html'
    })

FaqsMainController.$inject = ['$state', 'FaqsService']

function FaqsMainController($state, FaqsService) {
    var vm = this
    vm.faqLine = 'Frequently Asked Questions'
    vm.faqs = []
    vm.sellFaqs = []
    vm.buyFaqs = []
    vm.questionTypes = ['general', 'seller', 'buyer']

    getAllFaqs()

    function getAllFaqs() {
        FaqsService.getAll(getAllSuccess, getAllError)
    }

    function getAllSuccess(data, sellerData, buyerData) {
        for (var i = 0; i < data.items.length; i++) {
            var currentFaq = data.items[i] // added items
            switch (currentFaq.questionType) {
                case 'general':
                    vm.faqs.push(currentFaq)
                    break

                case 'seller':
                    vm.sellFaqs.push(currentFaq)
                    break

                case 'buyer':
                    vm.buyFaqs.push(currentFaq)
            }
        }
    }

    function getAllError(err) {
        console.log(err)
    }
}
