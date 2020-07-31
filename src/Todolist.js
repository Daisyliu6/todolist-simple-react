import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';
import './style.css';

class Todolist extends Component {
	//constructor是最优先处理的函数,定义数据需要把数据定义在状态里
	// state负责存储组件里的数据
	constructor(props) {
      super(props);
      // 当组件的state或者props发生改变的时候，render函数就会重新执行
      this.state = {
      	inputValue: '',
      	list: []
      }
      // 确保绑定操作只执行一次，性能优化
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);
	}

	render() {
		//render返回的元素整体必须放在一个大的元素之中
		//程序启动时，把input框里的内容渲染成开始设置的inputValue里的值
	return (
		<Fragment>
			<div>
			<label htmlFor="insertArea">Here is the input</label>
			<input 
	    id="insertArea"
			className='input'
			value={this.state.inputValue}
			/// 当在文本框里输入内容时，就需要执行onChange事件 
			// 使输入框可以接收输入的数据，需要进行事件绑定，还需要使用bind(this)改变this的指向
			onChange={this.handleInputChange}
			/>
			<button onClick={this.handleBtnClick}>Submit</button>
			</div>
			<ul>
				{this.getTodoItem()}
			</ul>
	  </Fragment>
		)
	}
    
    // ajax 请求放在componentDidMount生命周期函数里，需要第三方模块
componentDidMount() {
    axios.get('/api/todolist')
    .then((res)=>{
    	this.setState(() => ({
    		list: [...res.data]
    	}));
    })
    .catch(()=>{alert('error')})
	}

getTodoItem() {
	return this.state.list.map((item, index) => {
       return (
                	<TodoItem 
                	key={item}
                	content={item} 
                	index={index}
                	deleteItem={this.handleItemDelete}/>
                )
				})
}

handleInputChange(e) {
	const value = e.target.value;
		///拿到新输入的内容,找到target的值, 使target的值赋值于inputValue
		//如果要改变state里的数据，必须要使用setState
		// 用setState对state里的具体数据项进行变更
    this.setState(() => ({
    		inputValue: value
}));
}

handleBtnClick() {
this.setState((prevState) => ({
	// 展开运算符...this.state.list 把之前数组里的内容保存成一个新的array
	list: [...prevState.list, prevState.inputValue],
	inputValue: ''
}));
}

handleItemDelete(index) {
	this.setState((prevState) => {
		const list = [...prevState.list];
		list.splice(index, 1);
		return {list}
	});
}
}

export default Todolist; 