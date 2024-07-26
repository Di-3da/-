<template>
    <div class="app-container">
      <!--搜索表单-->
      <el-form :inline="true" :model="searchClass" class="demo-form-inline">
        <el-form-item label="医疗机构名称">
          <el-input v-model="searchClass.name" placeholder="请输入医疗机构名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="info" @click="clear">清空</el-button>
        </el-form-item>
      </el-form>
  
      <!--按钮-->
      <el-row>
        <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增医疗机构</el-button>
      </el-row>
  
    <!--新增数据对话框表单-->
    <el-dialog title="新增医疗服务设施" :visible.sync="addDialogVisible" width="30%">
  <el-form ref="newFacilityForm" :model="newFacility" :rules="rules" label-width="150px" size="mini">
    <el-form-item label="医疗机构编码" prop="institutionId">
      <el-input v-model="newFacility.institutionId"></el-input>
    </el-form-item>
    <el-form-item label="服务机构名称" prop="name">
      <el-input v-model="newFacility.name"></el-input>
    </el-form-item>
    <el-form-item label="医院等级" prop="hosLevel">
      <el-select v-model="newFacility.hosLevel" placeholder="请选择">
        <el-option label="一级医院" value="0"></el-option>
        <el-option label="二级医院" value="1"></el-option>
        <el-option label="三级医院" value="2"></el-option>
        <el-option label="社区医院" value="3"></el-option>
        <el-option label="所有医院" value="4"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="医疗机构类别" prop="type">
      <el-select v-model="newFacility.type" placeholder="请选择">
        <el-option label="综合性医院" value="0"></el-option>
        <el-option label="药店" value="1"></el-option>
        <el-option label="门诊部" value="2"></el-option>
        <el-option label="诊所" value="3"></el-option>
        <el-option label="专科病防治院" value="4"></el-option>
        <el-option label="社区卫生服务机构" value="5"></el-option>
        <el-option label="卫生院" value="6"></el-option>
        <el-option label="精神病院" value="7"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="邮政编码" prop="postcode">
      <el-input v-model="newFacility.postcode"></el-input>
    </el-form-item>
    <el-form-item label="法定代表人姓名" prop="repName">
      <el-input v-model="newFacility.repName"></el-input>
    </el-form-item>
    <el-form-item label="法人代表移动电话" prop="repPhone">
      <el-input v-model="newFacility.repPhone"></el-input>
    </el-form-item>
    <el-form-item label="联系人姓名" prop="cntName">
      <el-input v-model="newFacility.cntName"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" prop="cntPhone">
      <el-input v-model="newFacility.cntPhone"></el-input>
    </el-form-item>
    <el-form-item label="联系人移动电话" prop="cntcellPhone">
      <el-input v-model="newFacility.cntcellPhone"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="newFacility.address"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="note">
      <el-input v-model="newFacility.note"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveNewFacility">保存</el-button>
      <el-button @click="addDialogVisible = false">取消</el-button>
    </el-form-item>
  </el-form>
