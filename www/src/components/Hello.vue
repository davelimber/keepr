<template>
  <div class="hello">

    <!-- <ul>
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
    </ul>
    <hr>-->



    <div v-if="!this.$root.$data.store.state.user._id">
      <!--<div class="parallax-container">
        <div class="parallax"></div>
      </div>-->
      <div class="section white">
        <div class="row container">
          <h3 class="header">Get Keeps!</h3>

          <!--show keeps for non logged in users-->
          <div class="row">
            <div v-for="sharedBoard in sharedBoards" class="col s12 m3">
              <div class="card hoverable blue-grey darken-1" @click="getBoard(sharedboard._id)">
                {{ sharedBoard.title }}

                <!--Pulling data from DB-->
                <!--<router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
            <div class="card-content white-text">
              <span class="card-title">        
                {{ sharedboard.name }}
                </span>
              <p>{{ sharedboard.description }}</p>
            </div>
          </router-link>-->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<div class="parallax-container">
          <div class="bgimg-2"></div>
        </div>-->
    </div>

    <!-- USER AND SHARED BOARDS WHEN LOGGED IN -->


    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Your Vault</h3>

      <button v-if="!showBoardForm" @click="triggerBoardForm" class="waves-effect waves-light btn">Add Vault</button>
      <div class="container" v-if="showBoardForm">
        <h5>Add a Vault </h5>
        <form class="row" @submit.prevent="addBoard">
          <div class="col s12 input-field">
            <input type="text" id="boardName" v-model="boardName" required>
            <label for="boardName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="boardDesc" cols="30" rows="10" v-model="boardDesc"></textarea>
            <label for="boardDesc">Description</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Vault</button>
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
    </div>

    <!-- USER AND SHARED BOARDS -->

    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Shared Keeps</h3>
      <div class="row">
        <div v-for="sharedBoard in sharedBoards" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1" @click="getBoard(sharedboard._id)">
            <!--{{ sharedBoard.title }}-->
            <div class="row thumbnails-row">
              <div class="col xs-12 col-sm-6 col-md-4">
                <a href="" target="_blank">
                  <div class="thumbnail">
                    <img :src="sharedBoard.imgUrl" alt="">
                    <div class="caption">
                      <h3>{{ sharedBoard.title }}</h3>
                      <p></p>
                      <p>{{ sharedBoard.body }}</p>
                      <a href="" target="_blank">
                        <p><span class="project-link dotted-underline">See it live</span></p>
                      </a>
                      <a href="" target="_blank">
                        <p><span class="project-link dotted-underline">Source Code</span></p>
                      </a>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div cl <!--Pulling data from DB-->
              <!--<router-link :to="'/boards/' + sharedboard._id" @click="getBoard(sharedboard._id)">
            <div class="card-content white-text">
              <span class="card-title">        
                {{ sharedboard.name }}
                </span>
              <p>{{ sharedboard.description }}</p>
            </div>
          </router-link>-->
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
        return this.$root.$data.store.state.keeps
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
        console.log(this.boardName)
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