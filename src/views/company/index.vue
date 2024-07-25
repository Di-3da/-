<template>
    <div class="app-container">
        <el-form :inline="true" :model="queryForm" class="demo-form-inline">
            <el-form-item label="单位名称">
                <el-input v-model="queryForm.name" placeholder="请输入单位名称"></el-input>
            </el-form-item>
            <el-form-item label="单位编号">
                <el-input v-model="queryForm.companyId" placeholder="请输入单位编号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="handleAdd">新增单位</el-button>
        <br>
        <br>
        <el-table :data="unitData" style="width: 100%" @selection-change="handleSelectionChange" border>
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="companyId" label="单位编号" align="center"></el-table-column>
            <el-table-column prop="name" label="单位名称" align="center"></el-table-column>
            <el-table-column prop="type" label="单位类型" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column prop="postcode" label="邮编" align="center"></el-table-column>
            <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button @click="handleEdit(scope.row)" type="primary" size="small">编辑</el-button>
                    <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
            :page-sizes="[5, 10, 20, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            background
            :total="total">
        </el-pagination>

        <!-- 新增编辑对话框 -->
        <el-dialog title="编辑单位信息" :visible.sync="dialogVisible" width="40%">
            <el-form :model="currentUnit" label-width="120px">
                <el-form-item label="单位编号">
                    <el-input v-model="currentUnit.companyId"></el-input>
                </el-form-item>
                <el-form-item label="单位名称">
                    <el-input v-model="currentUnit.name"></el-input>
                </el-form-item>
                <el-form-item label="单位类型">
                    <el-select v-model="currentUnit.type" placeholder="请选择单位类型">
                        <el-option v-for="item in unitTypes" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="currentUnit.address"></el-input>
                </el-form-item>
                <el-form-item label="邮编">
                    <el-input v-model="currentUnit.postcode"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="currentUnit.phone"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveUnit">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            queryForm: {
                name: '',
                companyId: ''
            },
            unitData: [],
            total: 0,
            pageSize: 5,
            currentPage: 1,
            dialogVisible: false,
            currentUnit: {},
            selectedUnits: [],
            unitTypes: [
                { value: 0, label: '机关' },
                { value: 1, label: '灵活就业管理单位' },
                { value: 2, label: '企业' },
                { value: 3, label: '事业' }
            ]
        };
    }
    ,
    methods: {
        handleQuery() {
            // 发送查询请求
            this.fetchData();
        },
        handleReset() {
            this.queryForm = {
                name: '',
                companyId: ''
            };
            this.fetchData();
        },
        handleAdd() {
            this.currentUnit = {};
            this.dialogVisible = true;
        },
        handleEdit(row) {
            this.currentUnit = { ...row };
            this.dialogVisible = true;
        },
        handleDelete(row) {
            // 发送删除请求
            this.$confirm('此操作将永久删除该单位信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete(`/company/${row.id}`)
                    .then(response => {
                        if (response.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.fetchData();
                        } else {
                            this.$message.error(response.data.msg);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting data:', error);
                        this.$message.error('删除失败');
                    });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        handleSelectionChange(val) {
            this.selectedUnits = val;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.fetchData();
        },
        saveUnit() {
            const url = this.currentUnit.id ? '/company' : '/company';
            const method = this.currentUnit.id ? 'put' : 'post';
            axios[method](url, this.currentUnit)
                .then(response => {
                    if (response.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '保存成功!'
                        });
                        this.dialogVisible = false;
                        this.fetchData();
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error saving data:', error);
                    this.$message.error('保存失败');
                });
        },
        fetchData() {
            
            axios.get('/company', {
                params: {
                    name: this.queryForm.name,
                    companyId: this.queryForm.companyId,
                    page: this.currentPage,
                    pageSize: this.pageSize
                }
            })
                .then(response => {
                    if (response.data.code === 1) {
                        this.unitData = response.data.data;
                        this.total = response.data.total;
                    } else {
                        this.$message.error(response.data.msg);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    this.$message.error('查询失败');
                });
        }
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style scoped>
.demo-form-inline .el-form-item {
    margin-bottom: 20px;
    margin-right: 10px;
}
</style>