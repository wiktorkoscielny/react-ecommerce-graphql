import styled from 'styled-components';
export const CartWrapper = styled.div`
    padding-top: 50px;
    display: grid;
    gap: 2rem;
` 
export const TitleWrapper = styled.div`
    height: 100px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    h1 {
        font-size: 32px;
        font-weight: 700;
        text-transform: uppercase;
    }
`
export const CartProduct = styled.div`` 
export const ReturnedProduct = styled.div`
    padding-bottom: 50px;
    border-bottom: 1px solid rgba(229, 229, 229, 1);
`
export const CartLeftSection = styled.div`
    h1{
        font-size: 30px;
        font-weight: 600;
        line-height: 27px; 
    }
    h2{
        font-size: 30px;
        font-weight: 400;
        line-height: 27px; 
    }
    h3{
        font-size: 24px;
        font-weight: 700;
        line-height: 24px; 
    }
    p{
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 700;
        line-height: 18px; 
    }
`
export const ListOfOptions = styled.button`
    min-width: 63px; 
    width: auto;
    height: 45px;
    text-align: center;
    margin-right: 5px;
    background: var(--bg-primary);
    color: var(--text-dark);
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption1 === paramName+paramId ? 'background: var(--text-dark)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption2 === paramName+paramId ? 'background: var(--text-dark)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption3 === paramName+paramId ? 'background: var(--text-dark)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => newDataOption === paramName+paramId ? 'background: var(--text-dark)'  : null};


    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption1 === paramName+paramId ? 'color: var(--bg-primary)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption2 === paramName+paramId ? 'color: var(--bg-primary)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => propsOption3 === paramName+paramId ? 'color: var(--bg-primary)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, newDataOption, paramName, paramId }) => newDataOption === paramName+paramId ? 'color: var(--bg-primary)'  : null};
    font-size: 16px;
    border: 1px solid var(--text-dark);
    font-family: 'Source Sans Pro', sans-serif;
    cursor: pointer;
`
export const ListOfColors = styled.button`
    width: 32px;
    height: 32px;
    background: ${(props) => props.color};
    ${({  propsOption1, propsOption2, propsOption3, paramName, paramId }) => propsOption1 === paramName+paramId ? 'outline: 2px solid var(--light-green)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, paramName, paramId }) => propsOption2 === paramName+paramId ? 'outline: 2px solid var(--light-green)'  : null};
    ${({  propsOption1, propsOption2, propsOption3, paramName, paramId }) => propsOption3 === paramName+paramId ? 'outline: 2px solid var(--light-green)'  : null};
    border: 1px solid var(--bg-primary);
    margin: 0 5px 0 0;
    cursor: pointer;
`
export const CartRightSection = styled.div``
export const QuantitySection = styled.div``
export const PhotoSection = styled.div``
export const Summary = styled.div``