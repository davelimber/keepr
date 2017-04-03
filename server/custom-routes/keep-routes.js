let Keeps = require('../models/keep')
let Vaults = require('../models/vault')
let Users = require('../models/user')


export default {
    publicKeeps: {
        path: '/publickeeps',
        reqType: 'get',
        method(req, res, next) {
            console.log('in public keeps')
            let action = 'Find Public Keeps'
            Keeps.find({ public: true })
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    },
    createKeep: {
        path: '/newkeep',
        reqType: 'post',
        method(req, res, next) {
            let action = "Create New Keep"
            let result;
            console.log('request for new keep   =  ', req.body)
            Keeps.create(req.body)
                .then(keep => {
                    keep.timesVaulted += 1
                    console.log(keep.timesVaulted)
                    keep.save()
                    res.send(handleResponse(action, keep))
                    Vaults.findOne({ name: req.body.name })
                        .then(vault => {
                            console.log(vault)
                            vault.keeps.push(keep._id)
                            result = vault
                            vault.save()
                            res.send(handleResponse(action, vault))
                        })
                })
                .catch(error => {
                    res.send(handleResponse(action, null, error))
                })
        }
    },
    removeKeepFromVault: {
        path: '/vault/:id/removeKeep',
        reqType: 'put',
        method(req, res, next) {
            let action = 'Remove Keep from Vault'
            Vaults.findById(req.params.id)
                .then(vault => {
                    let index = vault.keeps.indexOf(req.body.keepId)
                    vault.keeps.splice(index, 1)
                    vault.save()
                        .then(savedVault => {
                            res.send(handleResponse(action, savedVault))
                        })
                        .catch(error => {
                            return next(handleResponse(action, null, error))
                        })
                })
        }
    },
    keepToNewVault: {
        path: '/keeptonewvault/:id',
        reqType: 'put',
        method(req, res, next) {
            let action = "Keep To New Vault"
            console.log('add keep routes in keep to new vault')
                // let result;
            Keeps.findOne({ _id: req.params.id })
                .then(keep => {
                    keep.timesVaulted += 1
                    console.log(keep.timesVaulted)
                    keep.save()
                    // console.log(vault)
                    // let vaultid = vault
                    Vaults.findOne({ name: req.body.name })
                    // Vaults.findOne({ vaultid })
                        .then(vault => {
                            console.log('show vault for keep', vault)
                            vault._doc.keeps.push(keep._id)
                                // result = vault
                            vault.save()
                            console.log('kept in vault', vault._doc.keeps)
                            res.send(handleResponse(action, vault))
                        })
                })
                .catch(error => {
                    // console.log('error in keep to vault occured')
                    res.send(handleResponse(action, null, error))
                })
        }
    },
    taggedKeeps: {
        path: '/taggedKeeps',
        reqType: 'post',
        method(req, res, next) {
            let action = 'Tagged Keeps'
            Keeps.find({ tags: { "$regex": req.body.tags, "$options": "i" } })
                .then(keeps => {
                    res.send(handleResponse(action, keeps))
                })
                .catch(error => {
                    res.send(handleResponse(action, null, error))
                })
        }
    },
    currentKeep: {
        path: '/keep/:id/current',
        reqType: 'get',
        method(req, res, next) {
            let action = 'Get Keep'
            Keeps.findById(req.params.id)
                .then(keep => {
                    keep.views += 1
                    keep.save()
                    console.log(keep)
                    res.send(handleResponse(action, keep))
                }).catch(error => {
                    return next(handleResponse(action, null, error))
                })
        }
    }
}

function handleResponse(action, data, error) {

    var response = {
        action: action,
        data: data
    }
    if (error) {
        response.error = error
    }
    return response
}