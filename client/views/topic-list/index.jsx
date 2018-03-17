import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import Helment from 'react-helmet'
import Button from 'material-ui/Button'

import { AppState } from '../../store/app-state'

import Container from '../layout/container'


@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changName = this.changName.bind(this)
  }
  componentDidMount() {
    // do something here
  }

  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      })
    })
  }
  changName(event) {
    this.props.appState.changName(event.target.value)
  }
  render() {
    return (
      <Container>
        <Helment>
          <title>This is topic list</title>
          <meta name="description" content="this is description" />
        </Helment>
        <Button raised color="primary">This is Button</Button>
        <input type="text" onChange={this.changName} />
        <span>{this.props.appState.msg}</span>
      </Container>
    )
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
