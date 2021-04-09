<template>
  <div class="py-3">
    <b-row align-v="center">
      <b-col cols="12" md="5">
        <h1>Why is Sesame's time control so much better than you could imagine?</h1>
        <h3>We have grown a lot and we had to be the best.</h3>
        <b-button class="experienceBtn">
          <span class="mr-2">The experience begins</span>
          <i class="fas fa-arrow-circle-right"></i>
        </b-button>
      </b-col>
      <b-col cols="12" md="7">
        <img src="./../../assets/images/undraw_schedule_pnbk.svg" class="img-fluid"/>
      </b-col>
    </b-row>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
}

h3 {
  font-size: 22px;
  font-weight: normal;
  margin-bottom: 20px;
}

.experienceBtn {
  background-color: #667eea;
  border-color: #667eea;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 30px;
  font-size: 1.3rem;
  transition-property: background-color;
  transition-duration: .5s;

  &:hover {
    background-color: #5ebea3;
    border-color: #5ebea3;
  }
}
</style>