/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
<template>
  <div id="body">
    <Header />

    <div id="profil">
      <div id="popup" v-if="displayPopup">
        <label for="confirmPassInput">Confirmé le password</label>
        <input class="confirmPassInput" title="password" type="password" v-model="oldPassword" />
        <button class="confirmPassButton" @click="confirmPassword">Valider</button>
      </div>
      <h1>Gestion de profil</h1>
      <div id="name">
        <label for="name">Changer de nom d'utilisateur :</label>
        <input title="name" v-model="user.name" placeholder="Nom" />
      </div>
      <div id="email">
        <label for="email">Changer d'email :</label>
        <input title="email" type="email" v-model="user.email" placeholder="Email" />
      </div>
      <div id="psw">
        <label for="psw">Changer de mot de passe :</label>
        <input title="password" type="password" v-model="user.password" placeholder="Mot de passe" />
      </div>
      <div id="profilButtons">
        <button id="updateprofil" v-on:click="openPopup">Sauvegarder les modifications</button>
        <button id="deleteprofil" v-on:click="openPopup">Supprimer le compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UserDataService from "../services/UserDataService";
export default {
  name: "Profil",
  data: function () {
    return {
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
      },
      oldPassword: "",
      displayPopup: false,
      action: null,
    };
  },

  components: {
    Header,
  },

  methods: {
    deleteProfil() {
      let userId = JSON.parse(localStorage.getItem("userLog"));

      UserDataService.delete(userId.id)
        .then((response) => {
          console.log(response);
          localStorage.clear();
          window.alert("Utilisateur supprimé!");
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    validateEmail(email) {
      return /\b[\w]+@[\w]+\.\w{2,4}\b/gi.test(String(email).toLowerCase());
    },
    validatePassword(psd) {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gi.test(
        String(psd)
      );
    },

    openPopup(evt) {
      console.log("evt===>", evt);
      this.displayPopup = true;
      this.action = evt.target.id;
    },

    confirmPassword() {
      let userId = JSON.parse(localStorage.getItem("userLog")).id;

      let data = { password: this.oldPassword, userId };

      UserDataService.confirmPassword(data)
        .then((result) => {
          if (this.action == "updateprofil") {
            this.modifyProfil();
          } else if (this.action == "deleteprofil") {
            this.deleteProfil();
          }
          console.log(result);
          this.displayPopup = false;
        })
        .catch((err) => {
          console.log(err);
          console.log(JSON.parse(localStorage.getItem("userLog")));
          this.displayPopup = false;
        });
    },

    modifyProfil() {
      if (!this.user.email || this.validateEmail(this.user.email) == true) {
        if (
          !this.user.password ||
          this.validatePassword(this.user.password) == true
        ) {
          let userId = JSON.parse(localStorage.getItem("userLog"));
          let changePassword = false;
          if (!this.user.name) {
            this.user.name = userId.name;
          }
          if (!this.user.email) {
            this.user.email = userId.email;
          }
          if (!this.user.password) {
            this.user.password = userId.password;
            changePassword = false;
          } else if (this.user.password) {
            changePassword = true;
          }
          this.user.changePassword = changePassword;
          this.user.id = userId.id;
          this.user.token = userId.token;
          this.user.admin = userId.admin;
          UserDataService.update(userId.id, this.user)
            .then((response) => {
              console.log(response);

              localStorage.setItem("userLog", JSON.stringify(this.user));
              window.alert("Votre profil à été mis à jour!");
              this.user = {};
              this.$router.push("/forum");
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          window.alert(
            "Veuillez rentrer un mot de passe contenant au moins: 8 charactères, une lettre, un chiffre et un charactère spécial"
          );
        }
      } else {
        window.alert("Veuillez rentrer une adresse mail valide");
      }
    },
  },
};
</script>

<style scoped>
#profil {
  max-width: 510px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 50px auto auto auto;
}

#profilButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

#connexion {
  background-color: #091f43;
  margin: auto;
  max-width: 250px;
}

button {
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #091f0000;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  margin: 10px 5px auto 2.5px;
  font-family: Retroica;
  font-size: 1rem;
}

#updateprofil {
  background-color: #818d1d;
}
#deleteprofil {
  background-color: #570322;
}

#email,
#psw,
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

#popup {
  position: fixed;
  background: white;
  color: black;
  z-index: 10;
  width: 350px;
  height: 120px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  display: flex;
  margin: 250px auto auto 90px;
  border: 1px solid black;
}
.confirmPassButton {
  color: white;
  background-color: #091f43;
}

.confirmPassInput {
  max-width: 90%;
}
@media all and (max-width: 499px) {
  #email,
  #psw,
  #name {
    margin: 10px 0 0 0;
    max-width: 93%;
  }

  #popup {
    margin: 250px auto auto 22.5px;
    width: 300px;
  }
}
</style>