<template>
  <div class="app-container">
    <!--搜索表单-->
    <el-form :inline="true" :model="searchClass" class="demo-form-inline">
      <el-form-item label="药品名称">
        <el-input v-model="searchClass.name" placeholder="请输入药品名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="info" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
<br>
    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增药品</el-button>
    </el-row>
<br>
    <!--新增数据对话框表单-->
    <el-dialog title="新增药品项目" :visible.sync="addDialogVisible" width="50%">
      <el-form ref="newDrugForm":model="medicine" :rules="rules"  label-width="150px" size="mini">
        <el-form-item label="药品编码" prop="medicId">
          <el-input v-model="medicine.medicId"></el-input>
        </el-form-item>
        <el-form-item label="药品名称" prop="name">
          <el-input v-model="medicine.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别" prop="expType">
          <el-select
            v-model="medicine.expType"
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
          <el-select v-model="medicine.expLevel" placeholder="请选择">
            <el-option label="甲类" value="0"></el-option>
            <el-option label="乙类" value="1"></el-option>
            <el-option label="丙类" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="药品剂量单位" prop="measurement">
          <el-input v-model="medicine.measurement"></el-input>
        </el-form-item>
        <el-form-item label="最高限价" prop="maxPrice">
          <el-input v-model="medicine.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志" prop="approvalMark">
          <el-select v-model="medicine.approvalMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="医院等级" prop="hosLevel">
          <el-select v-model="medicine.hosLevel" placeholder="请选择">
            <el-option label="一级医院" value="0"></el-option>
            <el-option label="二级医院" value="1"></el-option>
            <el-option label="三级医院" value="2"></el-option>
            <el-option label="社区医院" value="3"></el-option>
            <el-option label="所有医院" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="size">
          <el-input v-model="medicine.size"></el-input>
        </el-form-item>
        <el-form-item label="药品商品名" prop="tradeName">
          <el-input v-model="medicine.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="startTime">
          <el-date-picker v-model="medicine.startTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期" prop="endTime">
          <el-date-picker v-model="medicine.endTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标志" prop="valid">
          <el-select v-model="medicine.valid" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特检特制标志" prop="specialMark">
          <el-select v-model="medicine.specialMark" placeholder="请选择">
            <el-option label="是" value="true"></el-option>
            <el-option label="否" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validateForm('newDrugForm')">保存</el-button>
          <el-button @click="addDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    
    <!--表格显示药品信息-->
    <!--yidianxiugai-->
    <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="index" width="100" label="序号" align="center" type="index"></el-table-column>
    <el-table-column prop="medicId" width="150" label="药品编码" align="center"></el-table-column>
    <el-table-column prop="name" width="200" label="药品名称" align="center"></el-table-column>
    <el-table-column prop="expType" width="150" label="收费类别" align="center"></el-table-column>
    <el-table-column prop="expLevel" width="150" label="收费项目等级" align="center"></el-table-column>
    <el-table-column prop="measurement" width="150" label="药品剂量单位" align="center"></el-table-column>
    <el-table-column prop="maxPrice" width="150" label="最高限价" align="center"></el-table-column>
    <el-table-column prop="approvalMark" width="150" label="是否需要审批标志" align="center">
      <template slot-scope="scope">
        {{ scope.row.approvalMark ? '是' : '否' }}
      </template>
    </el-table-column>
    <el-table-column prop="hosLevel" width="150" label="医院等级" align="center"></el-table-column>
    <el-table-column prop="size" width="150" label="规格" align="center"></el-table-column>
    <el-table-column prop="tradeName" width="200" label="药品商品名" align="center"></el-table-column>
    <el-table-column prop="startTime" width="150" label="开始日期" align="center"></el-table-column>
    <el-table-column prop="endTime" width="150" label="终止日期" align="center"></el-table-column>
    <el-table-column prop="valid" width="150" label="有效标识" align="center">
      <template slot-scope="scope">
        {{ scope.row.valid ? '有效' : '无效' }}
      </template>
    </el-table-column>
    <el-table-column prop="specialMark" width="150" label="特检特制标志" align="center">
      <template slot-scope="scope">
        {{ scope.row.specialMark ? '是' : '否' }}
      </template>
    </el-table-column>
    <el-table-column width="150" align="center" label="操作">
      <template slot-scope="scope" fixed="right">
        <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--编辑数据对话框表单-->
    <el-dialog :visible.sync="dialogVisible" title="编辑药品" width="50%" >
      <el-form :model="editForm" label-width="150px">
        <el-form-item label="药品编码">
          <el-input v-model="editForm.medicId"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="收费类别">
          <el-input v-model="editForm.expType"></el-input>
        </el-form-item>
        <el-form-item label="收费项目等级">
          <el-input v-model="editForm.expLevel"></el-input>
        </el-form-item>
        <el-form-item label="药品剂量单位">
          <el-input v-model="editForm.measurement"></el-input>
        </el-form-item>
        <el-form-item label="最高限价">
          <el-input v-model="editForm.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志">
          <el-switch v-model="editForm.approvalMark"></el-switch>
        </el-form-item>
        <el-form-item label="医院等级">
          <el-input v-model="editForm.hosLevel"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="editForm.size"></el-input>
        </el-form-item>
        <el-form-item label="药品商品名">
          <el-input v-model="editForm.tradeName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="editForm.startTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期">
          <el-date-picker v-model="editForm.endTime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标识">
          <el-switch v-model="editForm.valid"></el-switch>
        </el-form-item>
        <el-form-item label="特检特制标志">
          <el-switch v-model="editForm.specialMark"></el-switch>
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
import { page, add, update, selectById, deleteById } from "@/api/medicine.js";
import { findAll } from "@/api/medicine.js";
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
      medicine: {
        medicId: '',
        name: '',
        expType: [],
        expLevel: '',
        measurement: '',
        maxPrice: '',
        approvalMark: '',
        hosLevel: '',
        size: '',
        tradeName: '',
        startTime: '',
        endTime: '',
        valid: '',
        specialMark: ''
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
          medicId: '001',
          name: '药品A',
          expType: '类别1',
          expLevel: '等级1',
          measurement: 'mg',
          maxPrice: 100,
          approvalMark: true,
          hosLevel: '三级甲等',
          size: '10mg/片',
          tradeName: '品牌A',
          startTime: '2024-01-01',
          endTime: '2024-12-31',
          valid: true,
          specialMark: false,
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        medicId: '',
        name: '',
        expType: '',
        expLevel: '',
        measurement: '',
        maxPrice: '',
        approvalMark: false,
        hosLevel: '',
        size: '',
        tradeName: '',
        startTime: '',
        endTime: '',
        valid: false,
        specialMark: false,
      }
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
      add(this.medicine).then((response) => {
        if (response.data.code === 1) {
          this.$message({ type: 'success', message: '新增药品成功!' });
          this.addDialogVisible = false;
          this.medicine = {}; // 清空表单
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
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        // 模拟远程搜索
        setTimeout(() => {
          this.loading = false;
          this.options = [
            { value: '0', label: '西药' },
            { value: '1', label: '中成药' },
            { value: '2', label: '中草药' },
            { value: '22', label: '非处方药' },
            { value: '23', label: '处方药' }
          ];
        }, 200);
      } else {
        this.options = [];
      }
    },
      update(id) {
      // 编辑操作
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


