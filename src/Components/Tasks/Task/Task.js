import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import DragIcon from '@material-ui/icons/DragIndicator';
import StarIcon from '@material-ui/icons/StarOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorderOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { formatDate, hasDatePassed } from '../../../Utils/date';
import * as actions from '../../../Store/Actions/';

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
	root: {
		padding: 0,
		width: '100%',
		minWidth: 230,
		marginBottom: spacing(.5),
	},
	paper: {
		display: 'flex',
		width: '100%',
		transition: 'width .2s ease',
		'&.moved': {
			width: 270
		}
	},
	drag: {
		position: 'relative',
		right: 0,
		width: 30,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		background: palette.text.white,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: spacing(1)
	},
	dragged: {
		opacity: .7
	},
	shrink: {
		width: 100,
	},
	checkbox: {
		padding: 5,
		color: palette.secondary.dark,
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	expand: {
		padding: spacing(1),
		paddingLeft: spacing(1),
		flexGrow: 1,
		cursor: 'pointer',
		overflowX: 'hidden'
	},
	title: {
		fontSize: 14
	},
	dragIcon: {
		width: 24,
		height: 24,
		color: palette.secondary.dark
	},
	actions: {
		cursor: 'pointer',
		flexGrow: 0,
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		minWidth: 108
	},
	favorite: {
		padding: spacing(.6),
		marginLeft: 3,
		'& svg': {
			fontSize: 24
		}
	},
	attachment: {
		fontSize: 15,
		color: palette.grey[600]
	},
	date: {
		fontSize: 11,
		color: palette.primary.light
	},
	datePassed: {
		color: palette.error.light
	},
	hide: {
		display: 'none',
	},
	[breakpoints.up('sm')]: {
		title: {
			fontSize: 18
		},
		date: {
			fontSize: 12,
		},
		drag: {
			width: 40,
		},
		attachment: {
			fontSize: 18,
		},
		favorite: {
			'& svg': {
				fontSize: 28
			}
		},
		actions: {
			paddingRight: spacing(1)
		}
	},
	[breakpoints.up('md')]: {
		root: {
			marginBottom: spacing(1.5)
		}
	}
}));


const Task = ({ index, task: { favorite, note, files, subtasks, deadline, content, id }, deleteTask, setTaskFavorite, history }) => {
	const classes = useStyles();
	const date = formatDate(deadline);
	const datePassed = hasDatePassed(deadline);
	const [checked, setChecked] = useState(false);
	const attachments = note || (files && files.length) || (subtasks && subtasks.length);

	const handleChange = event => {
		event.stopPropagation();
		setChecked(checked => !checked);
		deleteTask(id);
	};
	const handleFavorite = event => {
		event.stopPropagation();
		setTaskFavorite(id);
	};

	const handleExpand = () => {
		history.push(history.location.pathname + '/' + id);
	};




	return (
		<Draggable draggableId={id} index={index}>
			{({ draggableProps, dragHandleProps, innerRef }, snapshot) => (

				<Fragment>
					<ListItem
						className={[classes.root, snapshot.isDragging ? classes.dragged : null].join(' ')}
						ref={innerRef}
						{...draggableProps}
					>

						<Paper className={[classes.paper, snapshot.isDragging ? 'moved' : null].join(' ')}>
							<Tooltip enterDelay={800} title='move task' arrow>
								<div
									className={classes.drag}
									{...dragHandleProps}
								>
									<DragIcon className={classes.dragIcon} />
								</div>
							</Tooltip>
							<Tooltip enterDelay={800} title='finish task' arrow>
								<Checkbox
									className={classes.checkbox}
									disableRipple
									checked={checked}
									onChange={handleChange}
									value="primary"
								/>
							</Tooltip>
							<div className={classes.expand} onClick={handleExpand}>
								<ListItemText
									primary={content}
									primaryTypographyProps={{
										noWrap: true,
										classes: { root: [classes.title, snapshot.isDragging ? classes.shrink : null].join(' ') },
										component: 'div'
									}}
								/>
							</div>
							<div
								onClick={handleExpand}
								className={[classes.actions, snapshot.isDragging ? classes.hide : null].join(' ')}>
								{attachments
									? <Tooltip enterDelay={800} title='task has attachments' arrow>
										<AttachFileIcon className={classes.attachment} />
									</Tooltip>
									: null
								}
								<p className={[classes.date, datePassed ? classes.datePassed : null].join(' ')}>{date}</p>
								<Tooltip enterDelay={800} title='favorite' arrow>
									<IconButton className={classes.favorite} onClick={handleFavorite}>
										{favorite
											? <StarIcon color='secondary' />
											: <StarBorderIcon color='secondary' />
										}
									</IconButton>
								</Tooltip>
							</div>
						</Paper>
					</ListItem>
				</Fragment>
			)}
		</Draggable>
	);
};

const mapDispatchToProps = dispatch => ({
	deleteTask: taskId => dispatch(actions.deleteTask(taskId)),
	setTaskFavorite: taskId => dispatch(actions.setTaskFavorite(taskId)),
});

export default connect(null, mapDispatchToProps)(Task);
