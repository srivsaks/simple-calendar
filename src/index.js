import "./styles.css";

function getFirstDayOfMonth(year, month, index) {
  return new Date(year, month, index);
}

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const daysInAWeek = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

const header = document.querySelector(".curr-month-header");
const calendarBody = document.querySelector("#table-body");
const selectYearEle = document.querySelector("#select-year");
const selectMonthEle = document.querySelector("#select-month");

const currDateDetails = new Date();
const currDay = currDateDetails.getDate();
const currMonth = currDateDetails.getMonth();
const currYear = currDateDetails.getFullYear();

let selectedMonth = currMonth;
let selectedYear = currYear;

function updateHeader() {
  header.textContent = `${months[selectedMonth]} ${selectedYear}`;
}

function updateCalendarBody() {
  let firstDay = getFirstDayOfMonth(selectedYear, selectedMonth, 1).getDay();
  let dayNum = 1;

  let totalDaysInAMonth = getFirstDayOfMonth(
    selectedYear,
    selectedMonth,
    0
  ).getDate();

  calendarBody.innerHTML = "";

  for (let row = 0; row < 6; row++) {
    const rowEle = document.createElement("tr");

    for (let col = 0; col < 7; col++) {
      const colData = document.createElement("td");
      if (dayNum <= totalDaysInAMonth) {
        if (
          selectedMonth === currMonth &&
          selectedYear === currYear &&
          currDay === dayNum
        ) {
          colData.classList.add("current");
        }

        if (row === 0 && col >= firstDay % 7) {
          colData.textContent = dayNum++;
          /*if (col === (firstDay + 1) % 7 && row === 0) {
            colData.classList.add("current");
          }*/
          rowEle.append(colData);
        } else if (row !== 0) {
          const colData = document.createElement("td");
          colData.textContent = dayNum++;
          rowEle.append(colData);
        } else if (row === 0 && col < firstDay % 7) {
          const colData = document.createElement("td");
          colData.textContent = "";
          rowEle.append(colData);
        }
      }
    }

    calendarBody.append(rowEle);
  }
}

updateHeader();
updateCalendarBody();

selectYearEle.addEventListener("change", (e) => {
  selectedYear = e.target.value;
  updateHeader();
  updateCalendarBody();
});

selectMonthEle.addEventListener("change", (e) => {
  selectedMonth = e.target.value;
  updateHeader();
  updateCalendarBody();
});
