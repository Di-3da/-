<template>
    <div>
      <h2>封顶线</h2>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="medicalPersonnelType" label="医疗人员类别" align="center">
          <template slot-scope="scope">
            {{ getMedicalPersonnelTypeName(scope.row.medicalPersonnelType) }}
          </template>
        </el-table-column>
        <el-table-column prop="ceilingLine" label="封顶线" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="editItem(scope.row)" type="primary" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog title="修改封顶线" :visible.sync="dialogVisible" width="30%">
        <el-form :model="currentItem" label-width="80px">
          <el-form-item label="类别">
            <el-input v-model="currentItem.medicalPersonnelTypeName" disabled></el-input>
          </el-form-item>
          <el-form-item label="封顶线">
            <el-input v-model="currentItem.ceilingLine"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveItem">保存</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData: [
          { index: 1, medicalPersonnelType: 0, ceilingLine: 1000 },
          { index: 2, medicalPersonnelType: 1, ceilingLine: 2000 },
          { index: 3, medicalPersonnelType: 2, ceilingLine: 3000 },
          { index: 4, medicalPersonnelType: 3, ceilingLine: 4000 },
          { index: 5, medicalPersonnelType: 4, ceilingLine: 5000 },
          { index: 6, medicalPersonnelType: 5, ceilingLine: 6000 },
          { index: 7, medicalPersonnelType: 6, ceilingLine: 7000 },
          { index: 8, medicalPersonnelType: 7, ceilingLine: 8000 },
          { index: 9, medicalPersonnelType: 8, ceilingLine: 9000 },
          { index: 10, medicalPersonnelType: 9, ceilingLine: 10000 },
        ],
        medicalPersonnelTypes: [
          { value: 0, label: "医疗待遇类别-参合农民" },
          { value: 1, label: "医疗待遇类别-城镇居民" },
          { value: 2, label: "医疗待遇类别-城镇职工" },
          { value: 3, label: "医疗普通人员" },
          { value: 4, label: "医疗人员类别_建国前老工人" },
          { value: 5, label: "医疗人员类别_老红军" },
          { value: 6, label: "医疗人员类别_离休" },
          { value: 7, label: "医疗人员类别_所有类别" },
          { value: 8, label: "医疗人员类别_退休" },
          { value: 9, label: "医疗人员类别_在职" },
        ],
        currentItem: {
          medicalPersonnelType: '',
          medicalPersonnelTypeName: '',
          ceilingLine: ''
        }
      };
    },
    methods: {
      getMedicalPersonnelTypeName(type) {
        const item = this.medicalPersonnelTypes.find(t => t.value === type);
        return item ? item.label : '';
      },
      editItem(row) {
        const medicalPersonnelTypeName = this.getMedicalPersonnelTypeName(row.medicalPersonnelType);
        this.currentItem = { ...row, medicalPersonnelTypeName };
        this.dialogVisible = true;
      },
      saveItem() {
        const index = this.tableData.findIndex(item => item.index === this.currentItem.index);
        if (index !== -1) {
          this.$set(this.tableData, index, { 
            ...this.currentItem, 
            medicalPersonnelType: this.medicalPersonnelTypes.find(t => t.label === this.currentItem.medicalPersonnelTypeName).value
          });
        }
        this.dialogVisible = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  </style>
  