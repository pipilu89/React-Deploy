import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Todos from './componets/Todos'
import Header from "./componets/layout/Header"
import AddTodo from "./componets/AddTodo"
import About from "./componets/pages/About"

import './App.css';
// import { v4 as uuid } from 'uuid'
import axios from 'axios'

export default class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('http://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  //toggle complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //delete todo 
  delTodo = (id) => {
    axios.delete(`http://jsonplaceholder.typicode.com/todos/${id}`)
      .then(
        res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
      )

  }

  //add todo
  addTodo = (title) => {
    axios.post('http://jsonplaceholder.typicode.com/todos', { title, completed: false })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }))

  }

  render() {
    // console.log(this.state.todos)
    return (
      <Router>
        <div className='App'>
          <div className="container">
            <Header />
            <Route exact path='/' render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    )
  }
}
