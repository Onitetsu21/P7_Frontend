<template>
  <div class="posted">
    <div class="topPosted">
      <div class="postUsername">{{currentPost.userName}}</div>
    </div>
    <div class="posted_bloc">{{ currentPost.content }}</div>
    <div class="createdAt">{{currentPost.createdAt}}</div>
    <button class="detailPost" @click="detailPost">DETAILS ET COMMENTAIRES</button>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
export default {
  name: "Posted",
  data() {
    return {
      currentPost: {},
      currentIndex: -1,
      message: "",
    };
  },

  props: {
    post: {
      type: Object,
      content: "",
      userId: null,
      userName: "",
    },
  },

  methods: {
    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          console.log("response.data",response.data[0].updatedAt)
          this.currentPost = response.data[0];
          if(response.data[0].updatedAt != response.data[0].createdAt){
            this.currentPost.createdAt = response.data[0].updatedAt
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    detailPost() {
      let postId = this.post.id;
      this.$router.push({ path: `/posts/${postId}` });
    },
  },

  mounted() {
    this.getPost(this.post.id);
  },
};
</script>

<style >
.deletePost {
  background-color: red;
}

.modifyPost {
  background-color: rgb(255, 196, 0);
}

.posted_bloc {
  background-color: white;
  color: black;
  padding: 10px;
  border-radius: 5px;
  text-overflow: clip;
  overflow-wrap: break-word;
  text-overflow: "…";
}

.detailPost {
  background-color: white;
  color: #091f43;
  border-radius: 5px;
  margin: 10px auto auto auto;
}

.topPosted {
  display: flex;
  flex-direction: row;
  font-size: 1.2rem;
  border-radius: 50px;
  font-family: Retroica;
  color: white;
  margin: auto auto 5px 1px;
}

.createdAt {
  text-align: right;
}
</style>