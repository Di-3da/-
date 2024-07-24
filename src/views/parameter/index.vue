<template>
    <!-- 主内容区域 -->
    <el-container>
        <!-- 横向导航栏 -->
        <el-header class="header">
            <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                background-color="lightgrey" text-color="black" active-text-color="#4671d5">
                <el-menu-item index="1">封顶线</el-menu-item>
                <el-menu-item index="2">起付标准</el-menu-item>
                <el-menu-item index="3">个人分段自费比例</el-menu-item>
            </el-menu>
        </el-header>

        <!-- 内容 -->
        <el-main>
            <component :is="currentComponent" />
        </el-main>
    </el-container>
    
</template>

<script>
import CeilingLine from './topLine.vue';
import DeductibleStandard from './payment.vue';
import PersonalSelfPayRatio from './personbill.vue';

export default {
  components: {
    CeilingLine,
    DeductibleStandard,
    PersonalSelfPayRatio
  },
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      currentComponent: 'topLine'
    };
  },
  methods: {
    handleSelect(key) {
      this.activeIndex2 = key;
      if (key === '1') {
        this.currentComponent = 'topLine';
      } else if (key === '2') {
        this.currentComponent = 'payment';
      } else if (key === '3') {
        this.currentComponent = 'personbill';
      }
    }
  }
};
</script>

<style>
.main-layout {
  height: 100vh;
}
.side-navbar {
  height: 100%;
}
.header {
  width: 100%;
  padding: 0;
}
</style>