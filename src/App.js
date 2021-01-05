import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faArrowCircleDown, faPauseCircle, faPlayCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import Countdown from "react-countdown";


class SessionClock extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSessionUp = this.toggleSessionUp.bind(this);
    this.toggleSessionDown = this.toggleSessionDown.bind(this);
    this.toggleBreakUp = this.toggleBreakUp.bind(this);
    this.toggleBreakDown = this.toggleBreakDown.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.toggleStop = this.toggleStop.bind(this);
    this.timer = this.timer.bind(this);

    this.state = {
      sessionLength: 1,
      breakLength: 1,
      sessionState: "",
      currentBreak: "0",
      minutes: 1,
      seconds: "00",
    };
  }

  timer() {
console.log(this.state.minutes, this.state.seconds);
    // setState method is used to update the state
    if (this.state.seconds == "00" && this.state.minutes == 0) {
      if (this.state.sessionState == "in session"){
      this.break();
      } else {
        this.session();
      }
    }
    if (this.state.seconds == "00" && this.state.minutes != "00") {
      this.setState({
        minutes: (parseInt(this.state.minutes) - 1).toString(),
        seconds: "59"
      });
    }

    if (this.state.seconds != "00") {
      this.setState({
        seconds: (parseInt(this.state.seconds) - 1).toString()
      });
    }
    if ((this.state.seconds).length < 2) {
      this.setState({
        seconds: ("0" + this.state.seconds)
    });
  }
}

break() {
  this.setState({
    sessionState: "on break",
    minutes: (this.state.breakLength -1),
    seconds: "60"
  })
}

session() {
  this.setState({
    sessionState: "in session",
    minutes: (this.state.sessionLength -1),
    seconds: "60"
  })
}

  togglePlay() {
    this.timer();
    if (this.state.sessionState == "break paused"){
    this.setState({
      sessionState: "on break",
    });
  }else {
    this.setState({
      sessionState: "in session"
    });
  }

    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
  }

  togglePause() {
    if (this.state.sessionState == "in session"){
    this.setState({
      sessionState: "session paused",
    });
  } else if (this.state.sessionState == "on break") {
    this.setState({
      sessionState: "break paused"
    });
  }
    clearInterval(this.state.intervalId);
  }

  toggleStop() {
    this.setState({
      sessionState: "",
      minutes: this.state.sessionLength,
      seconds: "00"
    });
    clearInterval(this.state.intervalId);
  }

  toggleSessionUp() {
    this.setState({
      sessionLength: this.state.sessionLength + 1,
      minutes: this.state.minutes + 1,
    });
  }

  toggleSessionDown() {
    this.setState({
      sessionLength: this.state.sessionLength - 1,
      minutes: this.state.minutes - 1,
    });
  }

  toggleBreakUp() {
    this.setState({
      breakLength: this.state.breakLength + 1,
    });
  }

  toggleBreakDown() {
    this.setState({
      breakLength: this.state.breakLength - 1,
    });
  }


  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            <header>
              <h1>Session Clock</h1>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p id="session-clock">
              {this.state.minutes}:{this.state.seconds}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p class="blinking">{this.state.sessionState}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <button id="play-button" onClick={this.togglePlay}>
              <FontAwesomeIcon size="2x" icon={faPlayCircle}></FontAwesomeIcon>
            </button>
            <button id="pause-button" onClick={this.togglePause}>
              <FontAwesomeIcon size="2x" icon={faPauseCircle}></FontAwesomeIcon>
            </button>
            <button id="stop-button" onClick={this.toggleStop}>
              <FontAwesomeIcon size="2x" icon={faStopCircle}></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="row" id="length-container">
          <div className="col-12">
            <div className="row">
              <div className="col-12 text-center">
                <p id="session-length-text">
                  session length: {this.state.sessionLength}:00
                </p>
                <button id="session-length-up" onClick={this.toggleSessionUp}>
                  <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    size="1x"
                  ></FontAwesomeIcon>
                </button>
                <button
                  id="session-length-down"
                  onClick={this.toggleSessionDown}
                >
                  <FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="row" id="break-length-container">
              <div className="col-12 text-center">
                <p id="break-length-text">
                  break length: {this.state.breakLength}:00
                </p>
                <button id="break-length-up" onClick={this.toggleBreakUp}>
                  <FontAwesomeIcon icon={faArrowCircleUp}></FontAwesomeIcon>
                </button>
                <button id="break-length-down" onClick={this.toggleBreakDown}>
                  <FontAwesomeIcon icon={faArrowCircleDown}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SessionClock;
