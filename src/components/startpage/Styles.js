import styled from 'styled-components';

export const ListWrapper = styled.ul`
    padding: 100px 0 0 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    text-align: center;

    @media screen and (max-width: 890px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 665px) {
        grid-template-columns: repeat(1, 1fr);
    }
`
export const ListItem = styled.li`
    list-style: none;
    display: inline;
    text-align: center;
    cursor: pointer;
    padding: 0 0 50px 0;
    p {
        font-size: 18px;
        font-family: 'Raleway';
        line-height: 28.8px;
        display: flex;
        align-items: center;
        color: var(--text-dark);
    }
`
export const ImgWrapper = styled.img`

`
