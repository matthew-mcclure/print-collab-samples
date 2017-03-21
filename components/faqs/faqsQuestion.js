angular.module('public.faqs')
    .component('question', {
        bindings: {
            question: '<',
            type: '<'
        },
        templateUrl: '/../../yourURL.html'
    })
