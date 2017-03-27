let Boards = require('../models/board')
let Lists = require('../models/list')
let Tasks = require('../models/task')
let Users = require('../models/user')

export default {
  listsForBoard: {
    path: '/boards/:id/lists',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find List by Board'
      Lists.find({ boardId: req.params.id })
        .then(lists => {
          res.send(handleResponse(action, lists))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  tasksForBoard: {
    path: '/boards/:id/tasks',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Tasks by Board'
      Tasks.find({ boardId: req.params.id })
        .then(tasks => {
          res.send(handleResponse(action, tasks))
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  tasksAndLists: {
    path: '/boards/:id/data',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Find Tasks by Board'
      let data = {}
      Tasks.find({ boardId: req.params.id })
        .then(tasks => {
          data.tasks = tasks
          Lists.find({ boardId: req.params.id })
            .then(lists => {
              data.lists = lists
              res.send(handleResponse(action, data))
            }).catch(error => {
              return next(handleResponse(action, null, error))
            })
        })
    }
  },
  inviteToBoard: {
    path: '/boards/:id/invite',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Invite a User to Collaborate'
      console.log(req.body)
      console.log(req.body.email)
      Users.findOne({ email: req.body.email })
        .then(user => {
          Boards.findById(req.params.id)
            .then(board => {
              board.collaborators.push(user._id)
              board.save()
                .then((board) => {
                  res.send(handleResponse(action, board))
                })
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