<template>
  <v-app light>
      <v-content>
        <v-container>
          <v-layout row wrap align-center>

            <template v-if="$store.state.user">
              <v-flex xs12 md4>
                <div class="text-xs-center">
                  <v-avatar size="125px">
                    <img
                      class="img-circle elevation-7 mb-1"
                      :src="$store.state.user.thumbnailUrl"
                    >
                  </v-avatar>
                  <div class="headline"><span style="font-weight:bold">{{$store.state.user.name}}</span></div>
                  <div class="subheading text-xs-center grey--text pt-1 pb-3">Lorem ipsum dolor sit amet</div>
                  <v-layout justify-space-between>
                    <a href="javascript:;" class="body-2">Home</a>
                    <a href="javascript:;" class="body-2">About</a>
                    <a href="javascript:;" class="body-2">Github</a>
                    <a href="javascript:;" class="body-2">Other</a>
                  </v-layout>
                </div>
              </v-flex>
            </template>



            <v-flex xs12 md5 offset-md2>
              <div v-for="(post, index) in posts" :key="index">
                <v-card class="my-3" hover>
                  <v-card-media
                    class="white--text"
                    height="170px"
                    :src="post.imageUrl"
                  >
                    <!-- <v-container fill-height fluid>
                      <v-layout>
                        <v-flex xs12 align-end d-flex>
                          <span class="headline">{{ post.title }}</span>
                        </v-flex>
                      </v-layout>
                    </v-container> -->
                  </v-card-media>
                  <v-container fill-height fluid>
                    <v-layout>
                      <v-flex xs12 align-end d-flex>
                        <span class="headline">{{ post.title }}</span>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <v-card-text>
                    {{ post.content }}
                  </v-card-text>
                  <v-card-actions>
                    <v-btn icon class="red--text">
                      <v-icon medium>fa-reddit</v-icon>
                    </v-btn>
                    <v-btn icon class="light-blue--text">
                      <v-icon medium>fa-twitter</v-icon>
                    </v-btn>
                    <v-btn icon class="blue--text text--darken-4">
                      <v-icon medium>fa-facebook</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn flat class="blue--text">Read More</v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer class="secondary" app>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Vuetify</a>
              and <a class="white--text" href="https://github.com/vwxyzjn" target="_blank">Costa Huang</a>
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-app>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  created(){
    const firebaseDatabase = firebase.database()
    firebaseDatabase.ref('posts/').on('value', (snapshot) => {
      this.posts = snapshot.val()
    })
  },
  computed: {

  },
  methods: {

  },
  data () {
      return {
        title: 'Your Logo',
        posts: []
      }
    }
}
</script>
