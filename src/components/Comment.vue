<template>
  <div class="comment">
    <div class="comment-top">{{comment.userName}}</div>
    <div class="comment-content">
      <div class="comment_bloc">{{ comment.content }}</div>
    </div>
    <div class="createdAt">{{ comment.createdAt }}</div>
    <div class="comment_button">
      <button
        class="deleteComment"
        v-if="currentUser.admin == 1 || currentUser.name == comment.userName"
        @click="deleteComment"
      >Supprimer</button>
      <button
        class="modifyComment"
        v-if="currentUser.admin == 1 || currentUser.name == comment.userName"
        @click="modifyComment"
      >Modifier</button>
    </div>
  </div>
</template>

<script>
import CommentDataService from "../services/CommentDataService";
export default {
  name: "Comment",
  data() {
    return {
      currentUser: {},
      currentComment: null,
      message: "",
    };
  },

  props: {
    comment: {
      type: Object,
      content: "",
      userId: null,
      userName: "",
    },
  },

  mounted() {
    this.getComment(this.comment.id);
    this.getCurrentUser();
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

    getCurrentUser() {
      let userLog = JSON.parse(localStorage.getItem("userLog"));
      this.currentUser = userLog;
    },

    getComment(id) {
      CommentDataService.get(id)
        .then((response) => {
          this.currentComment = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteComment() {
      CommentDataService.delete(this.comment.id)
        .then((response) => {
          console.log(response.data);
          window.alert("Votre commentaire a été supprimé !");
          this.$router.push("/forum");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modifyComment() {
      var msgModify = prompt("Modifier le Comment :");
      this.comment.content = msgModify;
      CommentDataService.update(this.comment.id, this.comment)
        .then((response) => {
          window.alert("Votre commentaire a été modifié !");
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style  >
.deleteComment {
  background-color: red;
}

.modifyComment {
  background-color: rgb(255, 196, 0);
}

.comment {
  display: flex;
  flex-direction: column;
  min-width: 100px;
  background-color: grey;
  border: 1px solid #091f43;
  color: white;
  border-radius: 5px;
  max-width: 500px;
  width: 100%;
  padding: 10px;
}

.comment-top {
  border-radius: 50px;
  font-family: Retroica;
  color: white;
  margin: auto auto auto 15px;
}

.comment_bloc {
  background-color: white;
  padding: 5px;
  margin: 5px;
  color: black;
  border-radius: 5px;
  text-overflow: clip;
  overflow-wrap: break-word;
  text-overflow: "…";
}

.createdAt {
  margin: 1px;
}

.comment_button {
  display: flex;
  margin: auto;
}
</style>