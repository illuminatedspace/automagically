import React, { Component } from 'react'
import Canvas from './Canvas'
import { Provider } from 'react-redux'
import { database , auth } from 'APP/db/firebase'
import store from 'APP/app/store'
import ToolBox from './ToolBox'
import { Grid, Col, Button } from 'react-bootstrap'

export default class CanvasContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      store: null,
      editable: true,
    }

    this.toggleMode = this.toggleMode.bind(this)
    this.renderView = this.renderView.bind(this)
  }

  toggleMode() {
    this.setState({
      editable: !this.state.editable,
    })
  }

  //when this component mounts, figure out the firebase path from params

  componentWillMount () {
    const tripId = this.props.params.tripId
    const tripActionsRef = database.ref(`tripActions/${tripId}`)

    this.setState({
      store: store(tripActionsRef),
      tripInfoRef: database.ref(`tripInfo/${tripId}`)
    }, () => {
      this.state.tripInfoRef.on('value', (snap) => this.setState({
          tripInfo: snap.val()
        }))
    })
    //add a auth user listener
    //if user then check and see if the page belongs to them. Only display edit/view button if page belongs to them
  //
  }

  componentWillUnmount () {
    //add cleanup from auth.userChange listener
  }

  //add component will receive props, update store

  //possibly add cleanup for component will unmount

  renderView() {
    return this.state.editable ?
    //render this if editable is true
      <Grid>
        <Col lg={4}>
          <ToolBox tripInfo={this.state.tripInfo} tripInfoRef={this.state.tripInfoRef}/>
        </Col>
        <Col lg={8}>
          <Canvas editable={this.state.editable} />
        </Col>
      </Grid>

    //render this if editable is false
    : <Grid>
        <Col lg={8}>
          <Canvas editable={this.state.editable} />
        </Col>
      </Grid>
  }

  render () {
    if (!this.state) return null
    let tripInfo = this.state.tripInfo || null
    return (
      <div>
        <Button onClick={this.toggleMode}>
          {this.state.editable ? "View" : "Edit" }
        </Button>
        {
          tripInfo ?
          <div>
            <h1>{`${tripInfo.name}, ${tripInfo.description}, ${tripInfo.startDate}`}</h1>
          </div>
          : null
        }
        <Provider store={this.state.store}>
          {this.renderView()}
        </Provider>
      </div>
    )
  }
}
