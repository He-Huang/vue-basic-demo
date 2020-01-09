const state = {
    todos: []
};

const getters = {
    //获取所有的todos
    allTodos: state => state.todos
}

const mutations = {
    //设置todos
    setTodos: function (state, todos) {
        state.todos = todos;
    },
    //删除todo
    removeTodo:function(state,id){
        state.todos = state.todos.filter(function(todo){
            //过滤器函数必须要写函数返回值，返回的才是结果
            return todo.id !== id;
        })
    },
    //添加todo至todos数组
    addTodo: function (state, todo) {
        state.todos.unshift(todo);
    },
    updateTodo: (state, updTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updTodo.id);
        // console.log(index);
        if (index !== -1) {
          state.todos.splice(index, 1, updTodo);
        }
      }
}

const actions = {
    //获取todos
    async getTodos({
        commit
    }) {
        const response = await axios.get("http://jsonplaceholder.typicode.com/todos");
        //commit提交给mutations的setTodo方法，传入的参数为响应数据
        commit('setTodos', response.data);
    },
    //删除todo项目
    async deleteTodo({commit},id){
        await axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`);
        commit("removeTodo",id);
    },
    //添加项目
    async addTodo({ commit }, title) {
        const response = await axios.post(
          'http://jsonplaceholder.typicode.com/todos',
          { title, completed: false }
        );
        commit('addTodo', response.data);
    },
    //过滤项目，根据数量过滤
    async filterTodos({ commit }, count) {
        // console.log(count);
        const response = await axios.get(
            //在当前下，只需要在结尾加上“?_limit=”多少即可
          `http://jsonplaceholder.typicode.com/todos?_limit=${count}`
        );
        commit('setTodos', response.data);
      },
      //当双击表示完成时的更新函数
      async updateTodo({ commit }, updTodo) {
          //更新的请求是put
        const response = await axios.put(
          `http://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
          updTodo
        );
        commit('updateTodo', response.data);
      }
}


//不要忘记导出，模块化编程，每一个文件就是一个模块，不导出外部文件无法使用
export default {
    state,
    getters,
    mutations,
    actions
}