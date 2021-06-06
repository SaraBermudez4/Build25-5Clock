import styled from 'styled-components'
import { Container } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

export const StyledDiv = styled.div`
    display: grid;
    grid-template-columns: 50px 200px 50px;
    justify-items: center;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
`

export const StyledContent = styled(Container)`
    /* display: grid;
    grid-template-columns: 1fr 1fr;
    width: 700px;
    margin: auto; */
    padding: 30px;
    text-align: center;
    justify-items: center;
    align-items: center;
    background-color: #00adb5;
    border-radius: 20px;
`

export const StyledButton = styled(Button)`
border-radius: 100%;

`

export const StyledDivTime = styled.div`
    border-radius:20px; 
    border:solid 1px;
    padding: 10px;
    padding-bottom: 20px;
    background-color: #00adb5;
`