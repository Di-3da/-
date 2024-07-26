<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="病种信息名称">
        <el-input v-model="searchClass.name" placeholder="请输入病种信息名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>

    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增病种信息</el-button>
    </el-row>

  <!--新增数据对话框表单-->
  <el-dialog title="新增疾病信息" :visible.sync="addDialogVisible" width="30%">
      <el-form ref="newDiseaseForm":model="newDisease" :rules="rules"  label-width="150px" size="mini">
        <el-form-item label="疾病编码" prop="disId">
          <el-input v-model="newDisease.disId"></el-input>
        </el-form-item>
        <el-form-item label="病种名称" prop="name">
          <el-input v-model="newDisease.name"></el-input>
        </el-form-item>
        <el-form-item label="疾病种类" prop="type">
          <el-select v-model="newDisease.type" placeholder="请选择">
            <el-option label="心血管系统疾病" value="0"></el-option>
            <el-option label="消化系统疾病" value="1"></el-option>
            <el-option label="代谢内分泌疾病" value="2"></el-option>
            <el-option label="造血系统疾病" value="3"></el-option>
            <el-option label="肾脏疾病" value="4"></el-option>
            <el-option label="神经系统" value="5"></el-option>
            <el-option label="免疫系统疾病" value="6"></el-option>
            <el-option label="传染病" value="7"></el-option>
            <el-option label="呼吸系统疾病" value="8"></el-option>
            <el-option label="恶性肿瘤" value="9"></el-option>
            <el-option label="精神病" value="10"></el-option>
            <el-option label="残疾" value="11"></el-option>
            <el-option label="泌尿系统" value="12"></el-option>
            <el-option label="其他" value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="疾病报销标志" prop="applyFlag">
          <el-select v-model="newDisease.applyFlag" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="notes">
          <el-input type="textarea" v-model="newDisease.notes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm('newDiseaseForm')">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <!--表格显示诊疗项目信息-->
    <el-table :data="tableData" style="width: 92%" border>
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="disId" width="150" label="疾病编码" align="center"></el-table-column>
      <el-table-column prop="name" width="200" label="病种名称" align="center"></el-table-column>
      <el-table-column prop="type" width="150" label="疾病种类" align="center"></el-table-column>
      <el-table-column prop="applyFlag" width="150" label="疾病报销标志" align="center">
        <template slot-scope="scope">
          {{ scope.row.applyFlag ? '是' : '否' }}
        </template>
      </el-table-column>
      <el-table-column prop="notes" width="200" label="备注" align="center"></el-table-column>
      <el-table-column align="center" width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑数据对话框表单-->
    <el-dialog :visible.sync="dialogVisible" title="编辑疾病信息">
      <el-form :model="editForm">
        <el-form-item label="疾病编码">
          <el-input v-model="editForm.disId"></el-input>
        </el-form-item>
        <el-form-item label="病种名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="疾病种类">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
        <el-form-item label="疾病报销标志">
          <el-switch v-model="editForm.applyFlag"></el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.notes"></el-input>
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
import { page, add, update, selectById, deleteById } from "@/api/disease.js";
import { findAll } from "@/api/disease.js";
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
      newDisease: {
        disId: '',
        name: '',
        type: '',
        applyFlag: '',
        notes: ''
      },
      rules: {
        disId: [{ required: true, message: '请输入疾病编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入病种名称', trigger: 'blur' }],
        type: [{ required: true, message: '请选择疾病种类', trigger: 'change' }],
        applyFlag: [{ required: true, message: '请选择疾病报销标志', trigger: 'change' }],
        notes: [{ required: false, message: '请输入备注', trigger: 'blur' }]
      },
      tableData: [
        // 示例数据
        {
          id: 1,
          disId: 'A001',
          name: '疾病A',
          type: '种类1',
          applyFlag: true,
          notes: '备注信息',
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        disId: '',
        name: '',
        type: '',
        applyFlag: false,
        notes: '',
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
        // 处理保存逻辑
        this.addNewClass();
      });
    },
    addNewClass() {
      add(this.newDisease).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '新增病种成功!' });
          this.addDialogVisible = false;
          this.newDisease = {}; // 清空表单
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


