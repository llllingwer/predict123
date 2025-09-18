<template>
	<div>
		  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
		  <div id="main" style="width: 1300px;height:400px;"></div>
	</div>
</template>

<script>
	
	export default{
		//是一个函数 这个函数的返回值是一个对象 这个对象保存了开发需要的数据
		data(){
			return {
				option: {
							  xAxis: {
								data: []
							  },
							  yAxis: {},
							  series: [
								{
								  type: 'candlestick',
								  data:[]
								}
							  ]
						}
			}
		},
		mounted() {  // 这个函数被自动调用
			  let  stokcode = this.$route.query.stokcode
			 //导入 echars
			  let echarts = require("echarts")
			  let myChart = echarts.init(document.getElementById('main'));
			  //发送一个网络请求（ajax）
			  let url = "http://localhost/com.stoksController!getStocks2?stokcode="+stokcode
			  this.$axios.get(url)
			  .then(response => {  //请求回来的响应数据会自动调用这个函数并把数据传到此函数的参数里
				  
				  let x0_date = []
				  let klines_data =  []
				  
				  let jsonarr = response.data
				  
				  for(let i=0;i<jsonarr.length;i++){
					 let jsonobj =  jsonarr[i]
					 let yyyymmdd = jsonobj.yyyymmdd
					 x0_date.push(yyyymmdd)
					 
					 let openprice = jsonobj.openprice
					 let closeprice = jsonobj.closeprice
					 let lowprice = jsonobj.lowprice
					 let hiprice = jsonobj.hiprice
                     let kline_data = [openprice,closeprice,lowprice,hiprice]
					 klines_data.push(kline_data)
				  }
				  
				  this.option.xAxis.data = x0_date //设置日期
				  this.option.series[0].data = klines_data
				  //用于描述 绘图的 json
				  // 指定图表的配置项和数据
				  myChart.setOption(this.option);
			  })
			  
			  
			  
			  
			  
			  
			  
		}
	}
</script>

<style>
</style>
