<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/forum">Forum</router-link>|
      <router-link to="/profil">Profil</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  name:"app",
  created(){
    document.title = "GroupomaChat"
    

    // document.querySelector("link[rel='stylesheet']").setAttribute("href", "path/to/font-awesome/css/font-awesome.min.css")
  }
}
</script>
<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  top: 0px;
  left: 0px;
}
a:link {
  text-decoration: none;
}
a:visited {
  color: white;
}

button, .button {
  margin: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #091f0000;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  /* margin: auto 5px auto 2.5px; */
  font-family: Retroica;
  font-size: 1rem;
  
}


button:hover, .button:hover{
  scale: 1.1;
  /* border: 1px solid rgba(255, 255, 255, 0.514); */
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

input, textarea {
  padding: 10px;
  margin: 5px auto 5px auto;
  border-radius: 5px;
  border: 1px solid grey;
  font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  height: 20px;
  transition: ease-in-out;
  transition-duration: 0.3s;
  max-width: 100%;
}

textarea:focus{
  border: 1px solid black;
  height: 70px;
  transition: ease-in-out;
  transition-duration: 0.3s;
  
}

input:hover {
  border: 1px solid black;
  
}

@media all and (max-width: 500px){
  input, textarea {
    width: 400px;
    
    
  }
  
}
</style>
