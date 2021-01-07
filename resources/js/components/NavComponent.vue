<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="http://localhost:8000">
                    Laravel
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <li v-show = "!checkAccessToken()" class="nav-item">
                            <a class="nav-link" href="/register">Register</a>
                        </li>
                        
                        <!-- Authentication Links -->
                        <li v-show = "checkAccessToken()" class="nav-item">
                            <a class="nav-link" style="cursor:pointer;" v-on:click="logout()">Logout</a>
                        </li>
                     </ul>
                </div>
            </div>
        </nav>
</template>

<script>
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
    
export default {
 
 methods:{
     checkAccessToken(){
        return localStorage.getItem("accessToken")!=null;
    },
    logout(){
         NProgress.start();
         axios.post( "/api/auth/logout",
                    [],
                    { 'headers': 
                        { 
                            'Accept': 'application/json',
                            'Authorization' : 'Bearer ' + localStorage.getItem("accessToken"),
                        },
                      
                    }
                ).then(result => {
                    NProgress.done();
                    localStorage.removeItem("accessToken")
                    this.$router.push('/') 
                })
                .catch(function(){
                    NProgress.done();
                    localStorage.removeItem("accessToken")
                    this.$router.push('/') 
                });
        
    },

 }
}
</script>