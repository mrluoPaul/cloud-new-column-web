<template>
  <div class="home">
    <div class="header">新闻</div>
    <el-button
      type="text"
      size="mini"
      @click="() => append({ type: 1, id: '0' })"
    >
      添加第一级目录
    </el-button>
    <div class="body">
      <div class="mune">
        <el-tree
          :data="data"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.type != 3">{{ data.name }}</span>
            <span v-else @click="goDetails(data)">{{ data.name }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">
                {{ data.type == 3 ? "编辑" : "添加" }}
              </el-button>
              <el-button
                type="text"
                size="mini"
                @click="() => remove(node, data)"
              >
                删除
              </el-button>
            </span>
          </span>
        </el-tree>
      </div>
      <div class="content">内容</div>
    </div>
    <el-dialog title="新增文章或栏目" :visible.sync="dialogFormVisible">
      <el-form :model="formdata">
        <el-form-item
          :label="test.typy == 1 ? '添加第一级目录' : '文章或栏目名字'"
          label-width="120px"
        >
          <el-input v-model="formdata.name"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="120px">
          <el-select
            v-model="formdata.type"
            placeholder="请选择类型"
            :disabled="test.type == 3"
          >
            <el-option label="文章" :value="3"></el-option>
            <el-option label="栏目" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="formdata.type == '3'"
          label="文章内容"
          label-width="120px"
        >
          <el-input type="textarea" v-model="formdata.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { treeList, add, del, edit } from "@/api/new-home.js";
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "一级 1",
        children: [
          {
            id: 4,
            label: "二级 1-1",
            children: [
              {
                id: 9,
                label: "三级 1-1-1",
              },
              {
                id: 10,
                label: "三级 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        children: [
          {
            id: 5,
            label: "二级 2-1",
          },
          {
            id: 6,
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        children: [
          {
            id: 7,
            label: "二级 3-1",
          },
          {
            id: 8,
            label: "二级 3-2",
          },
        ],
      },
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      formdata: {
        name: "",
        type: "",
        content: "",
      },
      dialogFormVisible: false,
      test: {},
    };
  },
  created() {
    this.searchList();
  },
  methods: {
    append(data) {
      if (data.type == 3) {
        this.test = data;
        this.formdata = {
          name: data.name,
          type: data.type,
          content: data.content,
        };
        this.dialogFormVisible = true;
      } else if (data.type == 1) {
        this.test = data;
        this.dialogFormVisible = true;
        this.formdata = {
          name: "",
          type: 2,
          content: "",
        };
      } else {
        console.log(data);
        this.test = data;
        this.dialogFormVisible = true;
        this.formdata = {
          name: "",
          type: "",
          content: "",
        };
      }

      // add();
    },

    remove(node, data) {
      del(data.id).then((res) => {
        console.log(res);
        this.searchList();
      });
    },
    searchList() {
      treeList().then((res) => {
        console.log(res);
        this.data = res.body;
      });
    },
    // 新增编辑
    add() {
      // add()

      let body = {
        content: this.formdata.content,
        name: this.formdata.name,
        parentId: this.test.id,
        type: this.formdata.type,
      };
      if (this.test.type == 3) {
        edit({ ...body, id: this.test.id }).then((res) => {
          console.log(res);
          this.dialogFormVisible = false;
          this.searchList();
        });
      } else {
        add(body).then((res) => {
          console.log(res);
          this.dialogFormVisible = false;
          this.searchList();
        });
      }
    },
    // 查看详情
    goDetails(data) {
      this.$router.push({
        name: "Details",
        params: {
          name: "id",
          code: data.id,
        },
      });
    },
  },
};
</script>

<style  scoped>
.header {
  margin-bottom: 20px;
  border: 1px solid #000;
}
.body {
  display: flex;
  justify-content: space-between;
}
.mune {
  width: 300px;
}
.content {
  margin-left: 20px;
  width: calc(100% - 320px);
  border: 1px solid #000;
}
</style>
