// URL değiştiğinde çalışacak fonksiyon
function onPageChanged() {
  console.log("URL değişti:", window.location.href);
  const url = window.location.href;

  const params = url?.split("classic")[1] ?? "";

  const dataObj = {};
  params
    .substring(1)
    .split("&")
    .forEach((pair) => {
      const [key, value] = pair.split("=");
      dataObj[key] = parseFloat(value) || value;
    });

  if (dataObj.type == "sell") {
    const sellButton = document.getElementById("sell");
    sellButton?.click();

    const sellId = setTimeout(() => {
      var event = new Event("change");
      const price = document.getElementById("price");
      const amount = document.getElementById("amount");

      price.value = dataObj?.paribuBuyPrice?.toString() ?? "";
      amount.value = dataObj?.amount?.toString() ?? "";

      price.dispatchEvent(event);
      amount.dispatchEvent(event);

      var buttons = document.getElementsByTagName("button");

      for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].innerHTML === "Satış emri ver") {
          var value = buttons[i];
          value.click();
          break;
        }
      }
    }, 100);
  } else if (dataObj.type == "buy") {
    const buyButton = document.getElementById("buy");
    buyButton?.click();
    var event = new Event("change");
    const price = document.getElementById("price");
    const amount = document.getElementById("amount");
    const total = document.getElementById("total");

    price.value = dataObj?.paribuBuyPrice?.toString() ?? "";
    amount.value = dataObj?.amount?.toString() ?? "";
    const totalValue =
      Number(dataObj?.amount) * Number(dataObj?.paribuBuyPrice);
    total.value = totalValue.toFixed(2);

    price.dispatchEvent(event);
    amount.dispatchEvent(event);
    total.dispatchEvent(event);

    var buttons = document.getElementsByTagName("button");

    for (var i = 0; i < buttons.length; i++) {
      if (buttons[i].innerHTML === "Alış emri ver") {
        var value = buttons[i];
        value.click();
        console.log(value);
        break;
      }
    }
  }

  clearTimeout(sellId);
}

// URL değişikliğini dinlemek için olay dinleyicisi ekle
window.addEventListener("hashchange", onPageChanged);
window.addEventListener("popstate", onPageChanged);
window.addEventListener("pushState", onPageChanged);
window.addEventListener("replaceState", onPageChanged);

// Sayfa yüklendiğinde URL'yi console'a yazdır
document.addEventListener("DOMContentLoaded", () => {
  const id = setTimeout(() => {
    onPageChanged();
  }, 1000);

  clearTimeout(id);
});
