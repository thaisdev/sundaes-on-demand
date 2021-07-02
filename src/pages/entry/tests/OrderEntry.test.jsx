import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      ctx.status(500)
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);

  waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", {
      name: "An unexpected error ocurred. Please try again later.",
    });

    expect(alerts).toHaveLength(2);
  });
});

test("disable order button", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  expect(orderSummaryButton).toBeDisabled();

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(orderSummaryButton).toBeEnabled();

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "0");
  expect(orderSummaryButton).toBeDisabled();
});
