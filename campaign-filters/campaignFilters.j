/* global angular */
/* this file includes no semi-colons in accordance with standardJS */

angular.module('public')
    .directive('filters', filterDirective)

function filterDirective() {
    return {
        restrict: 'E',
        templateUrl: '/client/_common/views/campaignFilters.html',
        controller: filterController,
        controllerAs: 'vm'
    }
}

filterController.$inject = ['CampaignPageService', '$http', '$timeout', '$state']

function filterController(CampaignsService, $http, $timeout, $state) {
    var vm = this
    vm.headline = 'Find What You Love'
    vm.campaigns = []
    vm.tags = {}
    vm.query = {}
    vm.options = {}
    vm.range = {}
    vm.newPull = getCampaigns
    vm.loadMore = _loadMore
    vm.getTags = getTags
    vm.priceRanges = [{
        display: '$0 - 30',
        range: {
            $gt: '0',
            $lt: '30'
        }
    }, {
        display: '$30 - 60',
        range: {
            $gt: '30',
            $lt: '60'
        }
    }, {
        display: '$60 - 100',
        range: {
            $gt: '60',
            $lt: '100'
        }
    }, {
        display: '$100 - 150',
        range: {
            $gt: '100',
            $lt: '150'
        }
    }, {
        display: '$150+',
        range: {
            $gt: '150',
            $lt: '9999'
        }
    }]
    
    if ($state.params.fromFilter) vm.query.tags = $state.params.fromFilter

    getTags()
    getOptions()
    getCampaigns()


    function getOptions() {
        CampaignsService.getOptions(onOptionsSuccess, onError)
    }

    function onOptionsSuccess(response) {
        vm.options = response
    }

    function getCampaigns() {
        vm.page = 1
        CampaignsService.newPull(vm.query, vm.page, onNewPullSuccess, onError)
    }

    let getting

    function getTags(val) {
        var url = '/api/tags/find/'
        let match = val
        return $http.get(url + match).then((tags) => {
            tags = tags.data.items.map(tag => tag.tag)
            if (getting) $timeout.cancel(getting)
            getting = $timeout(getCampaigns, 1000)
            return tags
        })
    }

    function onNewPullSuccess(response) {
        vm.campaigns = response.data.items
    }

    function _loadMore() {
        vm.page++
        CampaignsService.newPull(vm.query, vm.page, onLoadMoreSuccess, onError)
    }

    function onLoadMoreSuccess(response) {
        vm.campaigns = vm.campaigns.concat(response.data.items)
    }

    function onError(response) {
        console.log(response)
    }
}
