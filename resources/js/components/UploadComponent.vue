<template>
    <div>
        <nav-component/>
        <div class="row ">
            <div class="col-lg-12 justify-content-center">
                <div >
                    <span class="navbar-brand indent">Lastest image:</span> <br/>
                    <div class="gray-box">
                        <img class="imagecenter" v-show="lastUrl" height="300" v-bind:src="lastUrl" alt="Lastest uploades image" />
                    </div>
                    
                </div>
                <span v-show="!lastUrl && error!=''">There is not an uploades image</span>
                <span v-show="error!=''">There was an error retrieving the images: {{error}}</span>
            </div>
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        
                            <div class="row">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">Upload</span>
                                    </div>
                                    <div class="custom-file">
                                        <input type="file" class="custom-file-input" id="file" ref="file" v-on:change="handleFileUpload()">
                                        <label class="custom-file-label" for="inputGroupFile01">
                                            <span v-show="file==''">Choose file</span>
                                            <span v-show="file!=''">{{file.name}}</span>
                                        </label>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" :disabled="file==''" v-on:click="submitFile()">Submit</button>
                                    </div>
                                </div>
                                <div class="input-group mb-3">
                                    <span v-show="uploadError!=''">There was an error uploading the images:  {{uploadError}}</span>
                                </div>

                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<style >
.gray-box{
    height:300px;
    background-color:#acacac;
}

.imagecenter{
    margin-left: 30%;
    margin-right: 30%;
    width: 40%;
}

.indent{
    margin-left: 1em;
}

.indenttop{
    margin-top: 1em;
}
</style>

<script>

    import NProgress from 'nprogress';
    import 'nprogress/nprogress.css';
    import NavComponent from './NavComponent.vue'


    export default {
        mounted() {
            this.checkAccessToken();
            this.fetchLastestImage();
        },
        data() {
            return {
                lastUrl: "",
                accessToken: "",
                error:"",
                file: "",
                uploadPercentage: 0,
                uploadError: ""
            }
        },
        components: {
            NavComponent
        },
        methods: {
            checkAccessToken(){

                this.accessToken = localStorage.getItem("accessToken")
                if(this.accessToken==null){
                    this.$router.push('/') 
                }
            },
            fetchLastestImage(){
                this.checkAccessToken();
                this.$http.get("/api/upload/png", { 'headers': 
                    { 
                        'Accept': 'application/json',
                        'Authorization' : 'Bearer ' + this.accessToken
                    } 
                })
                .then(result => {
                    this.lastUrl = result.data.data.url;

                })
                .catch(err => {
                    console.log("There as an error ",err); 
                    this.error="";
                });
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
                console.log("file",file);
            },
            submitFile(){
                this.checkAccessToken();
                let formData = new FormData();

                formData.append('image', this.file);
                NProgress.start();
                axios.post( "/api/upload/png",
                    formData,
                    { 'headers': 
                        { 
                            'Accept': 'application/json',
                            'Authorization' : 'Bearer ' + this.accessToken,
                            'Content-Type': 'multipart/form-data'
                        },
                      
                    }
                ).then(result => {
                    console.log("data",result.data.data.url);
                    this.lastUrl = result.data.data.url;
                    this.file=""
                    NProgress.done();
                })
                .catch(err => {
                    console.log('FAILURE!!');
                    this.uploadError=err;
                    NProgress.done();
                });

            },

        },
        
    }
</script>
