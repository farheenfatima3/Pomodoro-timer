import './App.css';
import React from 'react';

const audio=document.getElementById("audio")
class App extends React.Component{
  constructor(props){
    super(props)
    this.interval=undefined
  }
     state={
       timerTitle:'Session',
       clockCount:25*60,
       isPlaying:true,
       breakTime:5,
       sessionTime:25
     }
  
  calculateTime=(clockCount)=>{
    let minutes=Math.floor(clockCount/60);
    let seconds=clockCount%60;
    seconds=(seconds<10)?'0'+seconds:seconds;
    minutes=(minutes<10)?'0'+minutes:minutes;
    return `${minutes} : ${seconds}`
  }
  handleBreakIncrease=()=>{
    const {breakTime,isPlaying,timerTitle,clockCount}=this.state
    if(isPlaying && breakTime<60){
    this.setState({
      breakTime:breakTime+1,
      clockCount:(timerTitle==='Session')?clockCount:(breakTime+1)*60
    })
    }}
    handleBreakDecrease=()=>{
      const {breakTime,isPlaying,timerTitle,clockCount}=this.state
      if(isPlaying && breakTime>1){
      this.setState({
        breakTime:breakTime-1,
        clockCount:(timerTitle==='Session')?clockCount:(breakTime-1)*60
      })
    }}
    handleSessionIncrease=()=>{
      const {sessionTime,isPlaying,timerTitle,clockCount}=this.state
      if(isPlaying && sessionTime<60){
    this.setState({
      sessionTime:sessionTime+1,
      clockCount:(timerTitle==='Break')?clockCount:(sessionTime+1)*60
    })
  }
    }
    handleSessionDecrease=()=>{
      const {sessionTime,isPlaying,timerTitle,clockCount}=this.state
      if(isPlaying && sessionTime>1){
    this.setState({
      sessionTime:sessionTime-1,
      clockCount:(timerTitle==='Break')?clockCount:(sessionTime-1)*60
    })
  }
    }

    handleReset=()=>{
      this.setState({
        timerTitle:'Session',
       clockCount:25*60,
       isPlaying:true,
       breakTime:5,
       sessionTime:25
      })
      audio.pause()
      audio.currentTime=0
      clearInterval(this.interval)
    }

    

    playPause=()=>{
        const {isPlaying}=this.state
        if(isPlaying){
            this.interval=setInterval(()=>{
               const {timerTitle,breakTime,sessionTime}=this.state
              let {clockCount}=this.state
              if(clockCount===0){
                this.setState({
                  timerTitle:(timerTitle==='Session')?'Break':'Session',
                  clockCount:(timerTitle==='Session')?(breakTime*60):(sessionTime*60)
                })
                audio.play()
              }else{
           
              this.setState({
                clockCount:clockCount-1
              })
            }
      
          },1000)
          this.setState({
            isPlaying:false
          })
          }else{
          clearInterval(this.interval)
          audio.pause()
          audio.currentTime=0
          this.setState({
            isPlaying:true
          })
        }
    }
  

  render(){
    const {clockCount,isPlaying,breakTime,sessionTime}=this.state
    const breakProps={
      title:'Break',
      count:breakTime,
      handleIncrease:this.handleBreakIncrease,
      handleDecrease:this.handleBreakDecrease
    }
    const sessionProps={
      title:'Session',
      count:sessionTime,
      handleIncrease:this.handleSessionIncrease,
      handleDecrease:this.handleSessionDecrease
    }
    return(
      <div className="total-container">
        <div className="count-container">
        <SetTimer {...breakProps}/>
        <SetTimer {...sessionProps}/>
        </div>
        <div className="timerIcon">
        <div className="timer-container">
          <h1 id="time-lable">{this.state.timerTitle}</h1>
          <span id="time-left">{this.calculateTime(clockCount)}</span>
          </div>
          <div className="icons">
          <i id="startStop" onClick={this.playPause} class={`fas fa-${isPlaying?'play':'pause'}`}></i>
          <i id="reset" onClick={this.handleReset} class="fas fa-sync"></i>
          </div>
          </div>
      </div>
    )
  }
}

const SetTimer=(props)=>{
  const id=props.title.toLowerCase()
  return(
    <div className="button-container">
    <h1 id={`${id}`}>{props.title} Length</h1>
    <i id={`${id}-inc`} className="incDec" onClick={props.handleIncrease} class="fas fa-arrow-up"></i>
    <span>{props.count}</span>
    <i id={`${id}-dec`} className="incDec" onClick={props.handleDecrease} class="fas fa-arrow-down"></i>
    </div>
  )
  }
export default App;
