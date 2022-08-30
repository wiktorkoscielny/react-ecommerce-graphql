import styled from 'styled-components';

export const SectionsWrapper = styled.div`
margin-top: 100px;
display: grid;
grid-template-columns: 15% auto 40%;
gap: 2rem;
`
export const LeftSection = styled.div`
    ul {
        list-style-type: none;
    }
`
export const MiddleSection = styled.div`    
`
export const RightSection = styled.div`
    h2 {
        font-size: 30px;
        font-weight: 600;
        line-height: 27px;
    }
    h3 {
        font-size: 30px;
        font-weight: 400;
        line-height: 27px;
    }
    h4 {
        text-transform: uppercase;
        font-size: 18px;
        font-weight: 700;
        line-height: 18px;
    }
    p {
        font-size: 16px;
        line-height: 25.59px;
        font-weight: 400;
        color: var(--text-dark);
    }
`
export const Button = styled.button`
    text-align: center;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    font-size: 16px;
    line-height: 128%;
    color: var(--bg-primary);
    background: var(--light-green);
    border: 0px;
`

export const ListOfOptions = styled.button`
    min-width: ${({ param1 }) => (param1 === 'Color' ? '32px' : '63px')};
    width: ${({ param1 }) => (param1 === 'Color' ? '32px' : 'auto')};
    height: ${({ param1 }) => (param1 === 'Color' ? '32px' : '45px')};
    text-align: center;
    margin-right: 5px;
    background: ${({ param1, param2, currentOption }) => (currentOption === param1 + param2 && param1 !== 'Color' ? 'var(--text-dark)' : 'var(--bg-primary)')};
    background: ${({ param1, color }) => (param1 === 'Color' ? color : color)};
    color: ${({ param1, param2, currentOption }) => (currentOption === param1 + param2 ? 'var(--bg-primary)' : 'var(--text-dark)')};
    font-size: 16px;
    border: ${({ param1 }) => (param1 === 'Color' ? '1px solid var(--bg-primary)' : '1px solid var(--text-dark)')};
    outline: ${({ param1, param2, currentOption }) => (currentOption === param1 + param2 && param1 === 'Color' ? '2px solid var(--light-green)' : null)};
    font-family: 'Source Sans Pro', sans-serif;
    cursor: pointer;
`
export const ListOfColors = styled.div`
    height: 32px;
    width: 32px;
    background: red;
    border: 0px;
`