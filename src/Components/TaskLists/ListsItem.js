import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { withRouter } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(({ spacing, palette }) => ({
	listItem: {
		padding: 0,
		minHeight: 36
	},
	innerList: {
		padding: spacing(.5),
		margin: 0,
		width: '100%',
		minHeight: 36,
		display: 'flex',
		listStyle: 'none',
		alignItems: 'center',
	},
	over: {
		background: palette.secondary.light + '!important'
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
		marginRight: 16,
		marginLeft: 6,
		fontSize: 12,
		color: palette.grey[500],
		fontWeight: 'bold',
	},
	secondary: {
		width: 160,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
	secondary_edit: {
		width: 140,
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',

	},
	editIcon: {
		color: palette.error.light
	}
}));

const TasksListsItem = ({ handleClick, active, list, index, location, history }) => {
	const classes = useStyles();

	const handleEdit = event => {
		event.stopPropagation();
		history.push(location.pathname + '/editList');
	};

	return (
		<Draggable draggableId={list.id} index={index}>
			{(draggable) => (
				<ListItem
					ref={draggable.innerRef}
					{...draggable.draggableProps}
					className={classes.listItem}
					button
					selected={list.id === active}
					onClick={handleClick}
					data-type={list.id}
				>
					<Droppable droppableId={list.id}>
						{({ droppableProps, innerRef, placeholder }, snapshot) => (
							<ul
								className={[classes.innerList, snapshot.isDraggingOver ? classes.over : null].join(' ')}
								ref={innerRef}
								{...droppableProps}
							>
								<Tooltip enterDelay={400} title='move list' arrow classes={{ popper: classes.tooltip }}>
									<ListItemIcon className={classes.icon} {...draggable.dragHandleProps}>
										<ListIcon />
									</ListItemIcon>
								</Tooltip>
								<ListItemText
									secondary={list.title}
									classes={{ secondary: active ? classes.secondary_edit : classes.secondary }}
									primaryTypographyProps={{
										noWrap: true,
										component: 'p'
									}}
								/>
								{placeholder}
								{list.id === active
									? <IconButton size='small' className={classes.editIcon} onClick={handleEdit}>
										<EditIcon />
									</IconButton>
									: null}
								<span className={classes.badge}>{list.taskIds.length}</span>
							</ul>
						)}
					</Droppable>
				</ListItem>
			)}
		</Draggable>
	);
};

export default withRouter(TasksListsItem);
