<template>
  <div id="emojiSection">
    
    <Emoji @click="selectedEmoji"/>
  </div>
</template>
 
<script>
import { VueChatEmoji, emojis } from 'vue-chat-emoji'
require("vue-chat-emoji/dist/vue-chat-emoji.css");
export default {
  components: {
    Emoji: VueChatEmoji
  },
  methods(){
     selectedEmoji(args) {
      let textarea = document.querySelector("textarea").value
      console.log(textarea)
      let emojiSelected = emojis.decodeEmoji(args)
      textarea += emojiSelected
        
      console.log(args); /* return {...}*/
    }
  }
}
</script>