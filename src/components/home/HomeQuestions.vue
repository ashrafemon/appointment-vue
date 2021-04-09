<template>
  <div class="questions py-3">
    <b-container>
      <b-row align-h="between">
        <b-col cols="12" md="5" class="mb-md-0 mb-4">
          <div class="questionItem">
            <h1 class="questionItemTitle">More Information</h1>
            <p class="questionItemDesc">If you want to know how to do it (this is the part we like the most) we will
              tell you how.</p>
            <b-button class="questionItemBtn">
              <span class="mr-2">Contact</span>
              <i class="fas fa-arrow-right"></i>
            </b-button>
          </div>
        </b-col>

        <b-col cols="12" md="5">
          <div class="questionItem">
            <h1 class="questionItemTitle">Do you know <span class="superTitle">SupeRRHHeroes</span> ?</h1>
            <p class="questionItemDesc">Discover the Sesame blog for Human Resources superheroes.</p>
            <b-button class="questionItemBtn">
              <span class="mr-2">Go to blog</span>
              <i class="fas fa-arrow-right"></i>
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss" scoped>
.questions {
  .questionItem {
    .questionItemTitle {
      font-size: 28px;
      font-weight: bold;
      color: #000000;
      margin-bottom: 10px;
    }

    .questionItemDesc {
      color: #8995a7;
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 15px;
    }

    .questionItemBtn {
      background-color: transparent;
      border: none;
      color: #000000;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>