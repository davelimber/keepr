let Vaults = require('../models/vault')
let Keeps = require('../models/keep')
let Users = require('../models/user')

export default {
  keepsForVault: {
    path: '/vaults/:id/keeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Keeps by Vault'
      Vaults.findById(req.params.id)
      .populate('keeps')
      
        .then(vault => {
            

          res.send(handleResponse(action, vault))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  removeKeepFromVault: {
    path: '/vault/:id/removekeep',
    reqType: 'put',
    method(req, res, next) {
      let action = 'remove the keep from a vault'
      Vaults.findById(req.params.id)
        .then(vault => {
          let index = vault.keeps.indexOf(req.body.keepId)
          vault.keeps.splice(index, 1)
          vault.save()
            .then(savedVault => {
              res.send(handleResponse(action, savedVault))
            })
        })
        .catch(error => {
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