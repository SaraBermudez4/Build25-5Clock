import { Button } from '@chakra-ui/button'
import { Heading } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/layout'
import { Center } from '@chakra-ui/layout'
import React, { useState } from 'react'
import { StyledDiv, StyledContent, StyledButton, StyledDivTime } from './styles/style.jsx'
import { TiArrowUpThick, TiArrowDownThick, TiMediaPlayOutline, TiMediaPauseOutline, TiMediaStopOutline } from "react-icons/ti";

const Length = ({ title, changeTime, type, time, formatTime, increment, decrement }) => {
    return (
        <div>
            <Text fontSize="25px">{title}</Text>
            <StyledDiv >

                <StyledButton onClick={() => changeTime(-60, type)} id={decrement}>
                    <i ><TiArrowDownThick fontSize="20px" color="black" /></i>
                </StyledButton>
                <Text fontSize="20px" id="break-length" >{formatTime(time)}</Text>
                <StyledButton onClick={() => changeTime(60, type)} id={increment}>
                    <i ><TiArrowUpThick fontSize="20px" color="black" /></i>
                </StyledButton>
            </StyledDiv>
        </div>
    )
}


const Reloj = () => {

    const [DTime, setTime] = useState(25 * 60)
    const [BTime, setBTime] = useState(5 * 60)
    const [STime, setSTime] = useState(25 * 60)
    const [timeOn, setTimeOn] = useState(false)
    const [stop, setStop] = useState(false)
    const [BAudio, setBAudio] = useState(new Audio("http://www.sonidosmp3gratis.com/sounds/002663916_prev.mp3"))

    const playAudio = () => {
        BAudio.currentTime = 0
        BAudio.play()
    }

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60)
        let seconds = time % 60
        return (
            (minutes < 10 ? "0" + minutes : minutes) +
            ":" +
            (seconds < 10 ? "0" + seconds : seconds)
        )
    }

    const changeTime = (cant, type) => {
        if (type === "break") {
            if (BTime <= 60 && cant < 0) {
                return
            }
            setBTime((prev) => prev + cant)
        } else {
            if (STime <= 60 && cant < 0) {
                return
            }
            setSTime((prev) => prev + cant)
            if (!timeOn) {
                setTime(STime + cant)
            }
        }
    }

    const controlTime = () => {
        let second = 1000
        let date = new Date().getTime()
        let nextDate = new Date().getTime() + second
        let onBreakVariable = stop
        if (!timeOn) {
            let interval = setInterval(() => {
                date = new Date().getTime()
                if (date > nextDate) {
                    setTime(prev => {
                        if (prev <= 0 && !onBreakVariable) {
                            playAudio()
                            onBreakVariable = true
                            setStop(true)
                            return BTime
                        } else if (prev <= 0 && onBreakVariable) {
                            playAudio()
                            onBreakVariable = false
                            setStop(false)
                            return STime
                        }
                        return prev - 1
                    })
                    nextDate += second
                }
            }, 30)
            localStorage.clear()
            localStorage.setItem('interval-id', interval)
        }
        if (timeOn) {
            clearInterval(localStorage.getItem("interval-id"))
        }

        setTimeOn(!timeOn)
    }

    const resetTime = () => {
        setTime(25 * 60)
        setBTime(5 * 60)
        setSTime(25 * 60)
    }

    return (
        <div >
            <Heading textAlign="center" mb="50px" mt="50px">25 + 5 Clock</Heading>
            <StyledContent>
                <div id="break-label">
                    <Length
                        title={"Break Length"}
                        changeTime={changeTime}
                        type={"break"}
                        time={BTime}
                        formatTime={formatTime}
                        increment="break-increment"
                        decrement="break-decrement"
                    />
                </div>
                <div id="session-label" >
                    <Length
                        title={"Session Length"}
                        changeTime={changeTime}
                        type={"session"}
                        time={STime}
                        formatTime={formatTime}
                        increment="session-increment"
                        decrement="session-decrement"
                    />
                </div>

                <StyledDivTime>
                    <Text fontSize="40px" id="timer-label">{stop ? "Break" : "Session"}</Text>
                    <Text fontSize="40px" id="time-left" >{formatTime(DTime)}</Text>
                    <StyledButton onClick={controlTime} id="start_stop" marginRight="30px">
                        {timeOn ?
                            <i ><TiMediaPauseOutline fontSize="20px" color="black" /></i>
                            :
                            <i ><TiMediaPlayOutline fontSize="20px" color="black" /></i>
                        }
                    </StyledButton>
                    <StyledButton onClick={resetTime} id="reset">
                        <i><TiMediaStopOutline fontSize="20px" color="black" /></i>
                    </StyledButton>
                </StyledDivTime>
            </StyledContent>
        </div>
    )
}

export default Reloj
