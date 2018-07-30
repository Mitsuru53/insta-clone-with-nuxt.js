<template>
  <form>
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

    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Do you agree?"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>

    <v-btn @click="login">Login</v-btn>
    <v-btn @click="clear">clear</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email, minLength } from 'vuelidate/lib/validators'
import firebase from '~/plugins/firebase'

 export default {
   mixins: [validationMixin],
   validations: {
     user: {
       email: { required, email },
       password: {
        required,
        minLength: minLength(6)
       }
     },
     checkbox: { required }
   },
   data: () => ({
     show: false,
     user: {
       email: '',
       password: '',
     },
     checkbox: false,
   }),
   computed: {
     checkboxErrors () {
       const errors = []
       if (!this.$v.checkbox.$dirty) return errors
       !this.$v.checkbox.required && errors.push('You must agree to continue!')
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
     login () {
       this.$v.$touch()
       firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
         .then(user => {
           console.log(user)
           this.$swal({
             title: "Logged In!",
             text: "welcome back",
             icon: "success",
           })
           .then((data) => {
             this.$router.push('/')
           })
         })
         .catch(error => {
           console.log(error)
           alert(error.message)
         })
     },
     clear () {
       this.$v.$reset()
       this.user.email = ''
       this.user.password = ''
       this.checkbox = false
     }
   }
 }
</script>

<style lang="scss" scoped>
</style>
