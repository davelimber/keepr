<template>
    <div>
        <div class="row">
            <h3>{{ board.name }}</h3>

            <button v-if="!showListForm" @click="triggerListForm" class="waves-effect waves-light btn">Add List</button>
            <button @click="triggerInviteForm" class="waves-effect waves-light btn" v-if="!showListForm && !showInviteForm">Add Collaborators</button>

            <div class="container" v-if="showListForm">
                <h4>Add a List</h4>
                <form class="row" @submit.prevent="addList">
                    <div class="col s12 input-field">
                        <input type="text" id="listName" v-model="listName" required>
                        <label for="listName">Title</label>
                    </div>
                    <div class="col s12 input-field">
                        <textarea class="materialize-textarea" id="listDesc" cols="30" rows="10" v-model="listDesc"></textarea>
                        <label for="listDesc">Description</label>
                    </div>
                    <button class="waves-effect waves-teal btn" type="submit">Add List</button>
                    <button @click="triggerListForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            </div>

            <div class="container" v-if="showInviteForm">
                <h4>Add a Collaborator</h4>
                <form class="row" @submit.prevent="inviteUser">
                    <div class="col s12 input-field">
                        <input type="text" id="inviteEmail" v-model="inviteEmail" required>
                        <label for="inviteEmail">Collaborator E-mail</label>
                    </div>
                    <button type="submit" class="waves-effect waves-teal btn">Invite User</button>
                    <button @click="triggerInviteForm" class="waves-effect waves-teal btn-flat"><i class="fa fa-times"></i></button>
                </form>
            </div>

            <div v-for="list in lists">
                <list :list="list" :tasks="tasks"></list>
            </div>
        </div>

    </div>

</template>


<script>
    import List from './List'
    // import

    export default {
        name: 'board',
        components: { List },
        data() {
            return {
                listName: '',
                listDesc: '',
                showListForm: false,
                inviteEmail: '',
                showInviteForm: false
            }
        },
        mounted() {
            this.$root.$data.store.actions.getBoard(this.$route.params.id)
        },
        computed: {
            board() {
                return this.$root.$data.store.state.activeBoard
            },
            lists() {
                return this.$root.$data.store.state.activeLists
            },
            tasks() {
                return this.$root.$data.store.state.activeTasks
            }
        },
        methods: {
            addList: function () {
                this.$root.$data.store.actions.createList({
                    name: this.listName,
                    description: this.listDesc,
                    boardId: this.$route.params.id
                }, this.$route.params.id)
                this.showListForm = false
                this.listName = ''
                this.listDesc = ''
            },
            triggerListForm: function(){
                this.showListForm = !this.showListForm
                this.showInviteForm = false
                this.listName = ''
                this.listDesc = ''
            },
            triggerInviteForm: function(){
                this.showInviteForm = !this.showInviteForm
                this.showListForm = false
                this.inviteEmail = ''
            },
            inviteUser: function(){
                this.$root.$data.store.actions.addCollab({
                    email: this.inviteEmail
                }, this.$route.params.id)
                this.showListForm = false
                this.showInviteForm = false
                this.inviteEmail = ''
            }
        }
    }

</script>


<styles>


</styles>