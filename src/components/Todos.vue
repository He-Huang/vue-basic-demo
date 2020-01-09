<template>
  <div>
    <h2>待办事项</h2>
    <div>
    筛选:
    <select v-model="count" @change="filterTodos(count)">
      <option value="200">200</option>
      <option value="100">100</option>
      <option value="50">50</option>
      <option value="20">20</option>
      <option value="10">10</option>
      <option value="5">5</option>
    </select>
  </div>
    <div class="legend">
      <span>双击表示完成</span>
      <span>
        <span class="incomplete-box"></span> = 未完成
      </span>
      <span>
        <span class="complete-box"></span> = 已完成
      </span>
    </div>
    <form @submit.prevent="onSubmit">
      <input type="text" v-model="title" placeholder="...添加待办事项">
      <input type="submit" value="添加">
    </form>
    <div class="todos">
      <div
        :class="{'is-complete':todo.completed}"
        @dblclick="onDblClick(todo)"
        v-for="(todo,index) in allTodos"
        :key="index"
        class="todo"
      > <p>{{index+1}} ：{{todo.title}}</p>
        
				<!-- <input type="button" value="edit" @click="updateTodo(todo.id)" class="update" /> -->
        <input type="button" value="delete" @click="deleteTodo(todo.id)" class="del" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	name: "Todos",
	data(){
		return {
      title: "",
      count: 200,

		}
	},
	// mapGetters只要获取getters的方法就行
  computed: mapGetters(["allTodos"]),
  methods: {
		...mapActions(["getTodos","deleteTodo","addTodo","filterTodos","updateTodo"]),
		onSubmit() {
      // 分发actions
      this.addTodo(this.title);
      this.title = "";
    },
    onDblClick(todo) {
      // console.log(todo);
      const updTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed
      };
      this.updateTodo(updTodo);
    },
  },
  created() {
    this.getTodos();
  }
};
</script>

<style scoped>
.todos {
  display: flex;
  flex-wrap: wrap;
}
.todo {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #41b883;
  margin: 10px;
  width: 30%;
  height: 75px;
}
.del {
	align-self: flex-end;
  background-color: rgb(243, 80, 15);
  color: #fff;
  border-radius: 10px;
}
/* .update{
	align-self: flex-end;
  background-color: rgb(28, 97, 248);
  color: #fff;
	position: relative;
	right: 0px;
} */
form {
  display: flex;
}

input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}

input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
.legend {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
}

.complete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #35495e;
}

.incomplete-box {
  display: inline-block;
  width: 10px;
  height: 10px;
  background: #41b883;
}

.is-complete {
  background: #35495e;
  color: #fff;
}
</style>