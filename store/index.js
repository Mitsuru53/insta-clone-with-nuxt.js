import Vuex from 'vuex'
import firebase from '~/plugins/firebase'

const store = () => new Vuex.Store({
  state: {
    user: '',
    posts: ''
  },
  actions: {
    signup ({commit}, key) {
      console.log('key', key)
      const userRef = firebase.database().ref(`users/${key}`);
      userRef.on('value', (snapshot) => {
        console.log('snapshot val', snapshot.val())
        commit('signup', snapshot.val())
      });
      // commit('signup', user)
    }
  },
  getters: {},
  mutations: {
    signup (state, user) {
      state.user = user
    }
  }
})

export default store
