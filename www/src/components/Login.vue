<template>
    <div class="spacer">
        <h1 class="center-align"> Login </h1>
        <div class="container">
            <div class="row">
                <form @submit.prevent="loginUser" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input type="email" id="email" v-model="email" required>
                            <label for="email">Email</label>
                        </div>
                        <div class="col s6">
                            <div class="col s11 input-field">
                                <input v-if="!showPass" type="password" id="password" v-model="password" required>
                                <input v-if="showPass" type="text" id="password" v-model="password" required>
                                <label for="password">Password</label>
                            </div>
                            <div class="col s1 input-field">
                                <a @click="toggleShowPass" class="btn-floating hoverable red"><i class="fa fa-eye"></i></a>
                            </div>
                        </div>
                        <div class="col s12 center">
                            <button type="submit" class="waves-effect waves-light btn">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>


<script>
    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                showPass: false
            }
        },
        methods: {
            loginUser: function () {
                this.$root.$data.store.actions.login(this.email, this.password);
                this.email = '';
                this.password = '';
                this.$router.push({ path: '/' })
            },
            toggleShowPass: function () {
                this.showPass = !this.showPass
            }


        }
    }

</script>


<styles>


</styles>