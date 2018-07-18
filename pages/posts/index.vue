<template>
  <form>
    <v-text-field
      v-model="title"
      :error-messages="titleErrors"
      :counter="30"
      label="Title"
      required
      @input="$v.title.$touch()"
      @blur="$v.title.$touch()"
    ></v-text-field>
    <v-textarea
      v-model="content"
      :error-messages="contentErrors"
      :counter="100"
      label="Content"
      required
      @input="$v.content.$touch()"
      @blur="$v.content.$touch()"
    ></v-textarea>

    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn @click="submit">submit</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import firebase from 'firebase'
 export default {
   mixins: [validationMixin],
   validations: {
     title: { required, maxLength: maxLength(30) },
     content: { required, maxLength: maxLength(100) },
     checkbox: { required }
   },
   data: () => ({
     title: '',
     content: '',
     checkbox: false
   }),

   computed: {
     checkboxErrors () {
       const errors = []
       if (!this.$v.checkbox.$dirty) return errors
       !this.$v.checkbox.required && errors.push('You must agree to continue!')
       return errors
     },
     titleErrors () {
       const errors = []
       if (!this.$v.title.$dirty) return errors
       !this.$v.title.maxLength && errors.push('Title must be at most 30 characters long')
       !this.$v.title.required && errors.push('Title is required.')
       return errors
     },
     contentErrors () {
       const errors = []
       if (!this.$v.content.$dirty) return errors
       !this.$v.content.required && errors.push('Content is required')
       return errors
     }
   },
   created(){
     const config = {
       apiKey: "AIzaSyBAHazqLe44bJRe2DWXAKgD1EOQJz4I2e0",
       authDomain: "insta-clone-bbe24.firebaseapp.com",
       databaseURL: 'https://insta-clone-bbe24.firebaseio.com',
       projectId: "insta-clone-bbe24",
       storageBucket: "insta-clone-bbe24.appspot.com",
       messagingSenderId: "989920782530"
     }
     firebase.initializeApp(config)
   },
   methods: {
     submit () {

       this.$v.$touch()
       const post = {
         title: this.title,
         content: this.content
       }
       var postsRef = firebase.database().ref('posts')
       postsRef.push(post)
       // firebase.initializeApp({
       //   apiKey: "AIzaSyBAHazqLe44bJRe2DWXAKgD1EOQJz4I2e0",
       //   authDomain: "insta-clone-bbe24.firebaseapp.com",
       //   databaseURL: 'https://insta-clone-bbe24.firebaseio.com',
       //   projectId: "insta-clone-bbe24",
       //   storageBucket: "insta-clone-bbe24.appspot.com",
       //   messagingSenderId: "989920782530"
       // })
       // firebase.database().ref('posts').set(post)
     },
     clear () {
       this.$v.$reset()
       this.title = ''
       this.content = ''
       this.checkbox = false
     }
   }
 }
</script>

<style lang="scss" scoped>
</style>
