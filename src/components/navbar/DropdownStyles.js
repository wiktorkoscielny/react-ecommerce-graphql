import styled from 'styled-components'; 

export const CartWrapper = styled.div`
    position: relative;
    padding: 32px 16px 32px 16px;
    text-align: left;
`
export const TitleWrapper = styled.div``
export const CartProduct = styled.div`
`
export const ReturnedProduct = styled.div`
    display: grid;
    grid-template-columns: 70% 10% 10%;
`
export const CartLeftSection = styled.div`
    
    h1, h2 {
        font-size: 16px;
        font-weight: 300;
    }   
    h3 {
        font-size: 16px;
        font-weight: 600;
    }
`
export const ListOfOptions = styled.button`
    min-width: 24px; 
    width: auto;
    height: 24px;
    text-align: center;
    margin-right: 5px;
    background: red;
    color: var(--text-dark);
    ${({ propsOption1, paramName, paramId }) => propsOption1 === paramName + paramId ? 'background: var(--text-dark)' : null};
    ${({ propsOption2, paramName, paramId }) => propsOption2 === paramName + paramId ? 'background: var(--text-dark)' : null};
    ${({ propsOption3, paramName, paramId }) => propsOption3 === paramName + paramId ? 'background: var(--text-dark)' : null};
    ${({ propsOption1, paramName, paramId }) => propsOption1 === paramName + paramId ? 'color: var(--bg-primary)' : null};
    ${({ propsOption2, paramName, paramId }) => propsOption2 === paramName + paramId ? 'color: var(--bg-primary)' : null};
    ${({ propsOption3, paramName, paramId }) => propsOption3 === paramName + paramId ? 'color: var(--bg-primary)' : null};
    font-size: 14px;
    border: 1px solid var(--text-dark);
    font-family: 'Source Sans Pro', sans-serif;
    cursor: pointer;
    transform: none;
`
export const ListOfColors = styled.button`

`
export const CartRightSection = styled.div``
export const QuantitySection = styled.div``
export const ButtonAdd = styled.div``
export const ImgOne = styled.div``
export const ImgTwo = styled.div``
export const Quantity = styled.div``
export const ButtonRemove = styled.button``
export const PhotoSection = styled.div``
export const PhotoContainer = styled.div``
export const Summary = styled.div``