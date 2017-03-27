import axios from 'axios'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

// REGISTER ALL DATA HERE
let state = {
  // from kanban
    userBoards: [],
    sharedBoards: [],
 // end kanban
  user: {},
  myVaults: {},
  myKeeps: {},
  //Dummy Data
  keeps: [{
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/b0/7f/71/b07f713b8fa296e871dd8c169ff86fd5.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/c7/80/e3/c780e34c14258f4087df410f03d76e83.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatisconsectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Learn to Draw',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/564x/b0/7f/71/b07f713b8fa296e871dd8c169ff86fd5.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }, {
    title: 'Build Beautiful sites',
    imgUrl: 'https://s-media-cache-ak0.pinimg.com/236x/1b/81/b4/1b81b4d253053096b4097c53929f04c3.jpg',
    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, officiis asperiores quisquam, temporibus sint veritatis, doloribus eveniet sapiente perferendis nobis aliquid, quasi ipsa a repudiandae quaerat quos ex quod nemo',
    keepCount: 100,
    shareCount: 300,
    viewCount: 900,
    author: 'JimyJonJones'
  }],
  error: {}
}

let handleError = (err) => {
  state.error = err
}

export default {
  // ALL DATA LIVES IN THE STATE
  state,
  // ACTIONS ARE RESPONSIBLE FOR MANAGING ALL ASYNC REQUESTS
  actions: {
            login(userEmail, userPassword){
            api.post('http://localhost:3001/login', {
                email: userEmail,
                password: userPassword
            })
                .then(res => {
                    console.log(res.data)
                    if(res.data.data){
                        state.user = res.data.data
                        this.getUserBoards()
                        this.getSharedBoards()
                    } else {
                        state.error = res.data.error
                        Materialize.toast(res.data.error, 1000);
                    }
                })
                .catch(handleError)
        },
        register(email, name, password){
            api.post('http://localhost:3001/register', {
                email: email,
                name: name,
                password: password
            })
                .then(res => {
                    state.user = res.data.data
                })
                .catch(handleError)
        },
        logout(){
            api.delete('http://localhost:3001/logout')
                .then(res => {
                    state.user = {};
                    Materialize.toast(res.data.message, 2000);
                })
                .catch(handleError)
        },
        getBoards() {
            api('boards')
                .then(res => {
                    state.boards = res.data.data
                })
                .catch(handleError)
        },
        getUserBoards(){
            api('userboards')
                .then(res => {
                    state.userBoards = res.data.data
                })
                .catch(handleError)
        },
        getSharedBoards(){
            api('sharedboards')
                .then(res => {
                    state.sharedBoards = res.data.data
                })
        },
        getBoard(id){
            api('boards/' + id)
                .then(res => {
                    state.activeBoard = res.data.data
                    this.getTasksandLists(id)
                })
                .catch(handleError)
        },
        getTasksandLists(id){
            api('boards/' + id + '/data')
                .then(res => {
                    console.log(res.data.data)
                    state.activeLists = res.data.data.lists
                    state.activeTasks = res.data.data.tasks
                })
        },
        createBoard(board){
            api.post('boards', board)
                .then(res => {
                    this.getUserBoards()
                })
                .catch(handleError)
        },
        removeBoard(board){
            api.delete('boards/' + board._id)
                .then(res => {
                    this.getUserBoards()
                })
                .catch(handleError)
        },
        addCollab(email, boardId){
            api.post('boards/' + boardId + '/invite', email)
                .then(res => {
                    if(res.data.data.collaborators){
                        Materialize.toast('User added to board', 2000)
                    }
                    this.getSharedBoards()
                })
                .catch(handleError)
        },
        createList(list, boardId){
            api.post('lists', list)
                .then(res => {
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        },
        removeList(list, boardId){
            api.delete('lists/' + list._id)
                .then(res => {
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        },
        createTask(task, boardId){
            api.post('tasks', task)
                .then(res => {
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        },
        removeTask(task, boardId){
            api.delete('tasks/' + task._id)
                .then(res => {
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        },
        editTask(task, taskId, boardId){
            api.put('tasks/' + taskId, task)
                .then(res => {
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        },
        droppedTask(task, newListId, boardId){
            api.put('tasks/' + task._id, { listId: newListId })
                .then(res => {
                    console.log(res.data)
                    this.getTasksandLists(boardId)
                })
                .catch(handleError)
        }
  }

}

