/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
<template>
  <div id="body">
    <Header />
    <div id="forumApp">
      
      
      <!-- <button class="refreshButton" v-on:click="refreshList">Rafraichir le forum</button> -->
      <div id="forum">
        <Postedreview :class="{ active: index == currentIndex }" v-for="(post, index) in posts" v-bind:post="post" v-bind:key="index" @hover="setActivePost(post, index)"  />
      </div>

    </div>
  </div>
</template>

<script>
import Postedreview from "@/components/Postedreview.vue"
import Header from "@/components/Header.vue";
import PostDataService from "../services/PostDataService";

export default {
  name: "Forumreview",
  data: function() {
    return {
      posts:[],
      currentPost: null,
      currentIndex: -1,
      post: [],
      message: "",
      userId: {
        type: Number
      }
    };
  },
  mounted() {
        this.refreshList();
       
        
    },

  methods: {

  
    
    retrievePosts() {
      PostDataService.getAll()
        .then(response => {

          this.posts = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    
    refreshList() {
      this.retrievePosts();
      this.currentPost = null;
      this.currentIndex = -1;
    },

    setActivePost(post, index) {
      this.currentPost = post;
      this.currentIndex = index;
      localStorage.setItem("currentPost", JSON.stringyfy(this.currentPost))
      console.log("JSON.parse(localStorage.getItem('currentPost')) ===>", JSON.parse(localStorage.getItem("currentPost")))
      console.log("this.currentPost =====>", this.currentPost)
    },


  },
  components: {
    
    Header,
    Postedreview
    // Emoji: VueChatEmoji
  }
};



</script>

<style>
@keyframes postDetailMove {
  from {

    opacity : 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    
    
  }
}
.emo{
  
  
  margin: 1.5px;
}
i {
  width: 20px;
}

#publishSection_emos{
  display: flex;
  flex-direction: row;
  margin: auto;
  max-width: 500px;
  position: relative;
  
}

.displayEmo {
  display: none;
  flex-direction: row;
  
}


#forumApp {
  margin: auto;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
#forum {
  display: flex;
  flex-direction: column-reverse;
  justify-content: left;
  margin: auto;
}
#publishButton {
  background-color: #091f43;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  font-family: Retroica;
}


#publishContent { 
  width: 100%;
}

#publishSection_top {
  display: flex;
  flex-direction: row;
  margin: auto;
  max-height: 200px;
  width: 500px;
  
}

.refreshButton {
  background-color: #091f43;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  margin: 30px auto auto auto;
  font-family: Retroica;
}

.headerButton {
  background-color: #091f0000;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  font-family: Retroica;
  margin-right: 5px;
  font-size: 1rem;
}




h3{
  font-family: Retroica;
  color: #091f43;
}
@media all and (max-width: 499px){

  #publishSection_emos{
  display: block;
  margin-left: 10px;
}

  #publishSection{
    display: flex;
    flex-direction: column;
    max-width: 100%;
  }
  .PostDetail {
  margin: 10px auto auto auto;  
  animation: postDetailMove;
  animation-duration: 0.5s;
  transition-timing-function: ease-in-out;

  display: flex;
  flex-direction: column;
  
  min-width: 100px;
  background-color: #091f43;
  min-height: 90px;
  border: 1px solid #091f43;
  color: white;
  border-radius: 5px;
  max-width: 300px;
  padding: 10px;
  text-align: left;


  }

.refreshButton {
  background-color: #091f43;
  color: white;
  border: 1px solid #091f4342;
  border-radius: 5px;
  margin: 30px auto auto auto;
  font-family: Retroica;
}



#publishContent{
  max-width: 80%;
  left: 0px;
  padding: 10px 0 10px 0;
}
#publishSection_top {
  display: flex;
  flex-direction: row;
  margin: auto;
  max-height: 200px;
  width: 95%;
  
}

}

@media all and (min-width: 500px){

.PostDetail {
  animation: postDetailMove;
  animation-duration: 1s;
  transition-timing-function: ease-in-out;

  display: flex;
  flex-direction: column;
  margin-top: 30px;
  min-width: 100px;
  background-color: #091f43;
  /* min-height: 90px; */
  border: 1px solid #091f43;
  color: white;
  border-radius: 5px;
  max-width: 480px;
  padding: 10px;
  text-align: left;
  overflow: clip ellipsis;
  overflow: "…" "…";
  overflow: fade clip;
  overflow: fade(10px) fade(10px);
  overflow: fade(5%) fade(5%);
}
.createdAt {
  
  margin: auto 0px auto auto;
}



}
</style>