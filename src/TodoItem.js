import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

// 生命周期函数应用，避免子组件做无谓的render操作，先看props是否发生了改变，提高性能
	shouldComponentUpdate (nextProps, nextState) {
		if (nextProps.ontent !== this.props.content) {
			return true;
		} else {
			return false;
		}
	}

	render () {
		const { content } = this.props;
		// JSX -> JS对象 -> 真实的DOM  
		return (
			<div onClick={this.handleClick}>
			{content}
			</div>)
	}

handleClick() {
		const { deleteItem, index } = this.props;
		deleteItem(index);
	}
}


/// 对props的类型做校验
TodoItem.propTypes = {
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	deleteItem: PropTypes.func,
	index: PropTypes.number
}

export default TodoItem;