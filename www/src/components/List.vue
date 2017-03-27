<template>
    <div>
        <div droppable="true" v-on:drop.capture="dropTask" ondragover="event.preventDefault()" class="col s3">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">{{ list.name }}</span>
                    <p>{{ list.description }}</p>
                    <div v-if="tasks[0]">
                        <div v-for="task in tasks" class="left-align">
                            <task v-if="task.listId == list._id" :task="task"></task>
                        </div>
                    </div>
                </div>
                <div v-if="showTaskForm" class="card-action white-text">
                    <h4>Add a Task</h4>
                    <form class="row" @submit.prevent="addTask">
                        <div class="col s12 input-field">
                            <input type="text" id="taskName" v-model="taskName" required>
                            <label for="taskName">Title</label>
                        </div>
                        <div class="col s12 input-field">
                            <textarea class="materialize-textarea" id="taskDesc" cols="30" rows="10" v-model="taskDesc"></textarea>
                            <label for="taskDesc">Description</label>
                        </div>
                        <button class="waves-effect waves-teal btn" type="submit">Add Task</button>
                    </form>

                </div>
                <div v-if="showEditForm" class="card-action white-text">
                    <h4>Edit Task</h4>
                    <form class="row" @submit.prevent="updateTask">
                        <div class="col s12 input-field">
                            <input type="text" v-model="editTaskName" required>
                        </div>
                        <div class="col s12 input-field">
                            <textarea class="materialize-textarea" cols="30" rows="10" v-model="editTaskDesc"></textarea>
                        </div>
                        <button class="waves-effect waves-teal btn" type="submit">Update Task</button>
                    </form>

                </div>
                <div class="card-action right-align">
                    <button @click="triggerTaskForm" class="waves-effect waves-teal btn">
                        <span v-if="!showTaskForm">Add Task</span>
                        <span v-if="showTaskForm"><i class="fa fa-close"></i></span>
                    </button>
                    <a><i @click="deleteList(list)" class="fa fa-recycle"></i></a>
                </div>
            </div>
        </div>

    </div>

</template>


<script>
    import Task from './Tasks'
    // import

    export default {
        name: 'list',
        components: { Task },
        props: ['list', 'tasks'],
        data() {
            return {
                taskName: '',
                taskDesc: '',
                showTaskForm: false,
                showEditForm: false,
                editTaskName: '',
                editTaskDesc: '',
                editTaskId: ''
            }
        },
        methods: {
            deleteList(list) {
                this.$root.$data.store.actions.removeList(list, this.$route.params.id)
            },
            triggerTaskForm() {
                this.showTaskForm = !this.showTaskForm
                this.showEditForm = false
                this.taskName = ''
                this.taskDesc = ''
            },
            addTask: function () {
                this.$root.$data.store.actions.createTask({
                    name: this.taskName,
                    description: this.taskDesc,
                    boardId: this.$route.params.id,
                    listId: this.list._id
                }, this.$route.params.id)
                this.showTaskForm = false
                this.taskName = ''
                this.taskDesc = ''
            },
            dropTask(event) {
                let task = JSON.parse(event.dataTransfer.getData('text/javascript'))
                this.$root.$data.store.actions.droppedTask(task, this.list._id, this.$route.params.id)
            },
            updateTask(){
                this.$root.$data.store.actions.editTask({
                    name: this.editTaskName,
                    description: this.editTaskDesc
                }, this.editTaskId, this.$route.params.id)
                this.showEditForm = false
                this.editTaskId = ''
                this.editTaskName = ''
                this.editTaskDesc = ''
            }
        },

    }

</script>


<styles>


</styles>