import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppings
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  // find and click order summary button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  // check summary informattion based on order
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();

  // check summary options items
  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.click(termsAndConditions);
  const confirmOrderButton = await screen.findByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // should show loading while save order and get order number
  const showLoading = screen.getByText(/loading/i);
  expect(showLoading).toBeInTheDocument();

  // confirm order number on confirmatrion page
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/your order number is [0-9]+/i);
  expect(orderNumber).toBeInTheDocument();

  // should hide loading before save order and get order number
  const hideLoading = screen.queryByText(/loading/i);
  expect(hideLoading).not.toBeInTheDocument();

  // click new order button on confirmation page
  const createNewOrderButton = await screen.findByRole("button", {
    name: /create new order/i,
  });
  userEvent.click(createNewOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
  const toppingsSubtotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubtotal).toBeInTheDocument();

  // do we need to await anything to avoid test errors?
  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("should'nt show toppings heading when order hasn't toppings", async () => {
  render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  userEvent.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", {
    name: /toppings/i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();

  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
});
