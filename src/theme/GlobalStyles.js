import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
		text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 62.5%; 
  }

  body {
    font-size: 1.6rem;
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
		background-color: ${theme.gray};
  }

  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Open Sans';
	}
	
  p {
    font-size: 16px;
  }

  ul, h1 {
    padding: 0;
    margin: 0;
  }

	a:link {
		color: ${theme.navyBlue};
		text-decoration: none;
	}

	a:visited {
		color: ${theme.navyBlue};
		text-decoration: none;
	}

	a:hover {
		color: ${theme.navyBlue};
		text-decoration: none;
	}

	a:active {
		color: ${theme.navyBlue};
		text-decoration: none;
	}

	.activeBtn {
		background-color: ${theme.navyBlueHover};
	}
`;

export default GlobalStyle;
