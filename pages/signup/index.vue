<template>
  <form>
    <v-text-field
      v-model="user.name"
      :error-messages="nameErrors"
      :counter="30"
      label="Name"
      required
      @input="$v.user.name.$touch()"
      @blur="$v.user.name.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :error-messages="emailErrors"
      :counter="100"
      label="Email"
      required
      @input="$v.user.email.$touch()"
      @blur="$v.user.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :error-messages="passwordErrors"
      :append-icon="show ? 'visibility_off' : 'visibility'"
      @input="$v.user.password.$touch()"
      @blur="$v.user.password.$touch()"
      :type="show ? 'text' : 'password'"
      label="password"
      hint="At least 6 characters"
      counter
      @click:append="show = !show"
    ></v-text-field>

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

    <v-btn @click="signup">Sign up</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email, sameAs, minLength } from 'vuelidate/lib/validators'
import firebase from '~/plugins/firebase'
import vueDropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

 export default {
   mixins: [validationMixin],
   validations: {
     user: {
       name: { required, maxLength: maxLength(30) },
       email: { required, email },
       password: {
        required,
        minLength: minLength(6)
       },
       repeatPassword: {
         sameAsPassword: sameAs('password')
       }
     },
     checkbox: { required }
   },
   components: {
     vueDropzone
   },
   data: () => ({
     show: false,
     user: {
       name: '',
       email: '',
       password: '',
       thumbnailUrl: ''
     },
     repeatPassword: '',
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
     nameErrors () {
       const errors = []
       if (!this.$v.user.name.$dirty) return errors
       !this.$v.user.name.maxLength && errors.push('Name must be at most 30 characters long')
       !this.$v.user.name.required && errors.push('Name is required.')
       return errors
     },
     emailErrors () {
        const errors = []
        if (!this.$v.user.email.$dirty) return errors
        !this.$v.user.email.email && errors.push('Must be valid e-mail')
        !this.$v.user.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.user.password.$dirty) return errors
        !this.$v.user.password.minLength && errors.push('Password must be at least 6 characters long')
        !this.$v.user.password.required && errors.push('Password is required.')
        return errors
      },
   },
   methods: {
     signup () {
       this.$v.$touch()

       firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
         .then(user => {
           let key = ''
           firebase.database()
                   .ref('users')
                   .push(this.user)
                   .then(data => {
                     key = data.key
                     return key
                   })
                   .then(key => {
                     return firebase.storage()
                                    .ref(`users/${key}/test.jpeg`)
                                    .put(this.file);
                   })
                   .then(fileData => {
                     return firebase.storage()
                             .ref(fileData.metadata.fullPath)
                             .getDownloadURL()
                             .then(thumbnailUrl => {
                               this.user.thumbnailUrl = thumbnailUrl
                               return firebase.database()
                                              .ref('users')
                                              .child(key)
                                              .update({
                                                thumbnailUrl
                                              })
                             })
                   })
                   .then(() => {
                     // console.log('with this',this.$store.state.user)
                     this.$store.dispatch('signup', key);
                     this.$swal({
                       title: "Signed up!",
                       text: "thank you sign up",
                       icon: "success",
                     })
                     .then((data) => {
                       this.$router.push('/')
                     })
                   })
                   .catch(err => {
                     console.log(err)
                   })
         })
         .catch(error => {
           console.log(error)
           alert(error.message)
         })
     },
     clear () {
       this.$v.$reset()
       this.user.name = ''
       this.files = []
       this.user.email = ''
       this.user.password = ''
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
