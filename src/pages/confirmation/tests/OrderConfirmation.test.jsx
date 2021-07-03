import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../OrderConfirmation";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("show alert error when has error order", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) => ctx.status(500))
  );

  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  waitFor(async () => {
    const alert = await screen.findByRole("alert");

    expect(alert).toHaveTextContet(
      "An unexpected error ocurred. Please try again later."
    );
  });
});
