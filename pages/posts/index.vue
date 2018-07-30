<template>
  <form>
    <div class="">
      {{$store.state.hoge}}
    </div>
    <v-text-field
      v-model="post.title"
      :error-messages="titleErrors"
      :counter="30"
      label="Title"
      required
      @input="$v.post.title.$touch()"
      @blur="$v.post.title.$touch()"
    ></v-text-field>
    <v-textarea
      v-model="post.content"
      :error-messages="contentErrors"
      :counter="100"
      label="Content"
      required
      @input="$v.post.content.$touch()"
      @blur="$v.post.content.$touch()"
    ></v-textarea>

    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      @vdropzone-file-added="setFileToData"
    ></vue-dropzone>

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
import { required, maxLength } from 'vuelidate/lib/validators'
import firebase from '~/plugins/firebase'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

 export default {
   mixins: [validationMixin],
   validations: {
     post: {
       title: { required, maxLength: maxLength(30) },
       content: { required, maxLength: maxLength(100) }
     },
     checkbox: { required }
   },
   components: {
     vueDropzone
   },
   data: () => ({
     post: {
       title: '',
       content: '',
       imageUrl: ''
     },
     checkbox: false,
     file: '',
     dropzoneOptions: {
          url: 'https://httpbin.org/post',
          thumbnailWidth: 150,
          maxFilesize: 0.5,
          addRemoveLinks: true,
          dictDefaultMessage: "UPLOAD ME",
          headers: { "My-Awesome-Header": "header value" }
     }
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
       if (!this.$v.post.title.$dirty) return errors
       !this.$v.post.title.maxLength && errors.push('Title must be at most 30 characters long')
       !this.$v.post.title.required && errors.push('Title is required.')
       return errors
     },
     contentErrors () {
       const errors = []
       if (!this.$v.post.content.$dirty) return errors
       !this.$v.post.content.required && errors.push('Content is required')
       return errors
     }
   },
   methods: {
     submit () {
       this.$v.$touch()
       let key = ''
       firebase.database()
               .ref('posts')
               .push(this.post)
               .then(data => {
                 key = data.key
                 return key
               })
               .then(key => {
                 return firebase.storage()
                                .ref(`posts/${key}/test.jpeg`)
                                .put(this.file);
               })
               .then(fileData => {
                 return firebase.storage()
                         .ref(fileData.metadata.fullPath)
                         .getDownloadURL()
                         .then(imageUrl => {
                           return firebase.database()
                                          .ref('posts')
                                          .child(key)
                                          .update({
                                            imageUrl
                                          })
                         })
               })
               .then(() => {
                 this.$swal({
                   title: "Good job!",
                   text: "view other posts",
                   icon: "success",
                 })
                 .then((data) => {
                   this.$router.push('/')
                 })
               })
               .catch(err => {
                 console.log(err)
               })
     },
     clear () {
       this.$v.$reset()
       this.post.title = ''
       this.files = []
       this.post.content = ''
       this.checkbox = false
       this.$refs.myVueDropzone.removeAllFiles(true)
     },
     setFileToData (file) {
       this.file = file
     }
   }
 }
</script>

<style lang="scss" scoped>
</style>
