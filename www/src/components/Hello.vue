<template>
  <div class="hello">
    <h1>Welcome to Keepr</h1>
    <p>Get Started</p>
    <ul>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
    <hr>
        <div v-if="!this.$root.$data.store.state.user._id">
      <div class="parallax-container">
        <div class="parallax"></div>
      </div>
      <div class="section white">
        <div class="row container">
          <h3 class="header">Learn Kanban</h3>
          <div class="col s4">
            <h5><i class="fa fa-compass"></i> Stay on Target</h5>
            <p>Have all of your tasks and lists in one place, so that you can make sure to stay on task and on target!</p>
          </div>
          <div class="col s4">
            <h5><i class="fa fa-keyboard-o"></i> Increase Productivity</h5>
            <p>By using Kanban to keep your team on task and on target, you'll find that you drastically increase productivity!</p>
          </div>
          <div class="col s4">
            <h5><i class="fa fa-globe"></i> Reducing Carbon Footprint</h5>
            <p>Because we use a recycle icon rather than a trash can, we are more Earth-friendly and reduce the carbon footprint.</p>
          </div>
          <hr>
          <h5>Kanban (看板)</h5>
          <p class="grey-text text-darken-3 lighten-3">Based on a Japanese principle to keep a production system running as a whole, kanban is truly the ultimate when it comes to queue limitation and dividing up tasks from the whole project. Break things down to watch them build back up into a fully functional product.</p>
        </div>
      </div>
        <div class="parallax-container">
          <div class="bgimg-2"></div>
        </div>
      <!--<div class="parallax-container">
        <div class="parallax">
          <img src="../assets/images/typewriter.jpg">
        </div>
      </div>-->
    </div>

    <!-- USER AND SHARED BOARDS WHEN LOGGED IN -->
    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Your Boards</h3>

      <button v-if="!showBoardForm" @click="triggerBoardForm" class="waves-effect waves-light btn">Add Board</button>
      <div class="container" v-if="showBoardForm">
        <h5>Add a Board </h5>
        <form class="row" @submit.prevent="addBoard">
          <div class="col s12 input-field">
            <input type="text" id="boardName" v-model="boardName" required>
            <label for="boardName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="boardDesc" cols="30" rows="10" v-model="boardDesc"></textarea>
            <label for="boardDesc">Description</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Board</button>
          <button @click="triggerBoardForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
        </form>
      </div>

      <div class="row">
        <div v-for="userboard in userboards" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <router-link :to="'/boards/' + userboard._id" @click="getBoard(userboard._id)">
              <div class="card-content white-text">
                <span class="card-title">{{ userboard.name }}</span>
                <p>{{ userboard.description }}</p>
              </div>
            </router-link>
            <div class="card-action right-align">
              <a><i @click="deleteBoard(userboard)" class="fa fa-recycle"></i></a>
            </div>
          </div>
        </div>
      </div>
      <!-- USER AND SHARED BOARDS -->
      <h3>Shared Boards</h3>
      <div class="row">
        <div v-for="sharedboard in sharedBoards" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
              <div class="card-content white-text">
                <span class="card-title">{{ sharedboard.name }}</span>
                <p>{{ sharedboard.description }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
  </div>
    </div>
</template>

<script>
  export default {
    name: 'hello',
    data() {
      return {
        boardName: '',
        boardDesc: '',
        showBoardForm: false
      }
    },
        computed: {
      userboards() {
        return this.$root.$data.store.state.userBoards
      },
      sharedBoards() {
        return this.$root.$data.store.state.sharedBoards
      }
    },
    methods: {
      getBoard: function (boardId) {
        console.log(boardId)
      },
      deleteBoard: function (board) {
        this.$root.$data.store.actions.removeBoard(board)
      },
      addBoard: function () {
        this.$root.$data.store.actions.createBoard({
          name: this.boardName,
          description: this.boardDesc
        })
        this.showBoardForm = false
        this.boardName = ''
        this.boardDesc = ''
      },
      triggerBoardForm: function () {
        this.showBoardForm = !this.showBoardForm
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>