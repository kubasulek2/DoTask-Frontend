import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { ReactComponent as LogoIcon } from '../../Assets/logo.svg';
import LoginForm from '../../Containers/Forms/Login';


const xxs = '@media (max-width:500px)';
const landscape = '@media (orientation: landscape) and (max-height: 450px) ';
const useStyles = makeStyles(({ spacing, palette }) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100vw',
		height: '100vh',
		background: palette.primary.main,
		[landscape] : {
			display: 'block',
			padding: '100px 0',
			height: 'initial'
		}
	},
	switchType: {
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 24,
		[xxs]: {
			padding: 12
		}
	},
	switchButton: {
		fontWeight: 'bold',
		fontSize: 22,
		boxShadow: 'none',
		color: palette.secondary.main,
		background: palette.background.paper
		
	},
	card: {
		background: palette.background.default,
		width: 450,
		padding: `${ spacing(5) }px ${ spacing(3) }px`,
		[xxs]: {
			padding: `${ spacing(3) }px ${ spacing(1) }px`,
			width: '95%',
			minWidth: 300
		},
		[landscape]: {
			width: '80%',
			maxWidth: 450,
			margin: 'auto auto'
		}
	},
	media: {
		display: 'flex',
		justifyContent: 'center',
	},
	icon: {
		width: '50px',
		height: '50px'
	},
	welcome: {
		color: palette.secondary.dark,
		margin: '16px 0 0',
		fontSize: 40,
		fontWeight: 'bold',
		[xxs]: {
			fontSize: 24,
		}
	},
	subHeader: {
		color: palette.text.primary,
		fontSize: 20,
		[xxs]: {
			fontSize: 16,
		}
	}


}));


const Login = () => {
	const classes = useStyles();

	const [authType, setAuthType] = useState('login');
	const switchAuthType = () => setAuthType(prev => prev === 'login' ? 'signup': 'login');

	return (
		<div className={classes.root}>
			<div className={classes.switchType}>
				<Button 
					variant='contained'
					size='large' 
					className={classes.switchButton}
					onClick={switchAuthType}
				>
					{authType === 'login' ? 'sign up' : 'log in'}
				</Button>
			</div>
			<Card className={classes.card}>
				<CardMedia
					className={classes.media}
				>
					<LogoIcon className={classes.icon} />
				</CardMedia>
				<Typography
					className={classes.welcome}
					align='center'
				>Do Tasks</Typography>
				<Typography
					className={classes.subHeader}
					align='center'
				>Your best personal manager!</Typography>
				<CardContent>
					<LoginForm type={authType} />
				</CardContent>
			</Card>
		</div>
	);
};

export default Login;
