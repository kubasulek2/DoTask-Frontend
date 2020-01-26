import React, { Component, Fragment } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import isLoggedIn from '../../Utils/is_logged_in';
import WithStyles from '../../HOC/WithStyles';
import Layout from '../../Components/Layout';
import Login from '../../Components/Login';
import Loader from '../../Components/UI/Loader/';
import Error from '../../Components/UI/ErrorModal';
import * as actions from '../../Store/Actions';


export class App extends Component {

	componentDidMount() {
		const { handleAuth, fetchTasks } = this.props;
		if (isLoggedIn()) {
			handleAuth(true);
		}
		fetchTasks();
	}

	onDragEnd = res => {
		const { addTask, removeTask, changeListsOrder, lists } = this.props;
		const { destination, source, draggableId, type } = res;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}


		if (type === 'list') {
			return changeListsOrder(source.index, destination.index, draggableId);
		}

		const activeId = this.props.location.pathname.match(/(?<=tasks\/)(?:.+(?=[/?])|.+(?=$))/)[0];
		const start = lists[activeId];
		const finish = destination.droppableId === 'inner' ? lists[activeId] : lists[destination.droppableId];
		if (start === finish) {
			removeTask(activeId, source.index);
			addTask(activeId, destination.index, draggableId);
			return;
		}

		removeTask(activeId, source.index);
		addTask(finish.id, finish.taskIds.length, draggableId);
	}

	render() {
		const { error, loading, cancelError, fetchTasks, isAuth } = this.props;
		const app = (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Layout />
			</DragDropContext>
		);

		return (
			<Fragment>
				{loading ? <Loader color='#4fa84a' /> : null}
				{error ? <Error error={error} cancelError={cancelError} reconnect={fetchTasks} /> : null}
				<Switch>
					<Route path='/login' component={Login} />
					{isAuth ? <Route path='/' render={() => app} /> : null}
					{!isAuth && !isLoggedIn() ? <Route path='/' render={() => <Redirect to='/login'/>} /> : null}
				</Switch>
			</Fragment>
		);
	}
}

const mapStateToProps = ({ tasks, app }) => ({
	lists: tasks.lists,
	loading: app.loading,
	error: app.error,
	isAuth: app.isAuth
});

const mapDispatchToProps = dispatch => ({
	addTask: (listId, idx, taskId) => dispatch(actions.addTask(listId, taskId, idx)),
	removeTask: (listId, idx) => dispatch(actions.removeTask(listId, idx)),
	changeListsOrder: (sourceIdx, destIdx, taskId) => dispatch(actions.changeListsOrder(sourceIdx, destIdx, taskId)),
	fetchTasks: () => dispatch(actions.fetchTasks()),
	cancelError: () => dispatch(actions.requestSuccess()),
	handleAuth: bool => dispatch(actions.handleAuth(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithStyles(App)));