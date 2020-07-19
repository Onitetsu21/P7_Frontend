<template>
  <div>
    <header>
      <div id="titleLogo">
        <img id="logoGcs" src="@/assets/images/icon-white.png" alt />
        <p id="title">GroupomaChat</p>
      </div>
      <Nav />
    </header>
  </div>  
</template>

<script>
  import Nav from "@/components/Nav.vue";
  export default {
    name: "Header",
    components: {
      Nav
    }
  };
</script>

<style>
@media all and (max-width: 600px){
   #title {
    font-size: 25px;
    margin: 15px auto 5px auto;
  }

  #logoGcs {
    display: none;
  }

  header{
    flex-direction: column;
    justify-items: start;
  }

  .headerButton {
    margin: 5px 20px 5px 20px;
  }

  #navButton {
    display: flex;
    flex-direction: row;
  }
  
}

@media all and (min-width: 600px){
  #title {
    font-size: 45px;
    margin: 15px auto 5px auto;
    
  }
}

#titleLogo {
  display: flex;
  margin: auto 5px auto 5px;
}

header {
  background-color: #091f43;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;
  top: 0px;
  align-items: center;
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  z-index: 9999999;
  position: fixed;
  color: white;
  font-family: Retroica;
}

@media all and (max-width:1000px){
  header {
    left:0px;
  }
}

#logoGcs {
  width: 75px;
  height: 75px;
}
</style>