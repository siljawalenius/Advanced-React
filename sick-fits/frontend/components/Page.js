//a componenetfor all the pages
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components';
import Header from './Header';

const GlobalStyles = createGlobalStyle`
    @font-face{
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2') formal('woff2');
        font-weight: normal;
        font-style: normal;
    }

    *, *:before, *:after{
        box-sizing: inherit;

    }

    body{
        font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding:0;
        margin:0;
        font-size: 1.5rem;
        line-height:2;
    }
    a{
        text-decoration:none;
        color:var(--black)
    }
    a:hover{
        text-decoration: underline;
    }
    html{
        --red: #ff0000;
        --black: #393939;
        --grey: #3a3a3a;
        --lightgrey: #e1e1e1;
        --offwhite: #ededed;
        --maxwidth: 1000px;
        --bs: 1 12px 24px 0 rgba(0,0,0,0.89);
    }

`;

const InnerStyles = styled.div`
    max-width: var(--maxwidth);
    margin:0 auto;
    padding: 2rem;

`;

export default function Page(props){
    const {children} = props;
    return(
        <div>
            <GlobalStyles />
            <Header></Header>
            {/* here, we're using props to render out the things inside thepage componenet */}
            <InnerStyles> {children} </InnerStyles>
        </div>
    )

}

Page.propTypes = {
    // children: PropTypes.oneOf([
    //     PropTypes.arrayOf(PropTypes.node),
    //     PropTypes.node
    // ])
    children: PropTypes.any
    
}