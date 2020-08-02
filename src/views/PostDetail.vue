<template>
  <div id="body">
    <Header />
    <div class="postDetail">
      <router-link to="/forum" class="backToForum button">Retourner au forum</router-link>
      <div class="posted">
        <div class="post-userName">{{postDetail.userName}}</div>
        <div class="posted_bloc">{{ postDetail.content }}</div>
        <div type="date" class="createdAt">{{postDetail.createdAt}}</div>
        <div class="posted_button">
          <button
            class="deletePost"
            v-if="currentUser.admin == 1 || currentUser.id == postDetail.userId"
            @click="deletePost"
          >Supprimer</button>
          <button
            class="modifyPost"
            v-if="currentUser.admin == 1 || currentUser.id == postDetail.userId"
            @click="modifyPost"
          >Modifier</button>
        </div>
        <div class="comments">
          <div class="addCommentSection">
            <button class="addComment" @click="saveComment">Commenter</button>
            <textarea title="publish comment" class="commentInput" v-model="comment.content" />
          </div>
          <div class="comments_bloc" v-if="comment_display == 1">
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
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import PostDataService from "../services/PostDataService";
import Comment from "@/components/Comment.vue";
import CommentDataService from "../services/CommentDataService";
export default {
  name: "PostDetail",
  data() {
    return {
      currentUser: {},
      currentPost: null,
      currentComment: null,
      currentIndex: -1,
      postDetail: {},
      message: "",
      comments: [],
      comment: [],
      comment_display: null,
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

  components: {
    Header,
    Comment,
  },

  mounted() {
    let routeId = this.$route.params.id;
    this.comment_ = [...this.comment];
    this.refreshList();
    this.getPost(routeId);
    this.getCurrentUser();
  },

  methods: {
    ////////////////////////////////// POST //////////////////////////
    getCurrentUser() {
      let userLog = JSON.parse(localStorage.getItem("userLog"));
      this.currentUser = userLog;
      console.log("this.currentUser", this.currentUser)
      console.log("this.postdetail id", this.postDetail.userId)
    },

    // dateReform(date) {
    //   let dateUpdate = "";
    //   let newDate = date.split("T");
    //   let dateOnly = newDate[0];
    //   let dateSplit = dateOnly.split("-");
    //   let reverseDate = dateSplit.reverse();
    //   let joinDate = reverseDate.join("-");
    //   dateUpdate += joinDate;

    //   let timeOnly = newDate[1];
    //   let timeSplit = timeOnly.split(".");
    //   let timeSplitAgain = timeSplit[0].split(":");
    //   dateUpdate += " à ";
    //   dateUpdate += timeSplitAgain[0];
    //   dateUpdate += ":";
    //   dateUpdate += timeSplitAgain[1];

    //   return dateUpdate;
    // },

    getPost(id) {
      PostDataService.get(id)
        .then((response) => {
          this.postDetail = response.data[0];
          
          // this.postDetail.createdAt = this.dateReform(response.data.createdAt);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deletePost() {
      PostDataService.delete(this.postDetail.id)
        .then((response) => {
          console.log(response.data);
          window.alert("Votre publication a été supprimé !");
          this.$router.push("/forum");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modifyPost() {
      var msgModify = prompt("Modifier le post :");
      this.postDetail.content = msgModify;
      PostDataService.update(this.postDetail.id, this.postDetail)
        .then((response) => {
          window.alert("Votre publication a été modifié!");
          // document.location.reload(true);
          console.log(msgModify);
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    ////////////////////////// COMMENT //////////////////////////////

    saveComment() {
      let userId = JSON.parse(localStorage.getItem("userLog"));
      var data = {
        content: this.comment.content,
        userId: userId.id,
        userName: userId.name,
        postId: this.postDetail.id,
      };
      console.log("postid ==>", this.postDetail.id)
      console.log(data);
      CommentDataService.create(data)
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
      setTimeout(this.refreshList, 300);
    },

    refreshList() {
      this.retrieveComments(this.$route.params.id);
      this.currentComment = null;
      this.currentIndex = -1;
      this.comment_display = 1;
    },

    retrieveComments(postId) {
      CommentDataService.getAll(postId)
        .then((response) => {
          this.comments = response.data;
          console.log("res data ===>",response.data);
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
};
</script>

<style >
@keyframes commentMove {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
  }
}

.deletePost {
  background-color: red;
}

.modifyPost {
  background-color: rgb(255, 196, 0);
}

.posted_bloc {
  background-color: white;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  text-overflow: clip;
  overflow-wrap: break-word;
}

.posted {
  margin: 25px auto 25px auto;
  width: 500px;
}

.postDetail {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 200px auto 0 auto;
}

.posted_button {
  display: flex;
  margin: auto;
}

.backToForum {
  background-color: #091f43;
  color: white;
  font-family: Retroica;
  padding: 5px;
  border-radius: 5px;
  margin: auto auto auto 0px;
}

.post-userName {
  font-family: Retroica;
}

.addCommentSection {
  margin: auto;
  display: flex;
}

.addComment {
  margin: auto;
  background-color: white;
  color: #091f43;
}
.commentInput {
  width: 100%;
  margin-left: 5px;
}

.comment {
  opacity: 0;
  max-width: 95.5%;
  margin: 10px auto 10px auto;
  animation: commentMove;
  animation-delay: 0.3s;
  animation-duration: 0.7s;
  transition-timing-function: ease-in-out;
  animation-fill-mode: forwards;
}

@media all and (max-width: 499px) {
  .addCommentSection {
    display: flex;
    flex-direction: column;
  }

  .commentInput {
    max-width: 93%;
    margin-left: 0;
  }

  .comment {
    max-width: 93%;
  }

  .backToForum {
    margin: auto;
  }
}
</style>