<template>
    <div>
        <h2> Vault Name </h2>
        <h3>{{ activeVault.name }}</h3>
        <p>{{ activeVault.description }}</p>

        <!--<div v-for="keep in activeVault.keeps" class="col m4 s6">-->

        <!--{{ keep }}-->

        <div v-for="keep in activeVault.keeps" class="col s6 m4">
            <div class="right-align">
                <a @click="removeKeep(keep)"><i class="fa fa-times">remove keep</i></a>
            </div>
            <keep :keep="keep"></keep>
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
            // this.$root.$data.store.actions.getUserKeeps();
        },
        computed: {
            activeVault() {
                return this.$root.$data.store.state.activeVault
            },
        },
        methods: {
            getVault: function (vaultId) {
                console.log('get vault by vaultId')
                console.log(vaultId)
            },
            removeKeep: function () {
                this.$route.data.store.actions.removeKeepFromVault(this.$route.params.id, keep)
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