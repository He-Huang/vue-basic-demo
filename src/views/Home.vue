<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="代办事项如下(目前修改功能尚未完善)" />

    <!-- 创建表单，用来提交添加的项目 -->
    <form @submit.prevent="addItem()" style="margin-bottom : 5px;">
      <input type="text" v-model="title" placeholder="请添加代办事项" class="new-todo" />
      <input type="submit" value="添加" class="btn" />
    </form>

    <div v-for="todo in todos" class="todo-item" :class="{'is-completed':todo.completed}">
      <p>
        <!-- 使用v-model双向绑定了todo的completed属性，当点击复选框时就改变completed，且复选框会跟随completed属性勾选或不勾选 -->
        <input type="checkbox" class="checkbox" name="complete" v-model="todo.completed" />
        {{todo.id}}--{{todo.title}}
        <input
          type="button"
          value="X"
          @click="deleteItem(todo.id)"
          class="del"
        />
        <input type="button" value="editor" @click="editTodo(todo.id)" class="edit" />
      </p>
      <el-dialog title="修改内容" :visible.sync="dialogVisible" width="50%">
        <el-form >
          <el-input v-model="todoItem"></el-input>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="putItem(todoItem)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
    return {
      todos: [],
      title: "",
      dialogVisible: false,
      todoItem: "",
    };
  },
  components: {
    HelloWorld
  },
  created() {
    //获取项目添加到todos数组
    axios.get("http://jsonplaceholder.typicode.com/todos?_limit=15").then(
      res => {
        // console.log(res.data);
        this.todos = res.data;
      },
      rej => {
        alert(rej);
      }
    );
  },
  methods: {
    //添加项目
    addItem() {
      const newTodo = {
        // id: this.todos.length++,   不可以添加id，会报错  目前不懂怎么解决
        title: this.title,
        completed: false
      };
      //解构赋值
      const { title, completed } = newTodo;
      //axios的post方法添加数据
      axios
        .post("http://jsonplaceholder.typicode.com/todos", { title, completed })
        .then(
          res => {
            this.todos = [res.data, ...this.todos];
          },
          rej => {
            alert(rej);
          }
        );
      //添加完成后清除输入框的内容
      this.title = "";
    },
    //删除项目 当删除项目时，后续添加的所有项目都会被删除
    deleteItem(id) {
      console.log(id);
      axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`).then(
        res => {
          //删除方法使用过滤器过滤掉当前id，只显示其他id的数据
          this.todos = this.todos.filter(function(todo) {
            return todo.id !== id;
          });
        },
        err => {
          alert(err);
        }
      );
    },
    //点击edit按钮获取当前todo的title
    editTodo(id){
      this.dialogVisible = true;
      console.log(id);
      this.todoItem = this.todos[id-1].title;
    },
    //修改项目,尚未完成
    putItem(todo) {
      this.dialogVisible = false;
      // console.log(id);
      this.$axios({
        url: "http://jsonplaceholder.typicode.com/todos", // url 定位到/student处
        method: "put",
        data: {
          todo
        }
      });
    }
  }
};
</script>

<style scoped>
.todo-item {
  text-align: left;
  background-color: aquamarine;
  padding: 5px;
  border-bottom: 1px solid orangered;
}
.del {
  background: red;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50px;
  /* 鼠标移入是手指的样式 */
  cursor: pointer;
  float: right;
}

.btn {
  display: inline-block;
  border: none;
  background: #555;
  color: #fff;
  padding: 7px 20px;
  cursor: pointer;
}

.btn:hover {
  background: #666;
}
.new-todo {
  border: 1px solid black;
  float: left;
  height: 30px;
  width: 90%;
}
/* 设置完成的样式，在文字中添加中划线 */
.is-completed {
  text-decoration: line-through;
}
.checkbox {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: #fff;
}
.edit {
  background-color: chartreuse;
  width: 50px;
  height: 30px;
}
</style>  