<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="诊疗项目名称">
        <el-input v-model="searchClass.name" placeholder="请输入诊疗项目名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>

    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增诊疗</el-button>
    </el-row>

    <!--新增数据对话框表单-->
    <el-dialog title="新增诊疗项目" :visible.sync="addDialogVisible" width="30%">
      <el-form :model="newClass" :rules="rules" ref="newClassForm" label-width="150px" size="mini">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="newClass.projectName"></el-input>
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
        <el-form-item label="收费项目等级" prop="chargeLevel">
          <el-select v-model="newClass.chargeLevel" placeholder="请选择">
            <el-option label="甲类" value="A"></el-option>
            <el-option label="乙类" value="B"></el-option>
            <el-option label="丙类" value="C"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最高限价" prop="maxPrice">
          <el-input v-model="newClass.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startDate">
          <el-date-picker v-model="newClass.startDate" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endDate">
          <el-date-picker v-model="newClass.endDate" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="validFlag">
          <el-select v-model="newClass.validFlag" placeholder="请选择">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hospitalLevel">
          <el-select v-model="newClass.hospitalLevel" placeholder="请选择">
            <el-option label="一级医院" value="一级医院"></el-option>
            <el-option label="二级医院" value="二级医院"></el-option>
            <el-option label="三级医院" value="三级医院"></el-option>
            <el-option label="社区医院" value="社区医院"></el-option>
            <el-option label="所有医院" value="所有医院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要审批标志" prop="approvalFlag">
          <el-select v-model="newClass.approvalFlag" placeholder="请选择">
            <el-option label="是" value="yes"></el-option>
            <el-option label="否" value="no"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm('newClassForm')">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    
    <!--表格显示诊疗项目信息-->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="index" width="100" label="序号" align="center" type="index"></el-table-column>
      <el-table-column prop="projectCode" width="150" label="诊疗项目编码" align="center"></el-table-column>
      <el-table-column prop="projectName" width="200" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="chargeCategory" width="150" label="收费类别" align="center"></el-table-column>
      <el-table-column prop="chargeLevel" width="150" label="收费项目等级" align="center"></el-table-column>
      <el-table-column prop="maxPrice" width="150" label="最高限价" align="center"></el-table-column>
      <el-table-column prop="startDate" width="150" label="开始日期" align="center"></el-table-column>
      <el-table-column prop="endDate" width="150" label="终止日期" align="center"></el-table-column>
      <el-table-column prop="validFlag" width="150" label="有效标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.validFlag ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column prop="hospitalLevel" width="150" label="医院等级" align="center"></el-table-column>
      <el-table-column prop="approvalFlag" width="150" label="是否需要审批标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.approvalFlag ? '是' : '否' }}
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
    <el-dialog :visible.sync="dialogVisible" title="编辑诊疗项目">
      <el-form :model="editForm">
        <el-form-item label="诊疗项目编码">
          <el-input v-model="editForm.projectCode"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="editForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="收费类别">
          <el-input v-model="editForm.chargeCategory"></el-input>
        </el-form-item>
        <el-form-item label="收费项目等级">
          <el-input v-model="editForm.chargeLevel"></el-input>
        </el-form-item>
        <el-form-item label="最高限价">
          <el-input v-model="editForm.maxPrice"></el-input>
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
        <el-form-item label="医院等级">
          <el-input v-model="editForm.hospitalLevel"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志">
          <el-switch v-model="editForm.approvalFlag"></el-switch>
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
import { page, add, update, selectById, deleteById } from "@/api/treat.js";
import { findAll } from "@/api/treat.js";
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
      
      newClass: {
        projectName: '',
        chargeType: '',
        chargeLevel: '',
        maxPrice: '',
        startDate: '',
        endDate: '',
        validFlag: '',
        hospitalLevel: '',
        approvalFlag: ''
      },
      rules: {
        projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        expType: [{ required: true, message: '请输入收费类别', trigger: 'blur' }],
        chargeLevel: [{ required: true, message: '请选择收费项目等级', trigger: 'change' }],
        maxPrice: [{ required: true, message: '请输入最高限价', trigger: 'blur' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择终止日期', trigger: 'change' }],
        validFlag: [{ required: true, message: '请选择有效标志', trigger: 'change' }],
        hospitalLevel: [{ required: true, message: '请选择医院等级', trigger: 'change' }],
        approvalFlag: [{ required: true, message: '请选择是否需要审批标志', trigger: 'change' }]
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
          projectCode: '001',
          projectName: '诊疗项目A',
          chargeCategory: '类别1',
          chargeLevel: '等级1',
          maxPrice: 100,
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          validFlag: true,
          hospitalLevel: '三级甲等',
          approvalFlag: true,
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        projectCode: '',
        projectName: '',
        chargeCategory: '',
        chargeLevel: '',
        maxPrice: '',
        startDate: '',
        endDate: '',
        validFlag: false,
        hospitalLevel: '',
        approvalFlag: false,
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


