
import axios from 'axios'

// axios 配置

axios.defaults.baseURL = 'http://localhost:8080'; //这是调用数据接口
axios.defaults.withCredentials=true;


export default axios;
