import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../Styles/theme';


const useStyles = makeStyles(({ palette }) => ({
	'@global': {
		'html, body': {
			height: '100%',
		},
		'#root': {
			height: '100%'
		},

	}
}));

/**
 * @function withStyles - Wrap a component with Higher Order Component which will apply global styles, and custom theme.
 * @requires <ThemeProvider> - MaterialUI Component that passes down my custom `theme`.
 * @param {component} WC - Component being wrapped
 * @returns {component} - Wrapper and wrapped components with styles applied.
 */
const withStyles = WC => {

	const WithStyles = props => {
		const globalStyles = useStyles();
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<WC style={globalStyles} {...props} />
			</ThemeProvider>
		);
	};
	return WithStyles;
};

export default withStyles;