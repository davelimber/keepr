let Boards = require('../models/board')
let Lists = require('../models/list')
let Users = require('../models/user')

export default {
  userBoards: {
    path: '/userboards',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find User Boards'
      Boards.find({userId: req.session.uid})
        .then(boards => {
          res.send(handleResponse(action, boards))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  sharedBoards: {
    path: '/sharedboards',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find Shared Boards'
      Boards.find({collaborators: { $in: [req.session.uid]}})
        .then(boards => {
          res.send(handleResponse(action, boards))
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