</el-dialog>

      <!--表格显示诊疗项目信息-->
      <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="institutionId" width="150" label="医疗机构编码" align="center"></el-table-column>
      <el-table-column prop="name" width="200" label="服务机构名称" align="center"></el-table-column>
      <el-table-column prop="hosLevel" width="150" label="医院等级" align="center"></el-table-column>
      <el-table-column prop="type" width="150" label="医疗机构类别" align="center"></el-table-column>
      <el-table-column prop="postcode" width="150" label="邮政编码" align="center"></el-table-column>
      <el-table-column prop="repName" width="200" label="法定代表人姓名" align="center"></el-table-column>
      <el-table-column prop="repPhone" width="200" label="法人代表移动电话" align="center"></el-table-column>
      <el-table-column prop="cntName" width="200" label="联系人姓名" align="center"></el-table-column>
      <el-table-column prop="cntPhone" width="200" label="联系电话" align="center"></el-table-column>
      <el-table-column prop="cntcellPhone" width="200" label="联系人移动电话" align="center"></el-table-column>
      <el-table-column prop="address" width="300" label="地址" align="center"></el-table-column>
      <el-table-column prop="note" width="300" label="备注" align="center"></el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
      <!--编辑数据对话框表单-->
      <el-dialog title="编辑医疗服务设施" :visible.sync="editDialogVisible" width="30%">
      <el-form ref="editFacilityForm" :model="editForm" :rules="rules" label-width="150px" size="mini">
        <el-form-item label="医疗机构编码" prop="institutionId">
          <el-input v-model="editForm.institutionId"></el-input>
        </el-form-item>
        <el-form-item label="服务机构名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="医院等级" prop="hosLevel">
          <el-select v-model="editForm.hosLevel" placeholder="请选择">
            <el-option label="一级医院" value="0"></el-option>
            <el-option label="二级医院" value="1"></el-option>
            <el-option label="三级医院" value="2"></el-option>
            <el-option label="社区医院" value="3"></el-option>
            <el-option label="所有医院" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医疗机构类别" prop="type">
          <el-select v-model="editForm.type" placeholder="请选择">
            <el-option label="综合性医院" value="0"></el-option>
            <el-option label="药店" value="1"></el-option>
            <el-option label="门诊部" value="2"></el-option>
            <el-option label="诊所" value="3"></el-option>
            <el-option label="专科病防治院" value="4"></el-option>
            <el-option label="社区卫生服务机构" value="5"></el-option>
            <el-option label="卫生院" value="6"></el-option>
            <el-option label="精神病院" value="7"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postcode">
          <el-input v-model="editForm.postcode"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人姓名" prop="repName">
          <el-input v-model="editForm.repName"></el-input>
        </el-form-item>
        <el-form-item label="法人代表移动电话" prop="repPhone">
          <el-input v-model="editForm.repPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="cntName">
          <el-input v-model="editForm.cntName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="cntPhone">
          <el-input v-model="editForm.cntPhone"></el-input>
        </el-form-item>
        <el-form-item label="联系人移动电话" prop="cntcellPhone">
          <el-input v-model="editForm.cntcellPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editForm.note"></el-input>
        </el-form-item>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditFacility">保存</el-button>
        </div>
      </el-form>
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
  import { page, add, update, selectById, deleteById } from "@/api/institution.js";
  import { findAll } from "@/api/institution.js";
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
        institutionId: '',
        name: '',
        hosLevel: '',
        type: '',
        postcode: '',
        repName: '',
        repPhone: '',
        cntName: '',
        cntPhone: '',
        cntcellPhone: '',
        address: '',
        note: '',
      },
      rules: {
        // 这里可以添加表单验证规则
      },
      options: [], // 收费类别选项
      loading: false, // 远程加载状态
      tableData: [
        // 示例数据
        {
          id: 1,
          institutionId: '999999',
          name: '服务机构A',
          hosLevel: '三级医院',
          type: '综合性医院',
          postcode: '123456',
          repName: '代表人A',
          repPhone: '12345678901',
          cntName: '联系人A',
          cntPhone: '98765432101',
          cntcellPhone: '87654321012',
          address: '地址A',
          note: '备注A',
        },
        // 更多数据
      ],
      editForm: {
        id: '',
        institutionId: '',
        name: '',
        hosLevel: '',
        type: '',
        postcode: '',
        repName: '',
        repPhone: '',
        cntName: '',
        cntPhone: '',
        cntcellPhone: '',
        address: '',
        note: '',
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
        page(this.searchClass.name,  this.currentPage, this.pageSize).then((res) => {
          this.totalCount = res.data.data.total;
          this.tableData = res.data.data.rows;
        });
      },
      validateForm(formName) {
      this.$refs[formName].validate((valid) => {
        // 处理保存逻辑
        this.addNewClass();
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
      saveNewFacility() {
      this.$refs.newFacilityForm.validate((valid) => {
        if (valid) {
          this.tableData.push({ ...this.newFacility, id: this.tableData.length + 1 });
          this.addDialogVisible = false;
          this.$refs.newFacilityForm.resetFields();
        }
      });
    },
      openEditDialog(row) {
        this.editForm = { ...row };
        this.dialogVisible = true;
      },
      saveEditFacility() {
      this.$refs.editFacilityForm.validate((valid) => {
        if (valid) {
          const index = this.tableData.findIndex(item => item.id === this.editForm.id);
          if (index !== -1) {
            this.$set(this.tableData, index, { ...this.editForm });
          }
          this.editDialogVisible = false;
        }
      });
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
        // 模拟远程搜索
        setTimeout(() => {
          this.loading = false;
          this.options = [
            { value: '西药', label: '西药' },
            { value: '中成药', label: '中成药' },
            { value: '中草药', label: '中草药' },
            { value: '床位费', label: '床位费' },
            { value: '化验费', label: '化验费' },
            { value: '诊查费', label: '诊查费' },
            { value: '检查费', label: '检查费' },
            { value: '护理费', label: '护理费' },
            { value: '特检费', label: '特检费' },
            { value: '输氧费', label: '输氧费' },
            { value: '治疗费', label: '治疗费' },
            { value: '输血费', label: '输血费' },
            { value: '特治费', label: '特治费' },
            { value: '医疗服务费', label: '医疗服务费' },
            { value: '手术费', label: '手术费' },
            { value: '麻药费', label: '麻药费' },
            { value: '产前检查费', label: '产前检查费' },
            { value: '材料费', label: '材料费' },
            { value: '新生儿费', label: '新生儿费' },
            { value: '内置材料', label: '内置材料' },
            { value: '其他费', label: '其他费' },
            { value: '监护床位费', label: '监护床位费' },
            { value: '非处方药', label: '非处方药' },
            { value: '处方药', label: '处方药' },
            { value: '甲类', label: '甲类' },
            { value: '乙类', label: '乙类' },
            { value: '丙类', label: '丙类' }
          ];
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
  
  
  