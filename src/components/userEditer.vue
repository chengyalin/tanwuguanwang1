<template>
	<div class="userEditer-page">
		<div class="shadow" @click="close"></div>
		<div class="content">
			<div class="header">
				<input type="file" id="avatar" @change="getImage($event)"/>
				<label for="avatar" class="avatar" :style="{'background-image':'url('+mainData.head_thumb+')'}"></label>
				<span class="name">{{mainData.nick_name}}</span>
				<span class="btn"  @click="logOff">退出登录</span>
			</div>
			<div class="main">
				<ul class="edit-list">
					<li class="item" :class="{'active':nameFlag}">
						<label class="type">昵称</label>
						<input type="text" class="input" v-model="askData.nickName" placeholder="请填写昵称" @focus="nameFlag = true" @blur="nameFlag = false"  v-bind:disabled="!editFlag"/>
						<span class="border-bottom"></span>
					</li>
					<li class="item" :class="{'active':sexFlag}">
						<label class="type">性别</label>
						<input type="text" class="input" v-model="mainData.sex" placeholder="请选择你的性别" disabled="disabled"/>
						<select @change="selectSex" v-model="sexData" class="select" @focus="sexFlag = true" @blur="sexFlag = false" v-bind:disabled="!editFlag" >
							<option value="男">男</option>
							<option value="女">女</option>
						</select>
						<label class="btn"></label>
						<span class="border-bottom"></span>
					</li>
					<li class="item" :class="{'active':birthdayFlag}">
						<span class="border-bottom"></span>
						<label class="type">生日</label>
						<DatePicker type="date" placeholder="请选择你的生日" v-model="askData.birthday" :disabled = "!editFlag" style="width: 243px"></DatePicker>
						<label class="btn"></label>
					</li>
					<li class="item" :class="{'active':placeFlag}" @click="getArea">
						<label class="type">位置</label>
						<input type="text" class="input" v-model="askData.area" placeholder="请选择你的位置" disabled="disabled" />
						<label class="btn"></label>
						<span class="border-bottom"></span>
					</li>
					<li class="item long" :class="{'active':infoFlag}">
						<label class="type">简介</label>
						<input type="text" class="input" v-model="askData.intro" placeholder="请输入简介" @focus="infoFlag = true" @blur="infoFlag = false" v-bind:disabled="!editFlag"/>
						<span class="border-bottom"></span>
					</li>
				</ul>
				<div class="submit-btn" @click="submit">{{editFlag?'保存':'编辑'}}</div>
			</div>
		</div>
		<div class="cropper-wrap" v-if = "cropperFlag">
			<vueCropper
				ref="cropper"
				:img="cropperData.img"
				:autoCrop="cropperData.autoCrop"
				:autoCropWidth="cropperData.autoCropWidth"
				:autoCropHeight="cropperData.autoCropHeight"
				:fixedBox="cropperData.fixedBox"
				:centerBox = "cropperData.centerBox"
				:canMoveBox = "cropperData.canMoveBox"
				:outputType = "cropperData.outputType"
			></vueCropper>
			<div class="btn-wrap">
				<span class="btn btn1" @click="cropperFlag = false">取消</span>
				<span class="btn btn2" @click="cropperSave">确定</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { CONFIG } from  '../assets/js/config';
	import { network } from '../assets/js/network';
	import VueCropper from 'vue-cropper'
	export default {
		name: 'userEditer',
		data() {
			return {
				askData: {
					headThumb: '',
					nickName: '',
					area: '',
					birthday: '',
					sex: '',
					intro: ''
				},
				mainData:{},
				editFlag:false,
				nameFlag: false,
				sexFlag: false,
				birthdayFlag: false,
				placeFlag: false,
				infoFlag: false,
				cropperFlag:false,
				cropperData: {
					img: '',
					autoCrop: true,
					autoCropWidth: 350,
					autoCropHeight: 350,
					fixedBox: true,
					centerBox:true,
					canMoveBox:false,
					outputType:'png'
				},
				uploadToken:'',
				sexData:'男'
			}
		},
		mounted() {
			var that = this;
			that.getData();
		},
		methods:{
			getData(){
				var that = this;
				network(CONFIG.userInfo).then((res) => {
					var details = res.details;
					that.askData.nickName = details.nick_name;
					//that.askData.sex = details.sex == '未填写' || details.sex == '未填'?'':details.sex;
					that.askData.birthday = details.user_birthday ;
					that.askData.area = details.user_address;
					that.askData.intro = details.user_profile;
					that.askData.headThumb = details.head_thumb;
					that.sexData = details.sex == '未填写' || details.sex == '未填'?that.sexData:details.sex;
					that.mainData = details;
					that.mainData.sex = details.sex == '未填写' || details.sex == '未填'?'':details.sex;
				});
			},
			submit(){
				var that = this;
				if(that.editFlag){
					that.askData.birthday = that.formartTime(that.askData.birthday);
					that.askData.sex = that.mainData.sex == '男' || that.mainData.sex == '女'?that.mainData.sex:'未填';
					network(CONFIG.userUpdate,that.askData).then((res) => {
						that.editFlag = !that.editFlag;
						that.mainData.nick_name = that.askData.nickName;
					});
				}else{
					that.editFlag = !that.editFlag
				}
			},
			cropperSave(){
				var that = this;
				that.$refs.cropper.getCropData((data) => {
					if(that.uploadToken){
						that.uploadImage(data.replace("data:image/png;base64,",""));
					}else{
						network(CONFIG.uploadToken).then((res) => {
		        				that.uploadToken = res.details;
							that.uploadImage(data.replace("data:image/png;base64,",""));
						});
					}
				})
			},
			uploadImage(imgData){
	        		var that = this;
			    var xhr = new XMLHttpRequest();
			    xhr.onreadystatechange=function(){
				    if (xhr.readyState==4){
					    	var _data = JSON.parse(xhr.responseText);
					    	that.askData.headThumb = CONFIG.imageHost+_data.key;
					    network(CONFIG.userUpdate,that.askData).then((res) => {
							that.mainData.head_thumb = CONFIG.imageHost+_data.key;
							that.cropperFlag = false;
						});
				    	}
			    };
			    xhr.open("POST", CONFIG.uploadFileUrlBase64, true);
			    xhr.setRequestHeader("Content-Type", "application/octet-stream");
			    xhr.setRequestHeader("Authorization", "UpToken "+that.uploadToken);
			    xhr.send(imgData);
			},
			getImage(event){
				var that = this;
				var file = event.target.files;
				that.cropperData.img = that.getObjectURL(file[0]);
				that.cropperFlag = true;
			},
			getObjectURL(file){
				var url = null ;
				if (window.createObjectURL!=undefined) { // basic
					url = window.createObjectURL(file) ;
				} else if (window.URL!=undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file) ;
				} else if (window.webkitURL!=undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file) ;
				}
				return url ;
			},
			getArea(){
				var that = this;
				if(that.editFlag){
					that.askData.area = returnCitySN['cname'];
				}
			},
			selectSex(){
				var that = this;
				that.mainData.sex = that.sexData;
			},
			close(){
				var that = this;
				this.$emit('close')
			},
			formartTime(value){
				var that = this;
				var date = new Date(value);;
			    var year = date.getFullYear();
			    var month = date.getMonth() + 1;
			    var day = date.getDate();
			    return [year, month, day].map(that.formatNumber).join('-');	
			},
			formatNumber(n) {
			  n = n.toString()
			  return n[1] ? n : '0' + n
			},
            //退出登陆
            logOff(){
                var that = this
                network(CONFIG.logout, {},{codeFlag:true}).then((res) => {
                    localStorage.clear();
                    setTimeout(() => {
                        this.$router.go(0)
                    },500);
                })
            }
		},
		components: {
			VueCropper
		}
	}
