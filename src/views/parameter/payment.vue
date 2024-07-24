<template>
    <div>
        <h2>起付标准表</h2>
      <!-- 查询表单 -->
      <el-form :inline="true" :model="searchCriteria" class="demo-form-inline">
        <el-form-item label="医疗类别">
          <el-select v-model="searchCriteria.medicalCategory" placeholder="请选择医疗类别" filterable>
            <el-option v-for="item in medicalCategories" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医疗人员类别">
          <el-select v-model="searchCriteria.medicalPersonnelCategory" placeholder="请选择医疗人员类别" filterable>
            <el-option v-for="item in medicalPersonnelCategories" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级">
          <el-select v-model="searchCriteria.hospitalLevel" placeholder="请选择医院等级" filterable>
            <el-option v-for="item in hospitalLevels" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
  
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="sequence" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="medicalCategory" label="医疗类别" align="center"></el-table-column>
        <el-table-column prop="medicalPersonnelCategory" label="医疗人员类别" align="center"></el-table-column>
        <el-table-column prop="hospitalLevel" label="医院等级" align="center"></el-table-column>
        <el-table-column prop="threshold" label="起付标准" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editThreshold(scope.row)" type="primary" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <!-- 修改起付标准对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
        <el-form :model="formThreshold" label-width="120px" class="threshold-form">
          <el-form-item label="医疗类别">
            <el-input v-model="formThreshold.medicalCategory" disabled></el-input>
          </el-form-item>
          <el-form-item label="医疗人员类别">
            <el-input v-model="formThreshold.medicalPersonnelCategory" disabled></el-input>
          </el-form-item>
          <el-form-item label="医院等级">
            <el-input v-model="formThreshold.hospitalLevel" disabled></el-input>
          </el-form-item>
          <el-form-item label="起付标准">
            <el-input v-model="formThreshold.threshold"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveThreshold">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
<script>
export default {
  data() {
    return {
      searchCriteria: {
        medicalCategory: '',
        medicalPersonnelCategory: '',
        hospitalLevel: ''
      },
      medicalCategories: [
        { value: 0, label: '普通门诊' },
        { value: 1, label: '定点药店购药' },
        { value: 2, label: '急诊抢救' },
        { value: 3, label: '普通住院' },
        { value: 4, label: '生育门诊' },
        { value: 5, label: '节育门诊' },
        { value: 6, label: '生育住院' },
        { value: 7, label: '节育住院' },
        { value: 8, label: '所有类别' }
      ],
      medicalPersonnelCategories: [
        { value: 0, label: '医疗待遇类别-参合农民' },
        { value: 1, label: '医疗待遇类别-城镇居民' },
        { value: 2, label: '医疗待遇类别-城镇职工' },
        { value: 3, label: '医疗普通人员' },
        { value: 4, label: '医疗人员类别_建国前老工人' },
        { value: 5, label: '医疗人员类别_老红军' },
        { value: 6, label: '医疗人员类别_离休' },
        { value: 7, label: '医疗人员类别_所有类别' },
        { value: 8, label: '医疗人员类别_退休' },
        { value: 9, label: '医疗人员类别_在职' }
      ],
      hospitalLevels: [
        { value: 0, label: '一级医院' },
        { value: 1, label: '二级医院' },
        { value: 2, label: '三级医院' },
        { value: 3, label: '社区医院' },
        { value: 4, label: '所有医院' }
      ],
      tableData: [],
      dialogVisible: false,
      dialogTitle: '修改起付标准',
      formThreshold: {
        medicalCategory: '',
        medicalPersonnelCategory: '',
        hospitalLevel: '',
        threshold: ''
      }
    };
  },
  methods: {
    search() {
      // 调用API进行查询
      console.log('查询条件:', this.searchCriteria);
      // 模拟查询结果
      this.tableData = [
        { sequence: 1, medicalCategory: '普通门诊', medicalPersonnelCategory: '医疗待遇类别-参合农民', hospitalLevel: '一级医院', threshold: '100' },
        { sequence: 2, medicalCategory: '定点药店购药', medicalPersonnelCategory: '医疗待遇类别-城镇居民', hospitalLevel: '二级医院', threshold: '200' }
        // 其他数据...
      ];
    },
    clear() {
      this.searchCriteria = {
        medicalCategory: '',
        medicalPersonnelCategory: '',
        hospitalLevel: ''
      };
      this.tableData = [];
    },
    editThreshold(row) {
      this.formThreshold = { ...row };
      this.dialogVisible = true;
    },
    saveThreshold() {
      // 保存修改后的数据
      console.log('保存的数据:', this.formThreshold);
      this.dialogVisible = false;
    }
  }
};
</script>
<style>
.demo-form-inline .el-form-item {
  margin-right: 20px;
}
.threshold-form {
  margin-top: 20px;
}
</style>
  