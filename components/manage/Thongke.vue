<template>
    <div class="container">
      <div class="stats-container">
        <h3>Tổng số tài khoản khách hàng</h3>
        <p>{{ totalCustomers }}</p>
      </div>
      <div class="stats-container">
        <h3>Doanh thu</h3>
        <p>{{ revenue }}</p>
      </div>
      <div class="stats-container">
        <h3>Số lượng sản phẩm</h3>
        <p>{{ totalProducts }}</p>
      </div>
    </div>
    <div class="container">
      <div class="stats-container">
        <h3>Số đơn hàng</h3>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="stats-container">
        <h3>Số sản phẩm tồn kho</h3>
        <p>{{ totalStock }}</p>
      </div>
      <div class="stats-container">
        <h3>Số loại sản phẩm</h3>
        <p>{{ totalCategories }}</p>
      </div>
      <div class="chart-container">
        <h3>Biểu đồ Doanh thu hàng tháng</h3>
        <div class="chart">
          <div class="bar" v-for="(value, index) in monthlyRevenue" :key="index" :style="{ height: value + 'px' }">
            <span>{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="stats-container">
        <h3>Chưa thêm</h3>
        <p>{{ totalCustomers }}</p>
      </div>
      <div class="stats-container">
        <h3>Chưa thêm</h3>
        <p>{{ revenue }}</p>
      </div>
      <div class="stats-container">
        <h3>Chưa thêm</h3>
        <p>{{ totalProducts }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const totalCustomers = ref(100);
  const revenue = ref("$10,000");
  const totalProducts = ref(500);
  const totalOrders = ref(200);
  const totalStock = ref(1000);
  const totalCategories = ref(50);
  
  const monthlyRevenue = ref([65, 59, 80, 81, 56, 55, 80, 81, 56, 55, 40]); // Example data
  </script>
  
  <style scoped>
  .container {
    display: grid;
    width: 110vh;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .stats-container {
    background-color: #f0f0f0;
    padding: 20px;
    width: 50vh;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .stats-container h3 {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .stats-container p {
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
  
  .chart-container {
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .chart-container h3 {
    margin-bottom: 20px;
    font-size: 18px;
    text-align: center;
  }
  
  .chart {
    display: flex;
    align-items: flex-end;
    height: 200px;
  }
  
  .bar {
    flex: 1;
    background-color: #41B883;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
  }
  
  .bar span {
    position: absolute;
    bottom: -20px;
    font-size: 12px;
  }
  </style>
  