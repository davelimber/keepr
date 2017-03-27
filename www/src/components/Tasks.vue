<template>

    <div>
        <div draggable="true" v-on:dragstart.capture="moving" class="card-content blue-grey lighten-1" style="border-radius: 5%">
            <p><strong>{{ task.name }}</strong> - {{ task.description }}</p>
            <p class="right-align">
                <a style="color: #ffab40;"><i @click="toggleEditForm" class="fa fa-pencil"></i></a> | 
                <a style="color: #ffab40;"><i @click="deleteTask(task)" class="fa fa-recycle"></i></a>
            </p>
        </div>
        <br>
    </div>

</template>


<script>
    import Comments from './Comments'
    // import

    export default {
        name: 'tasks',
        components: { Comments },
        props: ['task'],

        data() {
            return {

            }
        },
        methods: {
            deleteTask(task) {
                this.$root.$data.store.actions.removeTask(task, this.$route.params.id)
            },
            moving(event){
                console.log(event)
                event.dataTransfer.setData('text/javascript', JSON.stringify(this.task))
                console.log('We are moving')
            },
            toggleEditForm(){
                this.$parent.showEditForm = !this.$parent.showEditForm
                this.$parent.showTaskForm = false
                this.$parent.editTaskName = this.task.name
                this.$parent.editTaskId = this.task._id
                this.$parent.editTaskDesc = this.task.description
            }
        },

    }

</script>


<style scoped>
    a {
        color: #ffab40;
    }
    
    a:hover {
        color: #ffd8a6;
    }
</style>