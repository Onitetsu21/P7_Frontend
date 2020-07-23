<template>
  <div id="body">
    <Header />
    <div id="auth" aria-labelledby="signupTitle"  aria-describedby="email password" >
      <div id="signinSection">
        <h2>Si vous n'avez pas encore de compte Groupaniac, inscrivez-vous!</h2>
        <button id="signinButton" @click="signinButton">S'inscrire</button>
      </div>
      <h1 id="signupTitle">Veuillez vous identifier pour rejoindre le GroupomaChat</h1>
      <div
        id="conFailed"
        v-if="this.conFailed == 1"
      >Anthentification échouée! Les informations remplies ne sont pas valides</div>
      <div id="email">
        <label for="email">Email :</label>
        <input title="email" v-model="user.email" placeholder="Email" />
      </div>
      <div id="password">
        <label for="password">Mot de passe :</label>
        <input title="password" type="password" v-model="user.password" placeholder="Mot de passe" />
      </div>
      <div class="button" id="connexion" @click="loginUser">Connexion au GroupomaChat!</div>
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
      user: {
        id: "",
        name: "",
        email: "",
        password: ""
      },
      logedUser: {
        id: "",
        name: "",
        email: "",
        password: ""
      },
      conFailed: {
        type: Boolean,
        default: false
      },
      userId: {
        type: Number
      },
      isAuth: {
        type: Boolean,
        default: false
      }
    };
  },

  components: {
    Header
  },


  methods: {
    userLog() {
      let userLogin = JSON.parse(localStorage.getItem("userLog"));
      console.log(userLogin);
    },

    loginUser() {
      var data = {
        userId: this.userId,
        email: this.user.email,
        password: this.user.password
      };
      UserDataService.login(data)
        .then(response => {
          this.conFailed = 0;
          const res = response;
          this.logedUser.id = res.data.user.id;
          this.logedUser.name = res.data.user.name;
          this.logedUser.email = res.data.user.email;
          this.logedUser.password = res.data.user.password;
          this.logedUser.admin = res.data.user.admin;
          this.logedUser.token = res.data.token;

          localStorage.setItem(
            "access_token",
            JSON.stringify(this.logedUser.token)
          );

          localStorage.setItem("userLog", JSON.stringify(this.logedUser));
          console.log("Authentification réussie");
          this.$router.push("/forum");
        })
        .catch(e => {
          this.conFailed = 1;

          console.log(e);
          console.log("Erreur d'authentification");
        });
    },

    signinButton() {
      this.$router.push("signin");
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: Retroica;
  src: url(../assets/polices/Retroica.ttf);
}

#auth {
  max-width: 510px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
}

#authButtons {
  display: flex;
  flex-direction: column;
}

#connexion {
  background-color: #091f43;
  padding: 5px 5px 5px 5px;
  cursor: pointer;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  margin: 25px auto 25px auto;
  font-family: Retroica;
  font-size: 1.5rem;
}

#signinSection {
  display: flex;
  flex-direction: column;
}

#signinButton {
  background-color: #091f43;
  margin: auto;
}

#email {
  margin: 10px;
}

#password {
  margin: 10px;
}

#signupTitle {
  text-align: center;
  max-width: 500px;
  color: #091f43;
  font-family: Retroica;
  font-size: 2rem;
  margin: 50px auto 50px auto;
}

h2 {
  text-align: center;
  max-width: 500px;
  color: #091f43;
  font-family: Retroica;
  font-size: 2rem;
  font-size: 1.5rem;
  margin: 50px auto 25px auto;
}

@media all and (max-width: 599px) {
  #email,
  #password,
  #name {
    margin: 10px 0 0 0;
    max-width: 93%;
  }
}
</style>