import React from 'react';

import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import NotFound from '../../../UI/NotFound';
import NoDragTask from '../../Task/NoDragTask';
import { isDateToday } from '../../../../Utils/date';

const useStyles = makeStyles(({ spacing }) => ({
	root: {
		marginTop: spacing(1),
	}
}));

const Tasks = ({ tasks, history }) => {
	const classes = useStyles();
	const taskList = Object.values(tasks)
		.filter(t => isDateToday(t.deadline))
		.map(task => (
			<NoDragTask
				key={task.id}
				task={task}
				history={history}
			/>
		));

	return (
		taskList.length
			? <List className={classes.root}>{taskList}</List>
			: <NotFound />
	);
};

export default Tasks;
