<template>
  <div>
    <div class="card">
      <div class="card-content">
        <h2 class="card-title">预测股票: {{$route.query.name}}</h2>
        <div v-if="loading" class="loading-text">正在玩命预测中...</div>
        <div v-if="error" class="error-text">{{ error }}</div>
        <p class="card-text" v-if="!loading && !error">
          <table>
            <thead>
              <tr>
                <th>股票名称</th>
                <th>股票代码</th>
                <th>预测开盘价</th>
                <th>预测收盘价</th>
                <th>预测最高价</th>
                <th>预测最低价</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{$route.query.name}}</td>
                <td>{{$route.query.code}}</td>
                <td>{{openprice}}</td>
                <td>{{closeprice}}</td>
                <td>{{hiprice}}</td>
                <td>{{lowprice}}</td>
              </tr>
            </tbody>
          </table>
        </p>
        <a href="#" class="card-link">了解更多</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openprice: 0,
      closeprice: 0,
      lowprice: 0,
      hiprice: 0,
      loading: true, // 新增加载状态
      error: null,   // 新增错误信息
    };
  },
  //只要页面进来就会自动调用这个 mounted 函数
  mounted() {
    this.fetchPrediction();
  },
  methods: {
    fetchPrediction() {
      this.loading = true;
      this.error = null;
      let stokcode = this.$route.query.code;
      let url = "http://localhost/com.stoksController!yuce?stokcode=" + stokcode;
      this.$axios.get(url)
        .then(response => {
          if (response.data && !response.data.error) {
            let prices = response.data;
            this.openprice = prices[0];
            this.closeprice = prices[1];
            this.lowprice = prices[2];
            this.hiprice = prices[3];
          } else {
            this.error = response.data.error || "无法获取预测数据。";
          }
        })
        .catch(err => {
          console.error("Prediction API error:", err);
          this.error = "请求预测数据时出错，请稍后再试。";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style>
/* ... 样式保持不变 ... */
.loading-text, .error-text {
  margin: 20px;
  font-size: 1.2em;
}
.error-text {
  color: red;
}
.card {
  margin-top: 80px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  text-align: center;
  padding: 20px;
  transition: transform 0.2s;
}

.card-title {
  margin: 0;
  font-size: 1.5em;
  color: #333;
}

.card-text {
  color: #666;
  font-size: 1em;
  margin-top: 10px;
}

.card-link {
  text-decoration: none;
  color: #007bff;
  font-weight: bold;
  transition: color 0.2s;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
}
th,
td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}
th {
  background-color: #fff;
}
tr:hover {
  background-color: #f5f5f5;
}
</style>