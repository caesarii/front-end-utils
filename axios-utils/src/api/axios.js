import Axios from 'axios'
// import baseURL from '_conf/url'
import { Message, Spin } from 'iview'
import Cookies from 'js-cookie'

const TOKEN_KEY = 'token'

const baseURL = 'http://localhost:4000'

class httpRequest {
    constructor () {
        this.options = {
            method: '',
            url: ''
        }
        // 存储请求队列
        this.queue = {}
    }
    
    // 销毁请求实例
    destroy (url) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }
    
    // 请求拦截
    interceptors (instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            // 发送请求之前
            // 指定 header
            config.headers['Authorization'] = Cookies.get(TOKEN_KEY)
            Spin.show()
           
            return config
        }, error => {
            // 请求错误
            console.log('request error', error)
            return Promise.reject(error)
        })
        
        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            let { data } = res
            const is = this.destroy(url)
            if (!is) {
                setTimeout(() => {
                    Spin.hide()
                }, 500)
            }
            
            // 如果 响应错误是以 {code: 200, data: {status: 404}} 的形式处理的, 应该在这里进行错误处理
            
            return data
        }, (error) => {
            const { data } = error.response
            
            // 响应错误
            if (data.code !== 200) {
                Spin.hide()
                if (data.code === 401) {
                    Cookies.remove(TOKEN_KEY)
                    window.location.href = '/#/login'
                    Message.error('未登录，或登录失效，请登录')
                } else {
                    if (data.message) Message.error(data.message)
                }
                return false
            }
            
            return Promise.reject(error)
        })
    }
    
    // 创建实例
    create () {
        let conf = {
            baseURL: baseURL,
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': location.pathname
            }
        }
        return Axios.create(conf)
    }
    
    // 合并请求实例
    mergeReqest (instances = []) {
        //
    }
    
    // 请求实例
    request (options) {
        var instance = this.create()
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        this.queue[options.url] = instance
        const i = instance(options).catch(function (err) {
            Spin.hide()
            console.error(err)
        })
        return i
    }
}

const axios = new httpRequest()
export default axios
