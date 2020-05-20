var stripe = Stripe("pk_test_D29iJqKJ8o9RBdNZwxMWKO8s00bcQTMjho");
var elements = stripe.elements();

// Set up Stripe.js and Elements to use in checkout form
var style = {
  base: {
    color: "#32325d",
  },
};

var card = elements.create("card", { style: style, hidePostalCode: true });
card.mount("#card-element");

card.on("change", ({ error }) => {
  const displayError = document.getElementById("card-errors");
  if (error) {
    displayError.textContent = error.message;
  } else {
    displayError.textContent = "";
  }
});

var form = document.getElementById("payment-form");

form.addEventListener("submit", function (ev) {
  ev.preventDefault();
  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: "Jenny Rosen",
        },
      },
    })
    .then(function (result) {
      if (result.error) {
        // Show error to your customer (e.g., insufficient funds)
        console.log(result.error.message);
      } else {
        // The payment has been processed!
        if (result.paymentIntent.status === "succeeded") {
          alert("Successfully made payment");
          // Show a success message to your customer
          // There's a risk of the customer closing the window before callback
          // execution. Set up a webhook or plugin to listen for the
          // payment_intent.succeeded event that handles any business critical
          // post-payment actions.
        }
      }
    });
});
