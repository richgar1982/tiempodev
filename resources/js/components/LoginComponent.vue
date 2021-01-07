<template>
    <div>
        <nav-component></nav-component>
        <div class="row justify-content-center" style="margin-top: 2em;">

            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                            <form>
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email"  v-model="username" required/>                                
                                </div>
                            </div>

                            <div class="form-group row" v-show="!validEmail(username) && username.length>0">
                                <div class="col-md-6 offset-md-3" style="text-align:center;color:red">
                                    <label>The Email is not valid</label>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required  v-model="password"/>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button type="submit" :disabled="!validEmail(username) || password.length<6" v-on:click="login($event)" class="btn btn-primary">
                                        Submit
                                    </button>

                                </div>
                            </div>


                            <div v-show="error==true" class="form-group row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <span class="error"> Wrong email or password</span>
                                </div>
                            </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
   .error{
       color: red;
   }
</style>

<script>

import NavComponent from './NavComponent.vue'

    export default {
        mounted() {
            if(localStorage.getItem("accessToken")!=null){
                this.$router.push('/upload') 
            }
        },
        components: {
            NavComponent
        },
        data() {
            return {
                username: "",
                password: "",
                error:false
            }
        },
        methods: {
            validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
            },
            login($event) {
                event.preventDefault();
                console.log("username",this.username);
                console.log("password",this.password);
                const data = { "email": this.username, "password": this.password}
                this.$http.post("/api/auth/login", data)
                .then(response => {
                    this.error=null;
                    localStorage.setItem("accessToken",response.data.access_token)
                    this.$router.push('upload') 

                })
                .catch(err => {
                    console.log("There as an error ",err); 
                    this.error=true;
                });
            },

        }
    }
</script>
