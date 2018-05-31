<template>
    <div id="app">
        <img src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
    import HelloWorld from './components/HelloWorld.vue'
    import {getLogin} from './api/api'
    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        methods: {
            getLogin ({ userName, password }) {
                return new Promise((resolve, reject) => {
                    getLogin({
                        userName,
                        password
                    }).then(res => {
                        const data = res.data
                        // 处理数据
                        resolve(data)
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
        },
        mounted () {
            this.getLogin({userName: 'qinghe', password: '1233'})
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
