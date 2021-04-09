<template>
  <b-row v-show="currentStaff" class="mb-2">
    <b-col cols="2">
      <AvatarUploadBtn/>
    </b-col>
    <b-col cols="10">
      <h5>{{ currentStaff.name }}'s break Hours:</h5>

      <div v-if="workingStatus" class="breaks">
        <div
            v-if="workingStatus.monday && workingStatus.monday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Monday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="mondayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in mondayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="startTimeUpdate(staffBreak.day_name,staffBreak.id,$event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in mondayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="endTimeUpdate(staffBreak.day_name,staffBreak.id,$event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in mondayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Monday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in mondayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select @change="endTimeChange('Monday', $event)">
                    <b-form-select-option
                        v-for="(option, i) in mondayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.tuesday && workingStatus.tuesday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Tuesday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="tuesdayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in tuesdayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="startTimeUpdate(staffBreak.day_name,staffBreak.id,$event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in tuesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in tuesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Tuesday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in tuesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select @change="endTimeChange('Tuesday', $event)">
                    <b-form-select-option
                        v-for="(option, i) in tuesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.wednesday && workingStatus.wednesday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Wednesday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="wednesdayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in wednesdayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="
                              startTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in wednesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in wednesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Wednesday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in wednesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      @change="endTimeChange('Wednesday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in wednesdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.thursday && workingStatus.thursday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Thursday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="thursdayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in thursdayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="
                              startTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in thursdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in thursdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Thursday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in thursdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      @change="endTimeChange('Thursday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in thursdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.friday && workingStatus.friday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Friday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="fridayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in fridayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="
                              startTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in fridayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in fridayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Friday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in fridayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select @change="endTimeChange('Friday', $event)">
                    <b-form-select-option
                        v-for="(option, i) in fridayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.saturday && workingStatus.saturday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Saturday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="saturdayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in saturdayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="
                              startTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in saturdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in saturdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Saturday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in saturdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      @change="endTimeChange('Saturday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in saturdayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div
            v-if="workingStatus.sunday && workingStatus.sunday.status === 'active'"
            class="breakItem d-flex"
        >
          <div class="breakItemDayPart">
            <div class="breakDay">
              <h6>Sunday</h6>
            </div>
            <div class="breakStatus">
              <button class="addBreakBtn">Add Break</button>
            </div>
          </div>
          <div class="breakItemTimePart">
            <template v-if="sundayStaffBreakTime.length > 0">
              <div
                  v-for="staffBreak in sundayStaffBreakTime"
                  :key="staffBreak.id"
                  class="breakSingleItem"
              >
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.start_time"
                      @change="
                              startTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in sundayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select
                      :value="staffBreak.end_time"
                      @change="
                              endTimeUpdate(
                                staffBreak.day_name,
                                staffBreak.id,
                                $event
                              )
                            "
                  >
                    <b-form-select-option
                        v-for="(option, i) in sundayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakAction">
                  <button
                      class="shadow-sm"
                      @click="deleteBreakTime(staffBreak.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </template>

            <template v-else>
              <div class="breakSingleItem">
                <div class="breakTime">
                  <b-form-select
                      @change="startTimeChange('Sunday', $event)"
                  >
                    <b-form-select-option
                        v-for="(option, i) in sundayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
                <div class="breakTo">
                  <span>to</span>
                </div>
                <div class="breakTime">
                  <b-form-select @change="endTimeChange('Sunday', $event)">
                    <b-form-select-option
                        v-for="(option, i) in sundayBreakTimes"
                        :key="i"
                        :value="option"
                    >
                      {{ option }}
                    </b-form-select-option>
                  </b-form-select>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import AvatarUploadBtn from "../../shared/AvatarUploadBtn";
import {mapActions, mapGetters} from "vuex";
import {timeRangesHalf} from "@/utils/times";

export default {
  name: "BreaksTab",
  components: {
    AvatarUploadBtn,
  },
  data() {
    return {
      timeOptions: timeRangesHalf,
      workingDays: {},
      breakTimeForm: {
        monday: {},
        tuesday: {},
        wednesday: {},
        thursday: {},
        friday: {},
        saturday: {},
        sunday: {},
      },
      breakTimes: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      currentStaff: "currentStaff",
    }),
    workingStatus() {
      this.currentStaff.workinghours.map(item => {
        this.workingDays[item.day_name] = {
          status: item.status === 'active' ? 'active' : 'inactive',
          start: item.start_time,
          end: item.end_time,
        };
      });
      return this.workingDays;
    },
    mondayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.monday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.monday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    tuesdayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.tuesday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.tuesday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    wednesdayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.wednesday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.wednesday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    thursdayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.thursday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.thursday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    fridayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.friday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.friday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    saturdayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.saturday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.saturday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    sundayBreakTimes() {
      let times = [];
      let startCount = 0;
      let endCount = 0;
      this.timeOptions.map((item, i) => {
        if (item.indexOf(this.workingStatus.sunday.start) !== -1) {
          startCount = i;
        }
        if (item.indexOf(this.workingStatus.sunday.end) !== -1) {
          endCount = i;
        }
      });
      times = this.timeOptions.slice(startCount, endCount + 1);
      return times;
    },
    mondayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Monday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    tuesdayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Tuesday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    wednesdayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Wednesday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    thursdayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Thursday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    fridayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Friday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    saturdayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Saturday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
    sundayStaffBreakTime() {
      let breaks = [];
      this.currentStaff.breakhours.map((breakItem) => {
        if (breakItem.day_name === "Sunday") {
          breaks.push(breakItem);
        }
      });
      return breaks;
    },
  },
  methods: {
    ...mapActions({
      createStaffBreakTime: 'createStaffBreakTime',
      updateStaffBreakTime: 'updateStaffBreakTime',
      deleteStaffBreakTime: 'deleteStaffBreakTime'
    }),
    resetAllDay() {
      this.breakTimes = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };
    },
    startTimeChange(dayName, value) {
      this.breakTimeForm[dayName.toLowerCase()].day_name = dayName;
      this.breakTimeForm[dayName.toLowerCase()].start_time = value;

      if (Object.keys(this.breakTimeForm[dayName.toLowerCase()]).length === 3) {
        this.createStaffBreakTime({
          user: this.$router.history.current.params.id,
          form: this.breakTimeForm[dayName.toLowerCase()],
        });
      }
    },
    endTimeChange(dayName, value) {
      this.breakTimeForm[dayName.toLowerCase()].day_name = dayName;
      this.breakTimeForm[dayName.toLowerCase()].end_time = value;

      if (Object.keys(this.breakTimeForm[dayName.toLowerCase()]).length === 3) {
        this.createStaffBreakTime({
          user: this.$router.history.current.params.id,
          form: this.breakTimeForm[dayName.toLowerCase()],
        });
      }
    },
    startTimeUpdate(dayName, id, value) {
      this.breakTimeForm[dayName.toLowerCase()].start_time = value;

      this.updateStaffBreakTime({
        user: this.$router.history.current.params.id,
        id: id,
        form: this.breakTimeForm[dayName.toLowerCase()],
      });
    },
    endTimeUpdate(dayName, id, value) {
      this.breakTimeForm[dayName.toLowerCase()].end_time = value;

      this.updateStaffBreakTime({
        user: this.$router.history.current.params.id,
        id: id,
        form: this.breakTimeForm[dayName.toLowerCase()],
      });
    },
    deleteBreakTime(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteStaffBreakTime({
            user: this.$router.history.current.params.id,
            id: id,
          });
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.loader {
  margin: auto;
}

.avatarBtn {
  background-color: transparent;
  border: 0;
  color: #000000;
}

.breaks {
  margin-top: 20px;

  .breakItem {
    margin-bottom: 10px;

    .breakItemDayPart {
      width: 30%;
      display: flex;
      justify-content: space-between;

      .breakDay {
        width: 50%;

        h6 {
          margin-bottom: 0;
          color: #555e6d;
        }
      }

      .breakStatus {
        width: 50%;
        text-align: center;

        .addBreakBtn {
          background-color: #667eea;
          border: 0;
          outline: 0;
          font-size: 12px;
          color: #ffffff;
          border-radius: 15px;
          padding: 2px 6px;
        }
      }
    }

    .breakItemTimePart {
      width: 70%;

      .breakSingleItem {
        width: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 5px;

        .breakTime {
          width: 25%;
        }

        .breakTo {
          width: 5%;
          text-align: center;
          font-size: 12px;
          color: #6f7e86 !important;
        }

        .breakAction {
          width: 25%;
          text-align: center;

          button {
            background-color: #ffffff;
            outline: 0;
            border: 0;
            color: #000000;
            font-weight: bold;
            font-size: 14px;
            padding: 2px 5px;
            border-radius: 2px;
          }
        }
      }
    }
  }
}
</style>
