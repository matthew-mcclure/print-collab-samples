const responses = require('../models/responses')
const campaignModel = require('../models/campaign')
const campaignsService = require('../services/campaigns.service')({
    modelService: campaignModel
})
const orderModel = require('../models/order')
const ordersService = require('../services/orders.service')({
    modelService: orderModel
})

module.exports = campaignsController

function campaignsController() {
    return {
        newPull
    }

    function newPull(req, res) {
        let queryCondition = JSON.parse(req.params.query)
        let page = req.params.page

        function dotNotate(obj, target, prefix) {
            target = target || {}
            prefix = prefix || ''

            Object.keys(obj).forEach(function(key) {
                if (typeof(obj[key]) === 'object' && key !== 'price') {
                    dotNotate(obj[key], target, prefix + key + '.')
                } else {
                    return target[prefix + key] = obj[key]
                }
            })
            return target
        }

        campaignsService.newPull(dotNotate(queryCondition), page)
            .then((campaigns) => {
                const responseModel = new responses.ItemsResponse()
                responseModel.items = campaigns
                res.json(responseModel)
            })
            .catch((err) => {
                res.status(500).send(new responses.ErrorResponse(err))
            })
    }
}
