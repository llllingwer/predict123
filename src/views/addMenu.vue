<template>
	<div class="body">
		<div class="container1"> <h2>添加股票</h2> <form @submit.prevent="addMenu"> <div class="form-group">
		            <label for="stokname">股票名称</label> <input id="stokname" v-model.trim="stokname" type="text" required> </div>
				<div class="form-group">
				    <label for="stokcode">股票代码</label>
				    <input id="stokcode" v-model.trim="stokcode" type="text" required>
				</div>
		        <input type="submit" value="完成添加菜单" /> </form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return  {
				stokcode:"",
				stokname:""
			}
		},
		methods:{
			addMenu(){
				if (!this.stokcode || !this.stokname) {
					alert("股票代码和名称不能为空！");
					return;
				}
				let url = `http://localhost/com.stoksController!addmenu?stokcode=${this.stokcode}&stokname=${this.stokname}`;
				this.$axios.get(url).then(response => {
					 if (response.data && response.data.status === 'success') {
						 alert("添加成功！");
						 // 清空输入框
						 this.stokcode = "";
						 this.stokname = "";
						 // 可选：刷新导航栏菜单
						 // 通常需要一个更好的全局状态管理方案（如Vuex action）来刷新菜单
					 } else {
						 alert("添加失败: " + (response.data.message || "未知错误"));
					 }
				}).catch(error => {
					console.error("Add menu error:", error);
					alert("添加时发生错误，请检查后端服务是否正常。");
				});
			}
		}
	}
</script>

<style>
/* ... 样式保持不变 ... */
.body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container1 {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    text-align: center;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

input[type="submit"] {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

input[type="submit"]:hover {
    background-color: #0056b3;
}

</style>