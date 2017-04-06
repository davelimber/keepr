<template>
    <div class="navbar-fixed">
        <nav class="blue darken-4" role="navigation">
            <div class="nav-wrapper">
                <a id="logo-container" href="#" class="brand-logo center"><img src="../assets/logo.jpg" style="height: 60px; vertical-align: center; margin-top: -7px;"> The Ugly Keepr App! </a>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="fa fa-bars"></i></a>
                <ul v-if="!user._id" class="right hide-on-med-and-down">
                    <li>
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/register">Register</router-link>
                    </li>
                </ul>
                <ul v-if="user._id" class="right hide-on-med-and-down">
                    <li>
                        Welcome, {{ user.name }}!
                    </li>
                    <li>
                        <a @click="logout">Logout</a>
                    </li>
                </ul>
                <ul id="mobile-demo" class="side-nav">
                    <li>
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/register">Register</router-link>
                    </li>
                </ul>
    
            </div>
        </nav>
    </div>

</template>


<script>
    // import
    // import

    export default {
        name: 'nav',
        computed: {
            user() {
                return this.$root.$data.store.state.user
            }
        },
        methods: {
            logout() {
                this.$root.$data.store.actions.logout();
                this.$router.push({ path: '/' })
            }
        }

    }

    $(document).ready(function () {
        $(".button-collapse").sideNav();
    })

</script>


<style>
    a#logo-container:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
</style>