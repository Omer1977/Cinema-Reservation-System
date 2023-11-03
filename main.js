const container = document.querySelector(".container");

const infoText = document.querySelector(".infoText");

const movieList = document.querySelector("#movie");

const seatCount = document.getElementById("count");

const totalAmount = document.getElementById("amount");

const seats = document.querySelectorAll(".seat:not(.reserved)");

const saveToDatabase = (index) => {
  localStorage.setItem("seatsIndex", JSON.stringify(index));

  localStorage.setItem("movieIndex", JSON.stringify(movieList.selectedIndex));
};

const getFromDatabase = () => {
  const dbSelectedSeats = JSON.parse(localStorage.getItem("seatsIndex"));

  if (dbSelectedSeats !== null) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add("selected");
      }
    });
  }

  const dbSelectedMovie = JSON.parse(localStorage.getItem("movieIndex"));
  movieList.selectedIndex = dbSelectedMovie;
};

getFromDatabase();

const createIndex = () => {
  let allSeatsArray = [];

  seats.forEach((seat) => {
    allSeatsArray.push(seat);
  });

  const allSelectedSeatsArray = [];

  const allSelectedSeats = container.querySelectorAll(".seat.selected");

  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat);
  });

  const selectedSeatsIndex = allSelectedSeatsArray.map((seletedSeat) => {
    return allSeatsArray.indexOf(seletedSeat);
  });

  saveToDatabase(selectedSeatsIndex);
};

const calculateTotal = () => {
  createIndex();

  let selectedSeatsCount = container.querySelectorAll(".seat.selected").length;

  seatCount.innerText = selectedSeatsCount;

  totalAmount.innerText = selectedSeatsCount * movieList.value;

  if (selectedSeatsCount) {
    infoText.classList.add("open");
  } else {
    infoText.classList.remove("open");
  }
};
calculateTotal();
container.addEventListener("click", (pointerEvent) => {
  const clickedSeat = pointerEvent.target.offsetParent;

  if (
    clickedSeat.classList.contains("seat") &&
    !clickedSeat.classList.contains("reserved")
  ) {
    clickedSeat.classList.toggle("selected");
  }
  calculateTotal();
});

movieList.addEventListener("change", () => {
  calculateTotal();
});
