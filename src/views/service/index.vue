<template>
    <div class="app-container">
      <!--搜索表单-->
      <el-form :inline="true" :model="searchClass" class="demo-form-inline">
        <el-form-item label="服务设施项目名称">
          <el-input v-model="searchClass.name" placeholder="请输入设施名称或者序号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
  
      <!--按钮-->
      <el-row>
        <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增服务设施</el-button>
      </el-row>
  
    <!--新增数据对话框表单-->
    <el-dialog title="新增医疗服务设施" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="newFacility" :rules="rules" ref="newFacilityForm" label-width="150px" size="mini">
        <el-form-item label="医疗服务设施编码" prop="facilityCode">
          <el-input v-model="newFacility.facilityCode"></el-input>
        </el-form-item>
        <el-form-item label="服务设施名称" prop="facilityName">
          <el-input v-model="newFacility.facilityName"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
            <el-select
              v-model="value"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker v-model="newFacility.startDate" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endDate">
          <el-date-picker v-model="newFacility.endDate" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="validFlag">
          <el-select v-model="newFacility.validFlag" placeholder="请选择">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm('newFacilityForm')">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
      
      <!--表格显示诊疗项目信息-->
      <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="facilityCode" width="150" label="医疗服务设施编码" align="center"></el-table-column>
      <el-table-column prop="facilityName" width="200" label="服务设施名称" align="center"></el-table-column>
      <el-table-column prop="chargeCategory" width="150" label="收费类别" align="center"></el-table-column>
      <el-table-column prop="startDate" width="150" label="开始日期" align="center"></el-table-column>
      <el-table-column prop="endDate" width="150" label="终止日期" align="center"></el-table-column>
      <el-table-column prop="validFlag" width="150" label="有效标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.validFlag ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      <!--编辑数据对话框表单-->
      <el-dialog :visible.sync="dialogVisible" title="编辑医疗服务设施">
      <el-form :model="editForm">
        <el-form-item label="医疗服务设施编码">
          <el-input v-model="editForm.facilityCode"></el-input>
        </el-form-item>
        <el-form-item label="服务设施名称">
          <el-input v-model="editForm.facilityName"></el-input>
        </el-form-item>
        <el-form-item label="收费类别">
          <el-input v-model="editForm.chargeCategory"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="editForm.startDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期">
          <el-date-picker v-model="editForm.endDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志">
          <el-switch v-model="editForm.validFlag"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </div>
      </el-dialog>
      <!--分页工具条-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :background="background"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </template>
  
  <script>
  import { page, add, update, selectById, deleteById } from "@/api/service.js";
  import { findAll } from "@/api/service.js";
  import { getToken } from '@/utils/auth';
  
  export default {
    data() {
      return {
        background: true,
        pageSize: 5,
        totalCount: 100,
        currentPage: 1,
        addDialogVisible: false,
        editDialogVisible: false,
        searchClass: { name: "" },
        newClass: {},
        editClass: {},
        masterList: [],
        searchTime: ["", ""],
        tableData: [],
        token: {token: getToken()},
        //新建表单
        newFacility: {
        facilityCode: '',
        facilityName: '',
        chargeType: '',
        startDate: '',
        endDate: '',
        validFlag: ''
        },
        rules: {
        facilityCode: [{ required: true, message: '请输入医疗服务设施编码', trigger: 'blur' }],
        facilityName: [{ required: true, message: '请输入服务设施名称', trigger: 'blur' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择终止日期', trigger: 'change' }],
        validFlag: [{ required: true, message: '请选择有效标志', trigger: 'change' }]
        },
        //远程搜索
        options: [],
          value: [],
          list: [],
          loading: false,
          states: ["西药","中成药","中草药","床位费","化验费","诊查费","检查费","护理费","特检费","输氧费","治疗费","输血费",
          "特治费","医疗服务费","手术费","麻药费","产前检查费","材料费","新生儿费","内置材料","其他费","监护床位费","非处方药",
          "处方药","甲类","乙类","丙类","化验费","诊查费","检查费","护理费","特检费","输氧费","治疗费","输血费","特治费",
          "医疗服务费","手术费","麻药费","产前检查费","材料费","新生儿费","内置材料","其他费","监护床位费"],
          tableData: [
        // 示例数据
        {
          id: 1,
          facilityCode: '001',
          facilityName: '医疗服务设施A',
          chargeCategory: '类别1',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          validFlag: true,
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        facilityCode: '',
        facilityName: '',
        chargeCategory: '',
        startDate: '',
        endDate: '',
        validFlag: false,
      },
      }
    },
  
    mounted() {
      this.page();
      findAll().then((result) => {
        this.masterList = result.data.data.map(item => ({ id: item.id, name: item.name }));
      });
      //远程搜索
      this.list = this.states.map(item => {
          return { value: `value:${item}`, label: `label:${item}` };
        });
    },
  
    methods: {
      
      page() {
        page(this.searchClass.name, this.searchTime[0], this.searchTime[1], this.currentPage, this.pageSize).then((res) => {
          this.totalCount = res.data.data.total;
          this.tableData = res.data.data.rows;
        });
      },
      validateForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message({
              message: '保存成功',
              type: 'success'
            });
            this.addDialogVisible = false;
          } else {
            this.$message({
              message: '请完整填写表单',
              type: 'warning'
            });
            return false;
          }
        });
      },
      addNewClass() {
        add(this.newClass).then((response) => {
          if (response.data.code === 1) {
            this.$message({ type: 'success', message: '新增药品成功!' });
            this.addDialogVisible = false;
            this.newClass = {}; // 清空表单
            this.page(); // 重新加载数据
          } else {
            this.$message.error(response.data.msg);
          }
        });
      },
      openEditDialog(row) {
        this.editForm = { ...row };
        this.dialogVisible = true;
      },
      saveEdit() {
        const index = this.tableData.findIndex(item => item.id === this.editForm.id);
        if (index !== -1) {
          this.$set(this.tableData, index, { ...this.editForm });
        }
        this.dialogVisible = false;
      },
      updateClass() {
        update(this.editClass).then((response) => {
          if (response.data.code === 1) {
            this.$message({ type: 'success', message: '药品更新成功!' });
            this.editDialogVisible = false;
            this.page(); // 重新加载数据
          } else {
            this.$message.error(response.data.msg);
          }
        });
      },
      update(id) {
  
        this.editDialogVisible = true;
  
        selectById(id).then((result) => {
          if (result.data.code === 1) {
            this.editClass = result.data.data;
            this.editClass;
          } 
        });
      },
      deleteById(id) {
        this.$confirm('此操作将永久删除该药品, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteById(id).then((response) => {
            if (response.data.code === 1) {
              this.$message({ type: 'success', message: '删除成功!' });
              this.page(); // 重新加载数据
            } else {
              this.$message.error(response.data.msg);
            }
          });
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      showEditDialog(classData) {
        this.editClass = { ...classData };
        this.editDialogVisible = true;
      },
      clear() {
        this.searchClass = { name: "" };
        this.searchTime = ["", ""];
        this.page();
      },
      onSubmit() {
        this.currentPage = 1;
        this.page();
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.page();
      },
      handleCurrentChange(newPage) {
        this.currentPage = newPage;
        this.page();
      },
      getMasterName(empId) {
        const master = this.masterList.find(master => master.id === empId);
        return master ? master.name : '未知';
      },
      //远程搜索
      remoteMethod(query) {
          if (query !== '') {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
              this.options = this.list.filter(item => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            }, 200);
          } else {
            this.options = [];
          }
        },
        update(id) {
        // 编辑操作
      },
      deleteById(id) {
        // 删除操作
      },
  
     
      
    }
  };
  </script>
  
  
  
  
  
  <style>
  .app-container {
    margin: 20px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  </style>
  
  
  