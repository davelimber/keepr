<template>
    <div>
        <h2> Vault Name </h2>
        <h3>{{ activeVault.name }}</h3>
        <p>{{ activeVault.description }}</p>

        <div v-for="keep in activeVault.keeps" class="col m4 s6">

            {{ keep }}

            <button @click="removeKeep(keep)"><i class="fa fa-times"> </i></button>

        </div>



    </div>
</template>


<script>
    export default {
        name: 'vault',
        data() {
            return {
                vault: [],
                keepName: '',
                keepDesc: '',
                showKeepForm: false,
                url: '',
                tags: '',
                public: true,
                showmodal: true
            }
        },
        mounted() {
            this.$root.$data.store.actions.setActiveVault(this.$route.params.id)
        },
        computed: {
            activeVault() {
                return this.$root.$data.store.state.activeVault
            },
            uservaults(vaults) {

                return this.$root.$data.store.state.myVaults
            },
        },
        methods: {
            getVault: function (vaultId) {
                console.log('get vault by vaultId')
                console.log(vaultId)
            },
            addKeep: function () {
                this.$root.$data.store.actions.createKeep({
                    title: this.keepName,
                    body: this.keepDesc,
                    imgUrl: this.url,
                    public: this.public,
                }, this.$route.params.id)
                this.showKeepForm = false
                this.keepName = ''
                this.keepDesc = ''
                this.$router.push("/")
            },
            removeKeep: function () {
                this.$route.data.store.actions.removeKeepFromVault(this.$route.params.id, keep)
            },
            triggerKeepForm: function () {
                this.showKeepForm = !this.showKeepForm
                this.showInviteForm = false
                this.keepDesc = ''
            },
            routeHome: function () {
                this.showmodal = false
                this.$router.push("/")
            },
        }
    }

</script>


<style scoped>
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