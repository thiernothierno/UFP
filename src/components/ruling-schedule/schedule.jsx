const board_member = ["amad", "bebe", "cantona", "david"];
const regular_member_NY = [
  "emanuel",
  "frank",
  "geoge",
  "hamidou",
  "ismael",
  "junior",
];

function random_name(data) {
  const index = Math.floor(Math.random() * data.length);
  const name = data[index];
  return name;
}

let board_m = random_name(board_member);
let regular_m = random_name(regular_member_NY);
console.log(board_m);
console.log(regular_m);

export default [board_m, regular_m];
