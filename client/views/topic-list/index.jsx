import React from 'react'
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
import { AppState } from '../../store/app-state'


@inject('appState') @observer
export default class TopicList extends React.Component {
  constructor() {
    super()
    this.changName = this.changName.bind(this)
  }
  componentDidMount() {
    // do something here
  }
  changName(event) {
    this.props.appState.changName(event.target.value)
  }
  render() {
    return (
      <div>
        <input type="text" onChange={this.changName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}


TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
