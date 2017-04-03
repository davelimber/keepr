<template>
  <div class="hello">
    <div v-if="!this.$root.$data.store.state.user._id">
      <div class="section white">
        <div class="row container">
          <h3 class="header">Get Keeps!</h3>

          <!--show keeps for non logged in users-->
          <div class="row">
            <div v-for="sharedKeep in sharedKeeps" class="col s12 m3">
              <div class="card hoverable blue-grey darken-1" @click="getVault(sharedKeeps._id)">
                {{ sharedKeep.title }}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add vault and user vaults when logged in -->


    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Vaults - a place for keeps!</h3>

      <!--Add Vaults-->
      <button v-if="!showVaultForm" @click="triggerVaultForm" class="waves-effect waves-light btn">Add Vault</button>

      <div class="container" v-if="showVaultForm">
        <h5>Add a Vault </h5>
        <form class="row" @submit.prevent="addVault">
          <div class="col s12 input-field">
            <input type="text" id="vaultName" v-model="vaultName" required>
            <label for="vaultName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="vaultDesc" cols="30" rows="10" v-model="vaultDesc"></textarea>
            <label for="vaultDesc">Description</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Vault</button>
          <button @click="triggerVaultForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
        </form>
      </div>

      <!--add keeps!-->
      <button v-if="!showKeepForm" @click="triggerKeepForm" class="waves-effect waves-light btn">Add Keep</button>
      <div class="container" v-if="showKeepForm">
        <h5>Add a Keep </h5>
        <form class="row" @submit.prevent="addKeep">
          <div class="col s12 input-field">
            <input type="text" id="keepName" v-model="keepName" required>
            <label for="keepName">Title</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="keepUrl" cols="30" rows="10" v-model="keepUrl"></textarea>
            <label for="keepUrl">Image URL</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="keepDesc" cols="30" rows="10" v-model="keepDesc"></textarea>
            <label for="keepDesc">Article Link</label>
          </div>
          <div class="col s12 input-field">
            <textarea class="materialize-textarea" id="keepTags" cols="30" rows="10" v-model="keepTags"></textarea>
            <label for="keepTags">Tags (seprate by commas)</label>
          </div>
          <div class="input-field col s2 ">
            <input type="checkbox" class="filled-in" id="public-check-box" checked>
            <!--<textarea class="materialize-textarea" id="KeepPublic" cols="30" rows="10" v-model="KeepPublic"></textarea>-->
            <label for="KeepPublic">Public?</label>
          </div>
          <button class="waves-effect waves-teal btn" type="submit">Add Keep</button>
          <button @click="resetKeepForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
        </form>
      </div>
      <!--List of Vaults with link to add keep within -->
      <div class="row">
        <div v-for="uservault in uservaults" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <!--<button @click="getVault(uservault._id)" class="waves-effect waves-light btn">get info</button>-->
            <router-link :to="'/vaults/' + uservault._id">
              <div class="card-content white-text">
                <span class="card-title">{{ uservault.name }}</span>
                <p>{{ uservault.description }}</p>
              </div>
            </router-link>
            <div class="card-action right-align">
              <a><i @click="deleteVault(uservault)" class="fa fa-recycle"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Shared keeps -->

    <div v-if="this.$root.$data.store.state.user._id">
      <h3>Shared Keeps</h3>
      <div class="row">
        <div v-for="sharedKeep in sharedKeeps" class="col s12 m3">
          <div class="card hoverable blue-grey darken-1">
            <div class="row thumbnails-row">
              <div class="col xs-12 col-sm-6 col-md-4">
                <div class="thumbnail">
                  <img :src="sharedKeep.imageUrl" alt="" height="150" width="150">
                  <div class="caption">
                    <h3>{{ sharedKeep.title }}</h3>
                    <p>{{ sharedKeep.articleLink }}</p>
                    <button v-if="showKeepToVaultForm" @click="showKeepToVault(sharedKeep)" class="waves-effect waves-light btn">Save Keep!</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import selectvault from './SelectVault'
  export default {

    name: 'hello',
    components: {
      selectvault
    },
    data() {
      return {
        vaultName: '',
        vaultDesc: '',
        showVaultForm: false,
        showKeepToVaultForm: true,
        vaultId: [],
        keepName: '',
        keepDesc: '',
        keepUrl: '',
        keepTags: '',
        keepPublic: '',
        showKeepForm: false,

      }
    },
    mounted() {
      this.$root.$data.store.actions.getPublicKeeps();
    },
    computed: {
      uservaults(vaults) {

        return this.$root.$data.store.state.myVaults
      },

      sharedKeeps() {
        return this.$root.$data.store.state.keeps;
      }
    },
    methods: {
      getVault: function (x) {
        console.log(x)
        this.$root.$data.store.actions.getKeeps(x)
      
        // console.log(vaultId)
      },
      deleteVault: function (vault) {
        this.$root.$data.store.actions.removeVault(vault)
      },
      addVault: function () {
        console.log('in addvault function')
        this.$root.$data.store.actions.createVault({
          name: this.vaultName,
          description: this.vaultDesc
        })
        console.log(this.vaultName)
        console.log(this.uservaults)
        this.showVaultForm = false
        this.vaultName = ''
        this.vaultDesc = ''
      },
      addKeep: function () {
        var pubcheck = document.getElementById('public-check-box').checked
        this.$root.$data.store.actions.createKeep({
          title: this.keepName,
          articleLink: this.keepDesc,
          imageUrl: this.keepUrl,
          public: pubcheck,
          tags: this.keepTags
        }, this.$route.params.id)
        Materialize.toast('Saved a keep!', 1000);
        this.showKeepForm = false
        this.keepName = ''
        this.keepDesc = ''
        this.keepUrl = ''
        this.keepPublic = ''
        this.keepTags = ''

        this.$router.push("/")
      },
      triggerVaultForm: function () {
        this.showVaultForm = !this.showVaultForm
      },
      triggerKeepForm: function () {
        this.showVaultForm = false
        this.showKeepForm = !this.showKeepForm
      },
      resetKeepForm: function () {
        this.showVaultForm = false
        this.showKeepForm = false
      },
      // showKeepToVault: function (sharedKeep) {
      //   this.showKeepToVaultForm = !this.showKeepToVaultForm
      //   console.log('here I am!')
      //   console.log(sharedKeep.title)
      // },
      showKeepToVault: function (selectedKeep) {
        if (this.$root.$data.store.state.user._id) {
          this.$root.$data.store.state.activeKeep = selectedKeep
          console.log('passed user test')
          this.$router.push({ path: '/selectvault/' })
        } else {
          this.$router.push({ path: '/register' })
          Materialize.toast('You must have an account to view and save keeps!', 1000);
        }
      },
      saveKeepToVault: function () {

      },
      routeHome: function () {
        console.log('route home function')
        this.showKeepToVault();

      },
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input {
    display: block !important
  }
  
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
  
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }
  
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }
  
  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }
  
  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }
  
  .modal-body {
    margin: 20px 0;
  }
  
  .modal-default-button {
    float: right;
  }
  /*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */
  
  .modal-enter {
    opacity: 0;
  }
  
  .modal-leave-active {
    opacity: 0;
  }
  
  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>