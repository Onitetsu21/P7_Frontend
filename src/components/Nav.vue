<template>
  <div id="navButton">
    <router-link to="/signin" v-if="navDtAuth == true" class="headerButton">S'inscrire</router-link>
    <router-link to="/login" v-if="navDtAuth == true" class="headerButton">Authentification</router-link>
    <router-link to="/forum" v-if="navAuth == true" class="headerButton">Forum</router-link>
    <router-link to="/profil" v-if="navAuth == true" class="headerButton">Profil</router-link>
    <router-link to="/admin" v-if="adminCheck == true" class="headerButton">Admin</router-link>
    <div to="/" v-if="navAuth == true" class="headerButton" @click="deconnect">Se déconnecter</div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data: function() {
    return {
      links: [],
      link: "",
      page: "",
      navAuth: {
        type: Boolean,
        default: false
      },
      navDtAuth: {
        type: Boolean,
        default: false
      },
      adminCheck: {
        type: Boolean,
        default: false
      }
    };
  },

  props: {
    authPage: {
      type: Boolean,
      default: true
    },
    forumPage: {
      type: Boolean,
      default: true
    },
    profilPage: {
      type: Boolean,
      default: true
    }
  },

  mounted() {
    let userLoged = ""
    if(JSON.parse(localStorage.getItem("userLog"))){
      userLoged = JSON.parse(localStorage.getItem("userLog"));
    }
    this.navDynamic(userLoged);
      this.adminMode(userLoged);
  },

  methods: {
    adminMode(userLog) {
      if (userLog.admin && userLog.admin == true) {
        this.adminCheck = true;
      }
    },

    userLog() {
      return JSON.parse(localStorage.getItem("userLog"));
    },

    deconnect() {
      localStorage.clear();
      try {
        this.$router.push("/");
        this.adminCheck = 0;
      } catch {
        console.log("Veuillez vous connecter");
      }
    },

    navDynamic(loged) {
      if (!loged) {
        this.navAuth = false;
        this.navDtAuth = true;
      } else {
        this.navAuth = true;
        this.navDtAuth = false;
      }
    }
  }
};
</script>

<style scoped>
.headerButton {
  background-color: #091f0000;
  color: white;
  

  font-family: Retroica;
  margin-right: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.navButton {
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>