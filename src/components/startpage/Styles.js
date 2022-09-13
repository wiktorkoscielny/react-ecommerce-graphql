import styled from 'styled-components';
import { Link } from 'react-router-dom'
export const MainWrapper = styled.div`
    margin-top: 50px;
    margin-bottom: 100px;
        h1 {
            height: 50px;
            font-size: 42px;
            line-height: 67.2px;
            font-weight: 400;
        }
`
export const ListWrapper = styled.ul`
    padding: 50px 0 0 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    
    @media screen and (max-width: 890px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 665px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
export const ListItem = styled.li`
    list-style: none;
    max-width: 248px
    display: inline;
    position: relative;
    cursor: pointer;
    padding: 0;
    margin=bottom: 40px;
    text-align: center;
`
export const ImgWrapper = styled.div`
    min-height: 310px;
    img {
        width: 310px;
        max-height: 310px;
        filter: brightness(0.99);
    }
`
export const TextWrapper = styled.div`
    width: 310px;
    margin-left: auto;
    margin-right: auto;
    p {
        font-size: 18px;
        font-family: 'Raleway';
        line-height: 28.8px;
        text-align: left;
        color: var(--text-dark);
        max-width: 248px;
    }
`
export const FloatingCart = styled.div`
    visibility: hidden;
    position: absolute;
    opacity: 0;
    transition:visibility 0.3s linear,opacity 0.3s linear;
    top:280px;
    right: 10px;
    height: 52px;
    width: 52px;
    z-index: 30;
    border: 1px solid transparent;
    border-radius: 50%;
    background: var(--light-green);
        img {
            position: relative;
            margin-left: auto;
            margin-right: auto;
            top: 15px;

        }
`
export const StyledLink = styled(Link)`
    border: 20px solid transparent;
    text-decoration: none;
    transition: box-shadow .3s;
    :hover {
        -webkit-box-shadow: 0px 0px 14px 5px rgba(0,0,0,0.1); 
        box-shadow: 0px 0px 14px 5px rgba(0,0,0,0.1);
    }
    &:hover ${FloatingCart} {
        visibility: visible;
        opacity: 1;
    }
`