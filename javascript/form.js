const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerComponent = {
  template: '#registerTemplate',
  name: 'RegisterComponent',
  data() {
    return {
      user: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordChck: '' } };


  },
  computed: {
    isFormValid() {
      return (
        this.isValid('firstname') &&
        this.isValid('lastname') &&
        this.isValid('email') &&
        this.isValid('password') &&
        this.isValid('passwordChck'));

    } },

  methods: {
    isValid(prop) {
      switch (prop) {
        case 'firstname':
          return this.user.firstname.length >= 2;
          break;
        case 'lastname':
          return this.user.lastname.length >= 2;
          break;
        case 'email':
          return emailRegex.test(this.user.email);
          break;
        case 'password':
          return this.user.password.length >= 6;
          break;
        case "passwordChck":
          return this.user.password === this.user.passwordChck;
          break;
        default:
          return false;}

    },
    resetUser() {
      this.user.firstname = '';
      this.user.lastname = '';
      this.user.email = '';
      this.user.password = '';
      this.user.passwordChck = '';
    },
    onSubmit() {
      let user = Object.assign({}, this.user);
      this.resetUser();
      this.$emit('register-form', { type: 'register', data: user });
    } },

  mounted() {
    let element = this.$el.querySelector('#passwordcheck');
    element.addEventListener('blur', () => {
      if (!this.isValid('passwordChck')) {
        element.classList.add('invalid');
      } else {
        element.classList.remove('invalid');
      }
    });
  } };


const signInComponent = {
  template: '#signinTemplate',
  name: 'SigninComponent',
  data() {
    return {
      user: {
        email: '',
        password: '' } };


  },
  methods: {
    handleForm() {
      let formvalue = Object.assign({}, this.user);
      this.resetFormValues();
      this.$emit('signin-form', { type: 'signin', data: formvalue });
    },
    resetFormValues() {
      this.user.email = '';
      this.user.password = '';
    },
    isValid(prop) {
      switch (prop) {
        case 'email':
          return emailRegex.test(this.user.email);
          break;
        case 'password':
          return this.user.password.length >= 6;
          break;
        default:
          return false;}

    } },

  computed: {
    isFormValid() {
      return this.isValid('email') && this.isValid('password');
    } } };



const feedbackComponent = {
  template: '#feedbackTemplate',
  name: "FeedbackComponent",
  filters: {
    email(input) {
      if (input.email) {
        return input.email;
      } else {
        return '';
      }
    },
    name(input) {
      return input.firstname ? input.firstname : '';
    } },

  data() {return {};},
  props: ['feedback'],
  computed: {
    title() {
      return this.feedback.type === 'signin' ?
      'Authentification effectuée' : 'Inscription';
    } } };



const app = new Vue({
  el: '#app',
  components: {
    register: registerComponent,
    signin: signInComponent,
    feedback: feedbackComponent },

  name: 'application',
  data() {
    return {
      feedback: {},
      currentComponent: 'register' };

  },
  methods: {
    handleForm(data) {
      this.feedback = data;
      setTimeout(() => {
        this.setComponent('feedback');
      }, 280);
    },
    isDisabled(btnName) {
      return this.currentComponent === btnName;
    },
    setComponent(componentName) {
      if (this.currentComponent !== componentName) {
        this.currentComponent = componentName;
      }
    } } });