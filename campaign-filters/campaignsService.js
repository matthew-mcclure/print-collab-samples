module.exports = campaignsService

function campaignsService(options) { // options is the model we pass into our services w/in our controller
    let Campaign

    if (!options.modelService) { // if there is no model included w/thin our controller. throw error
        throw new Error('Options.modelService is required')
    }

    Campaign = options.modelService // we are setting var equal to options.modelService

    return {
        newPull
    }

    function newPull(queryCondition, page) {
        queryCondition.expiration_date = { $gte: Date.now() }
        return Campaign.find(queryCondition)
            .sort('-created_at')
            .skip((page - 1) * 12)
            .limit(12)
    }
}
