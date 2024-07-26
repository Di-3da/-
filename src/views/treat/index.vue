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
      <el-form ref="newClassForm":model="newClass" :rules="rules"  label-width="150px" size="mini">
        <el-form-item label="诊疗项目编码" prop="treId">
          <el-input v-model="newClass.treId"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="newClass.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
          <el-select
            v-model="newClass.expType"
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
        <el-form-item label="收费项目等级" prop="expLevel">
          <el-select v-model="newClass.expLevel" placeholder="请选择">
            <el-option label="甲类" value="0"></el-option>
            <el-option label="乙类" value="1"></el-option>
            <el-option label="丙类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最高限价" prop="maxPrice">
          <el-input v-model="newClass.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="newClass.startTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endTime">
          <el-date-picker v-model="newClass.endTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="valid">
          <el-select v-model="newClass.valid" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hosLevel">
          <el-select v-model="newClass.hosLevel" placeholder="请选择">
            <el-option value="0" label="一级医院"></el-option>
            <el-option value="1" label="二级医院"></el-option>
            <el-option value="2" label="三级医院"></el-option>
            <el-option value="3" label="社区医院"></el-option>
            <el-option value="4" label="所有医院"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否需要审批标志" prop="approvalMark">
          <el-select v-model="newClass.approvalMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
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
      <el-table-column prop="treId" width="150" label="诊疗项目编码" align="center"></el-table-column>
      <el-table-column prop="name" width="200" label="项目名称" align="center"></el-table-column>
      <el-table-column prop="expType" width="150" label="收费类别" align="center"></el-table-column>
      <el-table-column prop="expLevel" width="150" label="收费项目等级" align="center"></el-table-column>
      <el-table-column prop="maxPrice" width="150" label="最高限价" align="center"></el-table-column>
      <el-table-column prop="startTime" width="150" label="开始日期" align="center"></el-table-column>
      <el-table-column prop="endTime" width="150" label="终止日期" align="center"></el-table-column>
      <el-table-column prop="valid" width="150" label="有效标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.valid ? '有效' : '无效' }}
        </template>
      </el-table-column>
      <el-table-column prop="hosLevel" width="150" label="医院等级" align="center"></el-table-column>
      <el-table-column prop="approvalMark" width="150" label="是否需要审批标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.approvalMark ? '是' : '否' }}
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
          <el-input v-model="editForm.treId"></el-input>
        </el-form-item>
        <el-form-item label="项目名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别">
          <el-input v-model="editForm.expType"></el-input>
        </el-form-item>
        <el-form-item label="收费项目等级">
          <el-input v-model="editForm.expLevel"></el-input>
        </el-form-item>
        <el-form-item label="最高限价">
          <el-input v-model="editForm.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="editForm.startTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期">
          <el-date-picker v-model="editForm.endTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志">
          <el-switch v-model="editForm.valid"></el-switch>
        </el-form-item>
        <el-form-item label="医院等级">
          <el-input v-model="editForm.hosLevel"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志">
          <el-switch v-model="editForm.approvalMark"></el-switch>
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
        treId:'',
        name: '',
        expType: '',
        expLevel: '',
        maxPrice: '',
        startTime: '',
        endTime: '',
        valid: '',
        hosLevel: '',
        approvalMark: ''
      },
      /*rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        expType: [{ required: true, message: '请输入收费类别', trigger: 'blur' }],
        expLevel: [{ required: true, message: '请选择收费项目等级', trigger: 'change' }],
        maxPrice: [{ required: true, message: '请输入最高限价', trigger: 'blur' }],
        startTime: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择终止日期', trigger: 'change' }],
        valid: [{ required: true, message: '请选择有效标志', trigger: 'change' }],
        hosLevel: [{ required: true, message: '请选择医院等级', trigger: 'change' }],
        approvalMark: [{ required: true, message: '请选择是否需要审批标志', trigger: 'change' }]
      },*/
      //远程搜索
      options: [],
      loading: false,
      
        tableData: [
        // 示例数据
        {
          id: 1,
          treId: '001',
          name: '诊疗项目A',
          expType: '类别1',
          expLevel: '等级1',
          maxPrice: 100,
          startTime: '2024-01-01',
          endTime: '2024-12-31',
          valid: true,
          hosLevel: '三级甲等',
          approvalMark: true,
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        treId: '',
        name: '',
        expType: '',
        expLevel: '',
        maxPrice: '',
        startTime: '',
        endTime: '',
        valid: true,
        hosLevel: '',
        approvalMark: true,
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
      page(this.searchClass.name, this.currentPage, this.pageSize).then((res) => {
        this.totalCount = res.data.data.total;
        this.tableData = res.data.data.rows;
      });
    },
    validateForm(formName) {
      this.$refs[formName].validate((valid) => {
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
        // 模拟远程搜索
        setTimeout(() => {
          this.loading = false;
          this.options = [
            { value: '3', label: '床位费' },
            { value: '4', label: '化验费' },
            { value: '5', label: '诊查费' },
            { value: '6', label: '检查费' },
            { value: '7', label: '护理费' },
            { value: '8', label: '特检费' },
            { value: '9', label: '输氧费' },
            { value: '10', label: '治疗费' },
            { value: '11', label: '输血费' },
            { value: '12', label: '特治费' },
            { value: '13', label: '医疗服务费' },
            { value: '14', label: '手术费' },
            { value: '15', label: '麻药费' },
            { value: '16', label: '产前检查费' },
            { value: '17', label: '材料费' },
            { value: '18', label: '新生儿费' },
            { value: '19', label: '内置材料' },
            { value: '20', label: '其他费' },
            { value: '21', label: '监护床位费' },
            { value: '24', label: '甲类' },
            { value: '25', label: '乙类' },
            { value: '26', label: '丙类' }
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


