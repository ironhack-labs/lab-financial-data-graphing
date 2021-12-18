document.addEventListener(
  "DOMContentLoaded",
  () => {
    dataRequest("http://api.coindesk.com/v1/bpi/historical/close.json");

    document
      .getElementById("from-date")
      .addEventListener("change", () => filderByDate());

    document
      .getElementById("to-date")
      .addEventListener("change", () => filderByDate());

    document
      .getElementById("currency")
      .addEventListener("change", () => filderByDate());
  },
  false
);