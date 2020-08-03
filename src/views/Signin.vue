/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
<template>
  <div id="body">
    <Header />
    <div
      id="auth"
      aria-labelledby="signinTitle"
      aria-describedby="name email password"
    >
      <h1 id="signinTitle">
        Veuillez vous identifier pour rejoindre le GroupomaChat
      </h1>
      <div id="name">
        <label for="name">Nom d'utilisateur</label>
        <input
          title="name"
          v-model="newUser.name"
          placeholder="Nom d'utilisateur"
        />
      </div>
      <div id="email">
        <label for="email">Email :</label>
        <input
          title="email"
          type="email"
          v-model="newUser.email"
          placeholder="Email"
        />
      </div>
      <div id="password">
        <label for="password">Mot de passe :</label>
        <input
          title="password"
          type="password"
          v-model="newUser.password"
          placeholder="Mot de passe"
        />
      </div>
      <div id="connexion" @click="signin">S'inscrire au groupomaChat!</div>
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
      newUser: [],
      name: "",
      email: "",
      password: "",
    };
  },

  components: {
    Header,
  },

  methods: {
    validateEmail(email) {
      return /\b[\w]+@[\w]+\.\w{2,4}\b/gi.test(String(email).toLowerCase());
    },
    validatePassword(password){
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi.test(String(password))
    },

    signin() {
      if (this.validateEmail(this.newUser.email) == true && this.validatePassword(this.newUser.password) == true) {
        var data = {
          name: this.newUser.name,
          email: this.newUser.email,
          password: this.newUser.password,
        };

        UserDataService.create(data)
          .then((response) => {
            this.newUser.id = response.data.id;
            console.log(response.data);
            window.alert(
              "Votre inscription est validé, vous pouvez désormais vous connecter!"
            );
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
            window.alert(
              "Veuillez remplir le formulaire avec un email non existant"
            );
          });
      } else {
        window.alert("Veuillez rentrer une adresse mail valide, et un mot de passe contenant au moins: 8 charactères, une lettre, un chiffre et un charactère spécial");
      }
    },
  },
};
</script>

<style>
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

#email,
#password,
#name {
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

@media all and (max-width: 499px) {
  #auth {
    margin: auto;
  }
  #email,
#password,
#name {
  margin: 10px auto auto 1px;
  width: 90vw;
}
}
</style>
