import Immutable from 'seamless-immutable'
import { createReducer } from 'reduxsauce'

import UsersTypes from '../constants/users'

export const INITIAL_STATE = Immutable({
  users: [],
  groups: []
})

const ACTION_HANDLERS = {
  [UsersTypes.USERS_SUCCESS]: (state, { users }) => {
    return state
      .set('users', users)
  },
  [UsersTypes.GROUPS_SUCCESS]: (state, { groups }) => {
    return state
      .set('groups', groups)
  }
}

export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
