<template>  
    <div v-if="error.response">
        <div class="chip red darken-4 white-text">
        Error: {{error.response.data}}
        <i class="close fa fa-times"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name:'error',
        computed: {
            error(){
                return this.$root.$data.store.state.error
            }
        }
    }
</script>

<style scoped>
div.chip {
    margin: 10px;
}
</style>