let Comments = require('../models/comment')
let Tasks = require('../models/task')

export default {
  commentsForTask: {
    path: '/tasks/:id/comments',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find Comments on Task'
      Comments.find({taskId: req.params.id})
        .then(comments => {
          res.send(handleResponse(action, comments))
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