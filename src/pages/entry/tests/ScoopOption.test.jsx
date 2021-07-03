import { render, screen } from "@testing-library/react";
import ScoopOption from "../ScoopOption";
import userEvent from "@testing-library/user-event";

test("validation count", () => {
  render(<ScoopOption name="Scoop Test" updateItemCount={jest.fn()} />);
  const input = screen.getByRole("spinbutton", { name: "Scoop Test" });

  userEvent.clear(input);
  userEvent.type(input, "-1");
  expect(input).toHaveClass("is-invalid");

  userEvent.clear(input);
  userEvent.type(input, "2.5");
  expect(input).toHaveClass("is-invalid");

  userEvent.clear(input);
  userEvent.type(input, "11");
  expect(input).toHaveClass("is-invalid");

  userEvent.clear(input);
  userEvent.type(input, "3");
  expect(input).not.toHaveClass("is-invalid");
});
