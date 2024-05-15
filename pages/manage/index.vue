<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth.js';
import Thongke from '~/components/manage/Thongke.vue';
import QuanlyProduct from '~/components/manage/QuanlyProduct.vue';
import QuanlyOrder from '~/components/manage/QuanlyOrder.vue';
import QuanlyAccount from '~/components/manage/QuanlyAccount.vue';


definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const active = ref('1');
const auth = useAuthStore();

const logOut = () => {
  auth.deleteAuth();
  window.location.reload();
};

const Home = () => {
  window.location.href = "/";
};

const handleChange = (key) => {
  console.log(key);
  active.value = key;
};
</script>

<template>
  <div class="container">
    <el-menu
      active-text-color="#9A5C00"
      background-color="#E4E7E6"
      default-active=""
      text-color="#000"
      class="menu"
      @select="handleChange"
    >
    <el-menu-item class="mb-20" index="0">
                    <img class="h-32 mt-20 ml-10"
                         src="https://i.pinimg.com/564x/3c/07/40/3c0740017fa1c2ca4b529179ef1ffb08.jpg"
                         alt="">
    </el-menu-item> 

      <el-menu-item @click="Home">
        <i class="el-icon-s-home"></i>
        <span>Home</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-goods"></i>
        <span>Thống Kế</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-goods"></i>
        <span>Quản lý Product</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-s-order"></i>
        <span>Quản lý Order</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-user"></i>
        <span>Quản lý Account</span>
      </el-menu-item>
      <el-menu-item @click="logOut">
        <i class="el-icon-switch-button"></i>
        <span>Log Out</span>
      </el-menu-item>
    </el-menu>

    <div class="content" >
      <Thongke v-if="active === '2'" class="content-section" />
      <QuanlyProduct v-if="active === '3'" class="content-section" />
      <QuanlyOrder v-if="active === '4'" class="content-section" />
      <QuanlyAccount v-if="active === '5'" class="content-section" />
    </div>
  </div>
</template>


<style scoped>

.container {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-items: center;
}

.menu {
  width: 250px;
  height: 100%;
  border-right: 1px solid #dcdcdc;
}

.content {
  padding: 100px;
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-items: center;
}

.content-section {

  height: 100%;
  background: #E4E7E6;
  border-radius: 8px;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
}
</style>



<!-- <script setup>
import TableProduct from "~/components/manage/TableProduct.vue";

definePageMeta({
    layout: "admin",
    middleware: "auth"
})

import TableOrder from "~/components/manage/TableOrder.vue";
import TableUser from "~/components/manage/TableUser.vue";
import {useAuthStore} from "~/stores/auth.js";

const active = ref('1')
const auth = useAuthStore()

const logOut = () => {
    auth.deleteAuth()
    window.location.reload()
}

const handleChange = (key) => {
    console.log(key)
    active.value = key
}
</script>

<template>
    <div class="w-full h-screen">
        <div class="w-full h-full flex">
            <el-menu
                active-text-color="#ffd04b"
                background-color="#000"
                default-active="1"
                text-color="#fff"
                class="w-50 h-full"
                @select="handleChange"
            >
                <el-menu-item class="mb-6" index="0">
                    <img class="h-32 mt-8 ml-6"
                         src="https://1.bp.blogspot.com/-R8gnX_mf-hI/XZwpsZoVyNI/AAAAAAAADOc/zfTGRKC1VyUVP2hxELrNk04TJTrHDg0mQCLcBGAsYHQ/s0/72487982_2513824035518413_4387733843654737920_n.png"
                         alt="">
                </el-menu-item> -->
                <!-- <el-menu-item index="0">
                    <span>Chung</span>
                </el-menu-item>
                <el-menu-item index="1">
                    <span>Quản lý sản phẩm</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <span>Quản lý đơn hàng</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <span>Quản lý tài khoản</span>
                </el-menu-item>
                <el-menu-item>
                    <span class="cursor-pointer hover:underline hover:text-red-700 mt-20 ml-2 text-white" @click="logOut">
                        Đăng xuất
                    </span>
                </el-menu-item>
            </el-menu>

            <TableProduct v-if="active === '1'" class="flex-1 "/>
            <TableOrder v-if="active === '2'" class="flex-1 overflow-auto"/>
            <TableUser v-if="active === '3'" class="flex-1 overflow-auto"/>
        </div>
    </div>
</template>

<style lang="scss">

</style>  -->

