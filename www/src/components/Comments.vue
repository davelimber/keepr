<template>
    <div class="panel panel-default">
        <div v-for="comment in comments">
            <div class="panel-body">
                {{comment.body}}
            </div>
        </div>
    <div>
        <form @submit.prevent="something">
            <button type="submit">Comment</button>
            <textarea class="form-control" rows="2" v-model="body"></textarea>
        </form>
    </div>
    </div>

</template>


<script>
    // import
    // import

    export default {
        name: 'comments',
        data() {
            return {
                comments: [],
                questionId: '',
                body: ''
            }
        },
        methods: {
            getComments: function () {

            },
            createComment: function () {

            },
            modifyComment: function () {

            },
            recycleComment: function () {

            }
        },

    }

</script>


<styles>


</styles>