<template>
  <div class="posted">
    <div class="topPosted">
      <div class="postUsername">{{post.userName}}</div>
    </div>
    <div class="posted_bloc">{{ post.content }}</div>
    <div class="createdAt">{{post.createdAt}}</div>
    <button class="detailPost" @click="detailPost">DETAILS ET COMMENTAIRES</button>
  </div>
</template>

<script>
import PostDataService from "../services/PostDataService";
export default {
  name: "Posted",
  data() {
    return {
      currentPost: null,
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

  created() {
    this.access();
  },

  methods: {
    access() {
      if (!JSON.parse(localStorage.getItem("userLog"))) {
        this.$router.push("/");
      }
    },

    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.currentPost = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    detailPost() {
      let postId = this.post.id;
      console.log("postId ====>", postId);
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