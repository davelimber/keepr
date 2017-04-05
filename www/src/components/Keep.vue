<template>

<div>   
Hello
    {{ keep.title }}
    {{ keep.views }} 
{{ keep.timesVaulted }}


</div>

</template>


<script>
    export default {
        name: 'keeps',
        props: ['keep'],
        data() {
            return {
 
            }
        },


        methods: {


        }
    }

</script>


<style scoped>

</style>