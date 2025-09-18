<template>
  <div class="update-container">
    <h2>数据更新: {{ $route.query.name }} ({{ $route.query.code }})</h2>
    <p>点击下面的按钮来获取该股票的最新日K线数据。</p>
    <button @click="updateStockData" :disabled="isLoading">
      {{ isLoading ? '正在更新中...' : '更新数据' }}
    </button>
    <p v-if="message" :class="isError ? 'error-message' : 'success-message'">
      {{ message }}
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      message: '',
      isError: false,
    };
  },
  methods: {
    updateStockData() {
      this.isLoading = true;
      this.message = '';
      this.isError = false;
      const stokcode = this.$route.query.code;
      const url = `http://localhost/com.stoksController!update_stock?stokcode=${stokcode}`;

      this.$axios.get(url)
        .then(response => {
          if (response.data && response.data.status === 'success') {
            this.message = response.data.message;
          } else {
            this.message = response.data.message || '更新失败，未知错误。';
            this.isError = true;
          }
        })
        .catch(error => {
          this.message = `更新失败: ${error.message}`;
          this.isError = true;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.update-container {
  padding: 20px;
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
button:hover:not(:disabled) {
  background-color: #0056b3;
}
.success-message {
  color: green;
  margin-top: 15px;
}
.error-message {
  color: red;
  margin-top: 15px;
}
</style>