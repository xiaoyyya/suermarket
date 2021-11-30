import axios from 'axios'
 export function request(config){
 // 1.创建axios的实例
   const instance=axios.create({
     baseURL:'http://152.136.185.210:7878/api/hy66',
     timeout:50000
   })
 //  2.axios的拦截器
 //  2.1请求拦截的作用 / 失败或者成功
   instance.interceptors.request.use(config =>{
     return config
   },err =>{
     console.log(err)
   })
 //  2.2响应拦截 、失败或者成功
   instance.interceptors.response.use(res =>{
     //拦截以后还要还回去
     return res.data
   } ,err =>{
     console.log(err);
   })

 //  3.发送真正的网络请求
   return instance(config)
 }
