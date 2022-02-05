

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("lab-financial-data-graphing JS imported successfully!");

  },
  false
);



document.addEventListener("input",function(){
let start = document.getElementById("start").value;
let end = document.getElementById("end").value;
if (!start || !end) {
  return;
}
refreshData(start,end);
});