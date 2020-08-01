<template>
  <div class="posted">
    <div class="topPosted">
      <div class="postUsername">{{post.userName}}</div>
    </div>
    <div class="posted_bloc">{{ post.content }}</div>
    <div class="createdAt">{{post.createdAt}}</div>
    <div id="postEdit">
      <button class="deletePost" @click="deletePost">Supprimer</button>
      <button class="modifyPost" @click="modifyPost">Modifier</button>
    </div>
    <div class="comments_bloc">
      <Comment
        class="comment"
        :class="{ active: index == currentIndex }"
        v-for="(comment, index) in comments"
        :key="index"
        :comment="comment"
        @click="refreshList"
      />
    </div>
  </div>
</template>

<script>
import Comment from "@/components/Comment.vue";
import PostDataService from "../services/PostDataService";
import CommentDataService from "../services/CommentDataService";
export default {
  name: "Postedreview",
  data() {
    return {
      currentPost: null,
      currentIndex: -1,
      message: "",
      comments: [],
      comment: [],
      comment_display: null,
      currentComment: null,
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

    deletePost() {
      PostDataService.delete(this.post.id)
        .then((response) => {
          console.log(response);
          document.location.reload(true);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modifyPost() {
      var msgModify = prompt("Modifier le post :");
      this.post.content = msgModify;
      PostDataService.update(this.post.id, this.post)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
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
      this.$router.push({ path: `/posts/${postId}` });
    },

    refreshList() {
      this.retrieveComments(this.post.id);
      this.currentComment = null;
      this.currentIndex = -1;
      this.comment_display = 1;
    },

    retrieveComments(postId) {
      CommentDataService.getAll(postId)
        .then((response) => {
          this.comments = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setActiveComment(comment, index) {
      this.currentComment = comment;
      this.currentIndex = index;
    },
  },

  mounted() {
    this.comment_ = [...this.comment];
    this.refreshList();
    this.getPost();
  },

  components: {
    Comment,
  },
};
</script>

<style >
#postEdit {
  display: flex;
  margin: auto;
}

.deletePost {
  background-color: red;
  margin: auto;
}

.modifyPost {
  background-color: rgb(255, 196, 0);
  margin: auto;
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