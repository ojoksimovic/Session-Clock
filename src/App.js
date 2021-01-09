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
      sessionLength: 25,
      breakLength: 5,
      sessionState: "",
      minutes: 25,
      seconds: "00",
    };
  }

  componentDidMount() {
    let rootEl = document.querySelector("#root");
    rootEl.className = "container-off";
  }
  timer() {
    console.log(this.state.minutes, this.state.seconds);
    // setState method is used to update the state
    if (this.state.seconds == "00" && this.state.minutes == 0) {
      if (this.state.sessionState == "in session") {
        this.break();
      } else {
        this.session();
      }
    }
    if (this.state.seconds == "00" && this.state.minutes != 0) {
      this.setState({
        minutes: (parseInt(this.state.minutes) - 1),
        seconds: "59",
      });
    }

    if (this.state.seconds != "00") {
      this.setState({
        seconds: (parseInt(this.state.seconds) - 1).toString(),
      });
    }
    if (this.state.seconds.length < 2) {
      this.setState({
        seconds: "0" + this.state.seconds,
      });
    }
  }

  break() {
    let clockEl = document.querySelector("#session-clock");
    clockEl.className = "on-break";
    let containerEl = document.querySelector("#container");
    containerEl.className = "container-fluid container-on-break";
    let rootEl = document.querySelector("#root");
    rootEl.className = "container-on-break";
    let bellEl = document.querySelector("#bell");
    bellEl.play();
    this.setState({
      sessionState: "on break",
      minutes: this.state.breakLength - 1,
      seconds: "60",
    });
  }

  hideLengthButtons() {
    const sessionUp = document.querySelector("#session-length-up");
    const sessionDown = document.querySelector("#session-length-down");
    const breakUp = document.querySelector("#break-length-up");
    const breakDown = document.querySelector("#break-length-down");
    sessionUp.className = "hidden";
    sessionDown.className = "hidden";
    breakUp.className = "hidden";
    breakDown.className = "hidden";
  }
  showLengthButtons() {
    const sessionUp = document.querySelector("#session-length-up");
    const sessionDown = document.querySelector("#session-length-down");
    const breakUp = document.querySelector("#break-length-up");
    const breakDown = document.querySelector("#break-length-down");
    sessionUp.className = "visible";
    sessionDown.className = "visible";
    breakUp.className = "visible";
    breakDown.className = "visible";
  }
  session() {
    let clockEl = document.querySelector("#session-clock");
    clockEl.className = "in-session";
    let containerEl = document.querySelector("#container");
    containerEl.className = "container-fluid container-in-session";
    let rootEl = document.querySelector("#root");
    rootEl.className = "container-in-session";
    let bellEl = document.querySelector("#bell");
    bellEl.play();
    this.setState({
      sessionState: "in session",
      minutes: this.state.sessionLength - 1,
      seconds: "60",
    });
  }

  togglePlay() {
    if (this.state.sessionState == "break paused") {
      this.timer();
      this.setState({
        sessionState: "on break",
      });
      var intervalId = setInterval(this.timer, 1000);
      // store intervalId in the state so it can be accessed later:
      this.setState({ intervalId: intervalId });
    } else if (
      this.state.sessionState == "" ||
      this.state.sessionState == "session paused"
    ) {
      let clockEl = document.querySelector("#session-clock");
      clockEl.className = "in-session";
      let containerEl = document.querySelector("#container");
      containerEl.className = "container-fluid container-in-session";
      let rootEl = document.querySelector("#root");
      rootEl.className = "container-in-session";
      this.timer();
      this.setState({
        sessionState: "in session",
      });
      var intervalId = setInterval(this.timer, 1000);
      // store intervalId in the state so it can be accessed later:
      this.setState({ intervalId: intervalId });
    }
    this.hideLengthButtons();
  }

  togglePause() {
    if (this.state.sessionState == "in session") {
      this.setState({
        sessionState: "session paused",
      });
    } else if (this.state.sessionState == "on break") {
      this.setState({
        sessionState: "break paused",
      });
    }
    clearInterval(this.state.intervalId);
  }

  toggleStop() {
    let clockEl = document.querySelector("#session-clock");
    clockEl.className = "off";
    let containerEl = document.querySelector("#container");
    containerEl.className = "container-fluid container-off";
    let rootEl = document.querySelector("#root");
    rootEl.className = "container-off";
    this.setState({
      sessionState: "",
      minutes: this.state.sessionLength,
      seconds: "00",
    });
    clearInterval(this.state.intervalId);
    this.showLengthButtons();
  }

  toggleSessionUp() {
    if (this.state.sessionLength < 100){
    this.setState({
      sessionLength: this.state.sessionLength + 1,
      minutes: this.state.minutes + 1,
    });
  };
  }

  toggleSessionDown() {
    if (this.state.sessionLength > 0){
    this.setState({
      sessionLength: this.state.sessionLength - 1,
      minutes: this.state.minutes - 1,
    });
  };
  }

  toggleBreakUp() {
    if (this.state.breakLength < 60){
    this.setState({
      breakLength: this.state.breakLength + 1,
    });
  };
  }

  toggleBreakDown() {
    if (this.state.breakLength > 0){
    this.setState({
      breakLength: this.state.breakLength - 1,
    });};
  }

  render() {
    return (
      <div className="container-fluid container-off" id = "container">
        <div className = "row">
          <div className = "col-xs-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3" id = "sub-container">
        <div className="row">
          <div className="col-12 text-center">
            <header>
              <h1 id = "clock-title">Session Clock</h1>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 offset-sm-2 text-center">
            <p className="off" id="session-clock">
              <audio id="bell" src="./bell.mp3" preload="auto"></audio>
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
              <FontAwesomeIcon size="3x" icon={faPlayCircle}></FontAwesomeIcon>
            </button>
            <button id="pause-button" onClick={this.togglePause}>
              <FontAwesomeIcon size="3x" icon={faPauseCircle}></FontAwesomeIcon>
            </button>
            <button id="stop-button" onClick={this.toggleStop}>
              <FontAwesomeIcon size="3x" icon={faStopCircle}></FontAwesomeIcon>
            </button>
          </div>
        </div>
        <div className="row" id="length-container">
          <div className="col-md-10 offset-md-1" id = "length-container-col">
            <div className="row">
              <div className="col-12 text-center">
                <p id="session-length-text">
                  session length: {this.state.sessionLength}:00
                </p>
                <button id="session-length-up" onClick={this.toggleSessionUp}>
                  <FontAwesomeIcon
                    icon={faArrowCircleUp}
                    size="2x"
                  ></FontAwesomeIcon>
                </button>
                <button
                  id="session-length-down"
                  onClick={this.toggleSessionDown}
                >
                  <FontAwesomeIcon icon={faArrowCircleDown} size="2x"></FontAwesomeIcon>
                </button>
              </div>
            </div>
            <div className="row" id="break-length-container">
              <div className="col-12 text-center">
                <p id="break-length-text">
                  break length: {this.state.breakLength}:00
                </p>
                <button id="break-length-up" onClick={this.toggleBreakUp}>
                  <FontAwesomeIcon icon={faArrowCircleUp} size="2x"></FontAwesomeIcon>
                </button>
                <button id="break-length-down" onClick={this.toggleBreakDown}>
                  <FontAwesomeIcon icon={faArrowCircleDown} size="2x"></FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
export default SessionClock;
