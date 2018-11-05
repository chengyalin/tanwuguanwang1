import Vue from 'vue'
import axios from "axios"
import md5 from 'js-md5'

axios.defaults.timeout = 10000;

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['key'] = md5("TWAPPTW");
axios.defaults.headers.common['version'] = '2.0.0';

export function network(url, params, code) {
	var params = params || {};
	var code = code || {};
	if(localStorage.getItem("twUser") && !params.token) {
		params.token = JSON.parse(localStorage.getItem("twUser")).token || '';
		axios.defaults.headers.common['token'] = params.token;
	};

	//params.token = 'dGFud3VhcHBBUEkxNTM2MzAyMTk4Mzc0eGp2anV0';
	axios.defaults.headers.common['token'] = params.token;
	return axios({
		method: code.method || 'POST',
		url: url,
		data: params,
		params: params
	}).then((res) => {
		return new Promise(function(resolve, reject) {
			console.log(url);
			console.log(params);
			console.log(res.data)
			/*if(res.data.head && res.data.head.code && !code.codeFlag) {
				if(res.data.head.code == 1) {
					//Indicator.close();
					//Vue.toast('登录失效',{duration:1500});
                    //location.href = "#/Login"
				} else if(res.data.head.code == 100 || res.data.head.code == 101 || res.data.head.code == 201) {
					//Indicator.close();
					//Vue.toast(res.data.head.message,{duration:1500});
				} else if(res.data.head.code == 500) {
					//Indicator.close();
					//Vue.toast("服务器炸了",{duration:1500});
				} else {
					resolve(res.data);
				}
			} else*/
			    {
				resolve(res.data);
			};
		})
	})
}
