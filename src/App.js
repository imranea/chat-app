import React, { Component,createRef } from 'react'
import Formulaire from "./Component/Formulaire"
import './App.css'
import './animation.css'
import Message from './Message'

import base from "./base"

import {CSSTransition,TransitionGroup} from "react-transition-group"

class App extends Component {
    state={
      messages:{},
      pseudo:this.props.match.params.pseudo
    }

    messagesRef = createRef()

  componentDidMount(){
    base.syncState('/',{
      context:this,
      state:'messages'
    }) //Synchroniser la base de données
  }

  componentDidUpdate(){
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = (message) => {
    const messages = {...this.state.messages}
    messages[`message-${Date.now()}`] = message
    Object
      .keys(messages)
      .slice(0,-10)
      .forEach(key=>{
        messages[key] = null
      })

      this.setState({messages})
    console.log(messages)
  }

  isUser = pseudo => pseudo === this.state.pseudo
  

  render () {
   const messages = Object
      .keys(this.state.messages)
      .map(key =>(
        <CSSTransition  
        timeout={200}
        classNames='fade'
        key={key}
        >
          <Message 
          pseudo = {this.state.messages[key].pseudo}
          message = {this.state.messages[key].message}
          isUser = {this.isUser}
          />
        </CSSTransition>
      ))

    return (
      <div className='box'>
        <div>
          <div className="messages" ref={this.messagesRef}>
                  <TransitionGroup className='message'>
                  {messages}
                  </TransitionGroup>
          </div>
        </div>
        <Formulaire 
        length={140}
        pseudo={this.state.pseudo}
        addMessage={this.addMessage}/>
      </div>
    )
  }
}

export default App
