<template>
    <div>
        <h2> Vault Name </h2>
        <h3>{{ activeVault.name }}</h3>
        <p>{{ activeVault.description }}</p>

        <!--<div v-for="keep in activeVault.keeps" class="col m4 s6">-->

        <!--{{ keep }}-->

        <div v-for="keep in activeVault.keeps" class="col s6 m4">
            <div>
                <!--<div>-->
               {{ keep.title }} 
               <a @click="removeKeep(keep._id)"><i class="fa fa-times">remove keep</i></a>
            </div>
          
        </div>

        <!--<button @click="removeKeep(keep)"><i class="fa fa-times"> </i></button>-->

        <!--</div>-->



    </div>
</template>


<script>
    import Keep from './Keep'
    export default {
        name: 'vault',
        components: {
            Keep
        },
        data() {
            return {
                vault: [],
                keep: {},
                myKeeps: {},
                showKeepForm: false,
                url: '',
                tags: '',
                public: true,
                showmodal: true
            }
        },
        mounted() {
            this.$root.$data.store.actions.setActiveVault(this.$route.params.id)
            this.$root.$data.store.actions.getKeeps(this.$route.params.id);
        },
        computed: {
            activeVault() {
                return this.$root.$data.store.state.activeVault
            },
            myKeeps () {
                return this.$root.$data.store.state.activeKeeps
            },
        },
        methods: {
            getVault: function (vaultId) {
                console.log('get vault by vaultId')
                console.log(vaultId)
            },
            removeKeep: function (keepId) {
                console.log(this.activeVault._id)
                console.log(keepId)
                 this.$root.$data.store.actions.removeKeepFromVault(this.activeVault._id, keepId)
            },

            routeHome: function () {
                this.showmodal = false
                this.$router.push("/")
            },
        }
    }

</script>


<style scoped>

</style>