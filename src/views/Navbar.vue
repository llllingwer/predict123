<template>
	<div id="app">
		     <nav class="navbar">
		         <div class="logo">
		             <img style="border-radius: 15px 30px;" src="https://copyright.bdstatic.com/vcg/creative/a7ea374e248624a2f41406c5df7e019e.eps@h_1280" alt="公司Logo"> <!-- 替换为你的logo图片路径 -->
		         </div>
		         <ul class="links">
					 <li><a>欢迎使用大智慧万能股票预测系统</a></li>
					 <li><a @click="addMenu">添加需要预测的票</a></li>
		             <li v-for="menu in menus"><a @click="loadallstoks(menu.stokcode,menu.stokname)">{{menu.stokname}}</a></li>
		         </ul>
				 <div class="avatar">
					 <img src="https://gips1.baidu.com/it/u=3060891652,1373261891&fm=3074&app=3074&f=JPEG" alt="用户头像"> <!-- 替换为你的头像图片路径 -->
				 </div>
			 </nav>
	</div>
</template>


<script>
export default {
  data(){
	  return {
		  menus:[]
	  }
  },
  methods:{
	  //code 股票代码
	  //name股票名称   
	  loadallstoks(code,name){
		   //添加子菜单
		  this.$store.commit("setMenus",[{menuName:name+'预测',link:'yuce.vue',code:code,name:name},{menuName:name+'数据更新',link:'gengxin.vue',code:code,name:name}])
		  //加载新页面（路由）
		  this.to("showstoks",{stokcode:code},name)
	  },
	  addMenu(){
		  this.to("addMenu",null,"添加菜单")
	  }
  },
  mounted() {
  	 let url = "http://localhost/com.stoksController!getmenus"
	 this.$axios.get(url)
	 .then(response => {
		 this.menus = response.data
	 })
  }
}
</script>
<style>
	.test .test2{
		width: 100px;
		height: 100px;
		background-color: gray;
	}
	.test{
		width: 200px;
		height: 200px;
		background-color: red;
	}
	body {
		margin: 0;
		font-family: Arial, sans-serif;
	}
	.navbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		padding: 10px 20px;
	}
	.navbar .logo img {
		height: 60px; /* 根据需要调整logo大小 */
	}
	.navbar .links {
		display: flex;
		list-style-type: none;
	}
	.navbar .links li {
		margin: 0 15px;
	}
	.navbar .avatar img {
		border-radius: 50%; /* 使头像图片变为圆形 */
		width: 60px; /* 设置与高度相同的宽度以确保图片是正方形 */
		height: 60px; /* 高度设置为自动以保持图片的纵横比，但由于宽度和高度相同，这里其实不需要 */
		object-fit: cover; /* 确保图片在保持纵横比的情况下填充整个容器 */
		
	}
	.navbar .links a {
		color: white;
		text-decoration: none;
		padding: 10px 15px;
		display: block;
		transition: background-color 0.3s;
	}
	.navbar .links a:hover {
		background-color: #575757;
		border-radius: 5px;
	}
</style>