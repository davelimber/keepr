<template>
    <div>
        <h2> Save a Keep </h2>
        <h3>{{ activeKeep.title }}</h3>
        <p>save the selected keep to one or more vaults below</p>


        <div class="row">
            <div v-for="uservault in uservaults" class="col s12 m3">
                <div class="card hoverable blue-grey darken-1">


                    <div class="card-content white-text">
                        <span class="card-title">{{ uservault.name }}</span>
                        <p>{{ uservault.description }}</p>
                    </div>

                    <div class="card-action right-align">
                        <button @click="addToVault(activeKeep._id, uservault)" class="waves-effect waves-teal btn-flat"><i class="fa fa-plus"></i>Add Keep to Vault</button>
                    </div>
                </div>
            </div>
            <button @click="routeHome()" class="waves-effect waves-teal btn-flat"><i class="fa fa-plus"></i>Home</button>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'selectvault',
        props: ['sharedKeep'],
        data() {
            return {
                vaultName: '',
                activeKeepId: '',
                userVaultId: ''
            }
        },
        computed: {
            uservaults() {

                return this.$root.$data.store.state.myVaults
            },

            activeKeep() {
                return this.$root.$data.store.state.activeKeep
            },
            activeUserId() {
                return this.$root.$data.store.state.user._id
            }
        },
        methods: {

            routeHome: function () {
                // this.showmodal = false
                this.$router.push("/")
            },
            addToVault(x, y) {
                console.log(x)
                console.log(y)
                this.$root.$data.store.actions.addKeepToVault(x, y)
                Materialize.toast('keep added to vault', 5000)
            }

        }
    }

</script>


<styles>


</styles>