</script>

<style>
	.userEditer-page {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}

	.userEditer-page .shadow {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.8);
	}

	.userEditer-page .content {
		position: absolute;
		width: 1300px;
		background: #FFFFFF;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
	}

	.userEditer-page .content .header {
		position: relative;
		background: #F6F6F6;
		padding: 29px 130px;
	}

	.userEditer-page .content .header #avatar{
		position: absolute;
		width: 10px;
		overflow: hidden;
		opacity: 0.01;
	}

	.userEditer-page .content .header .avatar {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		width: 62px;
		height: 62px;
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 100%;
		background-color:rgba(0,0,0,0.1) ;
		overflow: hidden;
		cursor: pointer;
	}

	.userEditer-page .content .header .avatar:after{
		content: '更换';
		display: none;
		width: 100%;
		height: 100%;
		text-align: center;
		color: #FFFFFF;
		line-height: 62px;
		background: rgba(0,0,0,0.5);
	}

	.userEditer-page .content .header .avatar:hover:after{
		display: block;
	}

	.userEditer-page .content .header .name {
		display: inline-block;
		vertical-align: middle;
		font-size: 26px;
		font-weight: bold;
		margin-left: 24px;
		color: #222222;
	}

	.userEditer-page .content .header .btn {
		position: absolute;
		right: 130px;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		cursor: pointer;
	}

	.userEditer-page .content .header .btn:hover {
		color: #000000;
	}

	.userEditer-page .content .main {
		padding: 72px 130px 104px 130px;
	}

	.userEditer-page .content .main .submit-btn {
		width: 170px;
		height: 54px;
		line-height: 54px;
		background: #3ED8C4;
		color: #FFFFFF;
		letter-spacing: 5px;
		text-align: center;
		font-weight: bold;
		cursor: pointer;
	}

	.userEditer-page .edit-list {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		flex-wrap: wrap;
		-webkit-flex-wrap: wrap;
		padding-bottom: 30px;
	}

	.userEditer-page .edit-list .item {
		font-size: 14px;
		position: relative;
		width: 310px;
		margin-bottom: 30px;
		padding-bottom: 13px;
		line-height: 1.3;
	}

	.userEditer-page .edit-list .item.long {
		width: 675px;
	}

	.userEditer-page .edit-list .item .border-bottom {
		position: absolute;
		height: 2px;
		left: 0;
		bottom: 0;
		right: 0;
		background: #EEEEEE;
	}

	.userEditer-page .edit-list .item .border-bottom:after {
		content: '';
		display: block;
		width: 0;
		height: 100%;
		background: #3ED8C4;
		transition: width 0.2s;
		-webkit-transition: width 0.2s;
	}

	.userEditer-page .edit-list .item.active .border-bottom:after {
		width: 100%;
	}

	.userEditer-page .edit-list .item .type {
		display: inline-block;
		vertical-align: middle;
		color: #666666;
		margin-right: 30px;
		transition: color 0.2s;
		-webkit-transition: color 0.2s;
	}

	.userEditer-page .edit-list .item.active .type {
		color: #3ED8C4;
	}

	.userEditer-page .edit-list .item .input,
	.userEditer-page .edit-list .item .input:focus ,
	.userEditer-page .edit-list .item .input:disabled{
		display: inline-block;
		width: 200px;
		background: none;
		border: none;
		outline: none;
		color: #222222;
		padding: 0;
		vertical-align: middle;
	}

	.userEditer-page .edit-list .item.long .input {
		width: 550px;
	}
	.userEditer-page .edit-list .item .btn{
		position: absolute;
		top: 7px;
		right: 0;
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;
		border-top: 8px solid #999999;
		cursor: pointer;
	}
	.userEditer-page .hsy-datepicker .calendar{
		z-index: 10;
	}
	.userEditer-page .hsy-datepicker .selected{
		background: none;
		vertical-align: middle;
	}
	.userEditer-page .hsy-datepicker .selected>.handler{
		display: none;
	}
	.userEditer-page .cropper-wrap{
		position: fixed;
		left: 0;
		bottom: 0;
		right: 0;
		top:0;
	}
	.userEditer-page .cropper-wrap .btn-wrap{
		position: absolute;
		z-index: 999;
		bottom: 50px;
		left: 200px;
		right: 200px;
		overflow: hidden
	}
	.userEditer-page .cropper-wrap .btn-wrap .btn{
		display: block;
		width: 150px;
		height: 50px;
		background: #3ED8C4;
		color: #FFFFFF;
		font-size: 20px;
		text-align: center;
		line-height: 50px;
		cursor: pointer;
	}
	.userEditer-page .cropper-wrap .btn-wrap .btn1{
		float: left;
		background: #EEEEEE;
		color: #222222;
	}
	.userEditer-page .cropper-wrap .btn-wrap .btn2{
		float: right;
	}
	.userEditer-page .select{
		position: absolute;
		right: 0;
		width: 16rem;
		opacity: 0.01;
		z-index: 2;
	}
	.userEditer-page .el-date-editor--date{
		width: 243px;
		z-index: 10;
	}
	.userEditer-page .el-date-editor--date input{
		padding: 0;
		background: none;
		border: none;
		height: 24px;
		line-height: 24px;
		color: #222;
	}
	.userEditer-page .el-date-editor--date .el-input__prefix,
	.userEditer-page .el-date-editor--date .el-input__suffix{
		display: none;
	}
	.userEditer-page .el-input.is-disabled .el-input__inner {
	    background:none;
	    border:none;
	    color: #222;
	    cursor:auto;
	}
	.userEditer-page .ivu-input-icon-normal{
		display: none;
	}
	.userEditer-page .ivu-input-default{
		display: block;
		width: 100%;
		padding: 0;
		background: none;
		border: none;
		height: 24px;
		line-height: 24px;
		color: #222;
		outline: 0;
		box-shadow: none;
	}
</style>
