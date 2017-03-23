import React, { Component } from 'react'
import { ButtonToolbar, Button, Accordion, Panel } from 'react-bootstrap'
import { connect } from 'react-redux'

import { createTextBox } from '../reducers/elements'

import { auth, storage } from 'APP/db/firebase'

class ToolBox extends Component {
	constructor(props) {
		super(props)

		this.onClickListener = this.onClickListener.bind(this)
		this.makeRandomId = this.makeRandomId.bind(this)
		this.getUser = this.getUser.bind(this)
		this.getRef = this.getRef.bind(this)
	}

  makeRandomId () {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);

	}

	onClickListener (event) {
		event.preventDefault()
		let newTextBox = {
			[this.makeRandomId()]: {
				top: 100,
				left: 100,
				size: 'small',
				text: 'i went on a trip',
			}
		}

		this.props.createTextBox(newTextBox)
	}

	getRef (userId) {
		return storage.ref(`${userId}/`)
	}



	getUser () {
		let user = auth.currentUser
		if (user) return user.uid
	}

	render () {
		// console.log('CURRENT USER', this.getUser())
		console.log('CURRENT StorageRef', this.getRef(this.getUser() + '/pikachu.png'))
		let pic = this.getRef(this.getUser() + '/pikachu.png').getDownloadURL()
		console.log('PIC',pic)
		return (
			<div>
				<ButtonToolbar>
					<Button bsStyle="primary" bsSize="large" onClick={this.onClickListener}>Add text box</Button>
				</ButtonToolbar>
				<Accordion>
					<Panel header="Add Photo" eventKey="1">
						This is the photo drawer!
					</Panel>
				</Accordion>
					<img src={`${pic}`} />
			</div>
		)
	}
}

const mapStateToProps = state => state

export default connect(mapStateToProps, { createTextBox })(ToolBox)
