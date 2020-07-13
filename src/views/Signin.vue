<template>
  <div id="body">
    <Header />
    <div id="auth">
      <h1 id="signinTitle">Veuillez vous identifier pour rejoindre le GroupomaChat</h1>
      <div id="name">
        <label for="email">Nom d'utilisateur</label>
        <input v-model="newUser.name" placeholder="Nom d'utilisateur" />
      </div>
      <div id="email">
        <label for="email">Email :</label>
        <input type="email" v-model="newUser.email" placeholder="Email" />
      </div>
      <div id="password">
        <label for="password">Mot de passe :</label>
        <input type="password" v-model="newUser.password" placeholder="Mot de passe" />
      </div>
      <div id="connexion" @click="signin"> S'inscrire au groupomaChat! </div>
      
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import UserDataService from "../services/UserDataService";
export default {
  name: "Auth",
  data: function() {
    return {
      newUser:[],
      name:"",
      email: "",
      password: ""
    };
  },
  props: {},
  components: {
    Header
    // Forum
  },
  methods: {
    validateEmail(email) {
      // const re = (/\b[\w]+@[\w]+\.\w{2,4}\b/gi); 
      return (/\b[\w]+@[\w]+\.\w{2,4}\b/gi).test(String(email).toLowerCase());
    },
    signin() {
      console.log(this.email)
      console.log(this.validateEmail(this.newUser.email))
      if(this.validateEmail(this.newUser.email) == true){
        
      var data =  {
        name: this.newUser.name,
        email: this.newUser.email,
        password: this.newUser.password
      };
      UserDataService.create(data)
      .then(response => {
        this.newUser.id = response.data.id;
        console.log(response.data)
        this.$router.push("/")
      })
      .catch(e => {
        console.log(e);
      });

      }else{
        window.alert("Veuillez rentrer une adresse mail valide!")
      }
        
      
      
    }

  }
};
</script>


<style >
@font-face {
  font-family: Retroica;
  src: url(../assets/polices/Retroica.ttf);
}
#auth {
  max-width: 510px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 50px auto auto auto;
}

#authButtons {
  display: flex;
  flex-direction: column;
}

#connexion {
  background-color: #091f43;
  margin: auto;
  max-width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
  cursor: pointer;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  margin: auto 5px auto 10px;
  font-family: Retroica;
  font-size: 1.3rem;
  text-align: center;
}



#email, #password, #name {
  margin: 10px;
}


h1 {
  text-align: center;
  max-width: 500px;
  margin: 150px auto 50px auto;
  color: #091f43;
  font-family: Retroica;
  font-size: 2rem;
}

input {
  width: 100%;
  max-width: 494px;
}

#signinTitle {
  text-align: center;
  max-width: 500px;
  margin: 150px auto 50px auto;
  color: #091f43;
  font-family: Retroica;
  font-size: 2rem;
}
</style>