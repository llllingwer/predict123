<template>
  <div id="app">
	  
	  <navbar msg2="AAA"></navbar>
	  <div class="container">
	    <div class="left">
			<leftnavbar></leftnavbar>
		</div>
	    <div class="right" style="width: 100%;">
			<router-view :key="$route.fullPath"/>
		</div>
	  </div>
	  
	   
  
  </div>
</template>

<script>
	export default {
	   data(){
			return {
				user:{id:1}
			}
	   },
	   created() {
	   	    
	   },
	   methods:{
		   test(){
			 this.$axios.get("http://localhost/test")
			 .then(response => {
				 this.user = response.data
			 })
		   }
	   },
	   components:{
		   navbar: () => import('./views/Navbar.vue'),
		   leftnavbar: () => import('./views/Left.vue')
	   }
	}
</script>


<style>
	body {
		margin: 0;
		font-family: Arial, sans-serif;
		background-color: #F0F2F5;
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
	
	.container {
	  display: grid;
	  grid-template-columns: 200px 1fr; /* 左边200px，右边占据剩余空间 */
	  gap: 10px; /* 可选：网格项之间的间隔 */
	}
	.left, .right {
	  box-sizing: border-box;
	}
</style>