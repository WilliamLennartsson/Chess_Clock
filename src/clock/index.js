import React, { Component } from 'react'
import './Clock.css'
import PropTypes from 'prop-types'
import { Row, Col, ButtonToolbar, Button } from 'react-bootstrap'
import Timer from 'react-compound-timer'

export default class Clock extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            willResetClock: false,
            players: ['Howar', 'Gowad'],
            activePlayer: 'Howar'
        }
        this.startClock = this.startClock.bind(this)
        this.stopClock = this.stopClock.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    startClock(){
        console.log("klockan startade")
    }

    stopClock(){
        
    }

    handleKeyDown(event){
        if (event.code == 'Space'){
            this.setState({
                willResetClock: true,
            })
        }
    }

    resetCheck(reset) {
        if (this.state.willResetClock){
            reset()
            this.setState((prevState) => ({
                willResetClock: false,
                activePlayer: prevState.activePlayer === prevState.players[0] ? prevState.players[1] : prevState.players[0]
            }))
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown)
    }

    render() {
        return (
            <div className="Clock_contentWrapper">
                <Timer
                    initialTime={20000}
                    direction="backward"
                    
                >
                    {({ start, resume, pause, stop, reset, timerState }) => (
                        <React.Fragment>
                            <Row>
                                <Col>
                                    <ButtonToolbar>
                                        <Button variant="success" onClick={start}>Start</Button>
                                        <Button variant="danger" onClick={stop}>Stop</Button>
                                        <Button variant="primary" onClick={reset}>Reset</Button>
                                        {this.state.willResetClock && this.resetCheck(reset)}
                                        <h2><Timer.Seconds /></h2>
                                    </ButtonToolbar>
                                    {this.state.activePlayer}
                                </Col>
                            </Row>
                        </React.Fragment>
                    )}
                </Timer>
            </div>
        )
    }
}
