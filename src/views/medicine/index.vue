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

    <!--按钮-->
    <el-row>
      <el-button type="primary" size="medium" @click="addDialogVisible = true;">+ 新增药品</el-button>
    </el-row>

    <!--新增数据对话框表单-->
      <el-dialog title="新增药品" :visible.sync="addDialogVisible" width="30%">
        <el-form :model="newClass" :rules="rules" ref="newClassForm" label-width="120px" size="mini">
          <el-form-item label="药品编码" prop="medicId">
            <el-input v-model="newClass.name"></el-input>
          </el-form-item>
          <el-form-item label="药品名称" prop="name">
            <el-input v-model="newClass.name"></el-input>
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
          <el-form-item label="收费项目等级">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="甲类" value="option1"></el-option>
              <el-option label="乙类" value="option2"></el-option>
              <el-option label="丙类" value="option3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="药品剂量单位" prop="measurement">
            <el-input v-model="newClass.room"></el-input>
          </el-form-item>
          <el-form-item label="最高限价" prop="maxPrice">
            <el-input v-model="newClass.room"></el-input>
          </el-form-item>
          <el-form-item label="是否需要审批" prop="maxPrice">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="是" value="option1"></el-option>
              <el-option label="否" value="option2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="医院等级" prop="hosLevel">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="一级医院" value="option1"></el-option>
              <el-option label="二级医院" value="option2"></el-option>
              <el-option label="三级医院" value="option3"></el-option>
              <el-option label="社区医院" value="option4"></el-option>
              <el-option label="所有医院" value="option5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格" prop="size">
            <el-input v-model="newClass.room"></el-input>
          </el-form-item>
          <el-form-item label="药品商品名" prop="tradename">
            <el-input v-model="newClass.room"></el-input>
          </el-form-item>
          <el-form-item label="开始日期" prop="beginTime">
            <el-date-picker v-model="newClass.beginTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="终止日期" prop="endTime">
            <el-date-picker v-model="newClass.endTime" clearable type="date" placeholder="选择日期" size="small" style="width:100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="有效标识" prop="valid">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="标志_否" value="option1"></el-option>
              <el-option label="标志_是" value="option2"></el-option>
              <el-option label="无效" value="option3"></el-option>
              <el-option label="有效" value="option4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特检特制标志" prop="specialmark">
            <el-select v-model="value" placeholder="请选择">
              <el-option label="是" value="option1"></el-option>
              <el-option label="否" value="option2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="validateForm('newClassForm')">保存</el-button>
            <el-button @click="addDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
     </el-dialog>


    
    <!--表格显示药品信息-->
    <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="index" width="100" label="序号" align="center" type="index"></el-table-column>
    <el-table-column prop="drugCode" width="150" label="药品编码" align="center"></el-table-column>
    <el-table-column prop="drugName" width="200" label="药品名称" align="center"></el-table-column>
    <el-table-column prop="chargeCategory" width="150" label="收费类别" align="center"></el-table-column>
    <el-table-column prop="chargeLevel" width="150" label="收费项目等级" align="center"></el-table-column>
    <el-table-column prop="doseUnit" width="150" label="药品剂量单位" align="center"></el-table-column>
    <el-table-column prop="maxPrice" width="150" label="最高限价" align="center"></el-table-column>
    <el-table-column prop="approvalFlag" width="150" label="是否需要审批标志" align="center">
      <template slot-scope="scope">
        {{ scope.row.approvalFlag ? '是' : '否' }}
      </template>
    </el-table-column>
    <el-table-column prop="hospitalLevel" width="150" label="医院等级" align="center"></el-table-column>
    <el-table-column prop="specification" width="150" label="规格" align="center"></el-table-column>
    <el-table-column prop="drugBrandName" width="200" label="药品商品名" align="center"></el-table-column>
    <el-table-column prop="startDate" width="150" label="开始日期" align="center"></el-table-column>
    <el-table-column prop="endDate" width="150" label="终止日期" align="center"></el-table-column>
    <el-table-column prop="validFlag" width="150" label="有效标识" align="center">
      <template slot-scope="scope">
        {{ scope.row.validFlag ? '有效' : '无效' }}
      </template>
    </el-table-column>
    <el-table-column prop="specialFlag" width="150" label="特检特制标志" align="center">
      <template slot-scope="scope">
        {{ scope.row.specialFlag ? '是' : '否' }}
      </template>
    </el-table-column>
    <el-table-column width="150" align="center" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" size="small" @click="openEditDialog(scope.row)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!--编辑数据对话框表单-->
    <el-dialog :visible.sync="dialogVisible" title="编辑药品">
      <el-form :model="editForm">
        <el-form-item label="药品编码">
          <el-input v-model="editForm.drugCode"></el-input>
        </el-form-item>
        <el-form-item label="药品名称">
          <el-input v-model="editForm.drugName"></el-input>
        </el-form-item>
        <el-form-item label="收费类别">
          <el-input v-model="editForm.chargeCategory"></el-input>
        </el-form-item>
        <el-form-item label="收费项目等级">
          <el-input v-model="editForm.chargeLevel"></el-input>
        </el-form-item>
        <el-form-item label="药品剂量单位">
          <el-input v-model="editForm.doseUnit"></el-input>
        </el-form-item>
        <el-form-item label="最高限价">
          <el-input v-model="editForm.maxPrice"></el-input>
        </el-form-item>
        <el-form-item label="是否需要审批标志">
          <el-switch v-model="editForm.approvalFlag"></el-switch>
        </el-form-item>
        <el-form-item label="医院等级">
          <el-input v-model="editForm.hospitalLevel"></el-input>
        </el-form-item>
        <el-form-item label="规格">
          <el-input v-model="editForm.specification"></el-input>
        </el-form-item>
        <el-form-item label="药品商品名">
          <el-input v-model="editForm.drugBrandName"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="editForm.startDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="终止日期">
          <el-date-picker v-model="editForm.endDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="有效标识">
          <el-switch v-model="editForm.validFlag"></el-switch>
        </el-form-item>
        <el-form-item label="特检特制标志">
          <el-switch v-model="editForm.specialFlag"></el-switch>
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
      rules: {
        medicId: [
          { required: true, message: '请输入药品编码', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入药品名称', trigger: 'blur' }
        ],
        maxPrice: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        beginTime: [
          { type: 'date', required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        endTime: [
          { type: 'date', required: true, message: '请选择终止时间', trigger: 'change' }
        ],
        valid: [
          { required: true, message: '请选择有效标识', trigger: 'change' }
        ],
        specialmark: [
          { required: true, message: '特检特制标志', trigger: 'change' }
        ]
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
          drugCode: '001',
          drugName: '药品A',
          chargeCategory: '类别1',
          chargeLevel: '等级1',
          doseUnit: 'mg',
          maxPrice: 100,
          approvalFlag: true,
          hospitalLevel: '三级甲等',
          specification: '10mg/片',
          drugBrandName: '品牌A',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          validFlag: true,
          specialFlag: false,
        },
        // 更多数据
      ],
      dialogVisible: false,
      editForm: {
        id: '',
        drugCode: '',
        drugName: '',
        chargeCategory: '',
        chargeLevel: '',
        doseUnit: '',
        maxPrice: '',
        approvalFlag: false,
        hospitalLevel: '',
        specification: '',
        drugBrandName: '',
        startDate: '',
        endDate: '',
        validFlag: false,
        specialFlag: false,
      }
    }
  },

  mounted() {
    this.page();
    findAll().then((result) => {
      this.masterList = result.data.data.map(item => ({ id: item.id, name: item.name }));
    });
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
        if (valid) {
          if (formName === 'newClassForm') {
            this.addNewClass();
          } else if (formName === 'editClassForm') {
            this.updateClass();
          }
        } else {
          this.$message.error('表单中有未完成项，请完成后再提交！');
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


