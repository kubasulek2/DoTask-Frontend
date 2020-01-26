import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import DragIcon from '@material-ui/icons/DragIndicator';
import GradeIcon from '@material-ui/icons/Grade';
import GradeOutlinedIcon from '@material-ui/icons/GradeOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		padding: 0,
		width: '100%',
		marginBottom: spacing(.5),
	},
	paper: {
		display: 'flex',
		width: '100%',
		transition: 'all .2s ease',
		'&.moved': {
			width: 270
		}
	},
	drag: {
		position: 'relative',
		right: 0,
		width: 35,
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		background: palette.text.white,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: spacing(1)
	},
	expand: {
		padding: spacing(1),
		paddingLeft: spacing(2),
		flexGrow: 1,
		cursor: 'pointer',
	},
	shrink: {
		width: 100,
	},
	dragIcon: {
		width: 24,
		height: 24,
		color: palette.secondary.dark
	},
	actions: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	favorite: {
		padding: spacing(1)
	},
	dragged: {
		opacity: .7
	}
}));

const Task = ({ text, id, index, favorite }) => {
	const classes = useStyles();
	return (
		<Draggable draggableId={id} index={index}>
			{({ draggableProps, dragHandleProps, innerRef }, snapshot) => (
				<ListItem
					className={[classes.root, snapshot.isDragging ? classes.dragged : null].join(' ')}
					ref={innerRef}
					{...draggableProps}

				>
					<Paper className={[classes.paper, snapshot.isDragging ? 'moved' : null].join(' ')}>
						<div
							className={classes.drag}
							{...dragHandleProps}
						>
							<DragIcon className={classes.dragIcon} />
						</div>
						<div className={classes.expand}>
							<ListItemText
								primary={text}
								primaryTypographyProps={{
									noWrap: true,
									classes: { root: snapshot.isDragging ? classes.shrink : null },
									component: 'div'
								}}
							/>
						</div>
						<div className={classes.actions}>
							<AttachFileIcon fontSize='small' color='disabled' />
							<IconButton className={classes.favorite}>
								{favorite ? <GradeIcon color='secondary' /> : <GradeOutlinedIcon color='secondary' />}
							</IconButton>
						</div>
					</Paper>
				</ListItem>
			)}
		</Draggable>
	);
};

export default Task;
