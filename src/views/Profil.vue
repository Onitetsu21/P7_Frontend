/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
<template>
  <div id="body">
    <Header />
    <div id="profil">
      <h1>Gestion de profil</h1>
      <div id="name">
        <label for="name">Changer de nom d'utilisateur :</label>
        <input title="name"  v-model="user.name" placeholder="Nom" />
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
        <button id="updateprofil" v-on:click="modifyProfil">Sauvegarder les modifications</button>
        <button id="deleteprofil" v-on:click="deleteProfil">Supprimer le compte</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UserDataService from "../services/UserDataService";
export default {
  name: "Profil",
  data: function() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
    };
  },

  components: {
    Header
  },

  methods: {
    deleteProfil(){
      let userId = JSON.parse(localStorage.getItem("userLog"))
      
      UserDataService.delete(userId.id)
      .then(response =>{
        console.log(response);
        localStorage.clear();
        window.alert("Utilisateur supprimé!")
        this.$router.push("/")
        
      })
      .catch(e =>{
        console.log(e);
      });  
    },

    modifyProfil(){
      let userId = JSON.parse(localStorage.getItem("userLog"))
      if(!this.user.name){
        this.user.name = userId.name
      }
      if(!this.user.email){
        this.user.email = userId.email
      }
      if(!this.user.password){
        this.user.password = userId.password
      }
      console.log(userId.id)
      UserDataService.update(userId.id, this.user)
      .then(response =>{
          this.user = {}
          console.log(response);
          window.alert("Votre profil à été mis à jour!")
          this.$router.push("/forum")
        })
        .catch(e =>{
          console.log(e);
      })
    },
  },
}
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

#email, #psw, #name {
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

@media all and (max-width: 499px){
  #email, #psw, #name {
    margin: 10px 0 0 0;
    max-width: 93%;
  }
}
</style>