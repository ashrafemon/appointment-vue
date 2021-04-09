<template>
  <div>
    <b-form-group>
      <b-form-input
          v-model="form.email"
          class="inputBox mb-4"
          placeholder="Email"
          type="email"
      />
    </b-form-group>

    <div class="text-center">
      <b-button block class="forgetBtn" @click="forget(form)">Send Forget Request</b-button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['forget'],
  data() {
    return {
      form: {
        email: ''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.inputBox {
  border: 0;
  border-bottom: 1px solid #efefef;

  &::placeholder {
    color: #b8c2d0;
  }

  &:focus {
    box-shadow: none;
  }
}

.forgetBtn {
  background-color: #5ebea3;
  border-color: #5ebea3;
  color: #ffffff;
  font-weight: bold;
  border-radius: 30px;
  margin-bottom: 20px;
}
</style>