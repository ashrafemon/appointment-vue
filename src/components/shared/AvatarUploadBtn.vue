<template>
  <div class="avatarWrapper">
    <template v-if="currentStaff && currentStaff.avatar">
      <img :src="'http://' + currentStaff.avatar" alt="Avatar"/>
    </template>
    <template v-else>
      <img
          alt="Avatar"
          src="https://my.setmore.com/webapp/images/service-icon-big.png"
      />
    </template>
    <button class="btn uploadBtn" @click="showDialog">
      <i class="fas fa-camera"></i>
    </button>
    <input ref="inputFile" class="d-none" type="file" @change="fileSelect"/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AvatarUploadBtn",
  data() {
    return {
      avatar: "",
    };
  },
  computed: {
    ...mapGetters({
      currentStaff: "currentStaff",
    }),
  },
  methods: {
    ...mapActions({
      uploadStaffAvatar: "uploadStaffAvatar",
    }),
    showDialog() {
      this.$refs.inputFile.click();
    },
    fileSelect(e) {
      // console.log(e.target.files)
      this.avatar = e.target.files[0];
      this.uploadStaffAvatar({
        user: this.$router.history.current.params.id,
        avatar: this.avatar,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatarWrapper {
  width: 95%;
  height: 110px;
  border-radius: 50%;
  overflow: hidden;
  margin: auto;
  position: relative;

  &:hover {
    .uploadBtn {
      visibility: visible;
      opacity: 1;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .uploadBtn {
    width: 65%;
    height: 65%;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 42px;
    background-color: #e4e6e5;
    color: #595a5a;
    border-radius: 50%;
    transition-property: opacity;
    transition-duration: 0.5s;

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>