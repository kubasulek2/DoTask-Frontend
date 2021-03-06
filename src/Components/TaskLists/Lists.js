import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';


import TasksListsItem from './ListsItem';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		paddingTop: spacing(2.5),
		flexGrow: 1,
		marginBottom: 44,
		background: palette.background.paper,
		transition: 'background .6s ease'
	},
	listItem: {
		padding: spacing(.5),
		minHeight: 36
	},
	over: {
		background: 'rgba(132,170,199,0.4)',
	},
	icon: {
		color: palette.grey[400],
		marginLeft: 12,
		minWidth: 40,
		transition: 'all .2s ease',
		'&:hover': {
			color: palette.primary.light
		}

	},
	badge: {
		marginLeft: 6,
		fontSize: 12,
		color: palette.grey[500],
		fontWeight: 'bold',
	},
	secondary: {
		width: 140
	},
	secondary_edit: {
		width: 120

	},
	editIcon: {
		color: palette.error.light
	}
}));

const TasksLists = ({ lists, listsOrder , active, handleClick }) => {
	const classes = useStyles();

	return (
		<Droppable droppableId='lists' type='list'>
			{({ innerRef, placeholder, droppableProps }, snapshot) => (
				<List
					className={[classes.root, snapshot.isDraggingOver ? classes.over : null].join(' ')}
					ref={innerRef}
					{...droppableProps}
				>
					{listsOrder.map((id, i) => (
						<TasksListsItem key={id + i} active={active} handleClick={handleClick} list={lists[id]} index={i} />
					))}
					{placeholder}
				</List>
			)}
		</Droppable>
	);
};

const mapStateToProps = ({tasks}) => ({
	lists: tasks.lists,
	listsOrder: tasks.listsOrder
});

export default connect(mapStateToProps)(TasksLists);
