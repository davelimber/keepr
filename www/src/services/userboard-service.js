function userboardService(){

    this.getUserBoards = function(userId){
        $.get('/api/userboards', userId, function(data){
            return data
        })
        $.get('/api/sharedBoards', userId, function(data){
            return data
        })
    }

    this.login = function(email, password){
        var userLogin = {
            email: email,
            password: password
        }
        $.post('/login', userLogin, function(data){
            return data
        })
    }

    this.register = function(email, username, password){
        var userRegister = {
            email: email,
            name: name,
            password: password
        }
        $.post('/register', userRegister, function(data){
            return data
        })
    }

}