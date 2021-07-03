import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("doesn't update scoop total when update scoop input with invalid value", async () => {
  render(<Options optionType="scoops" />);
  const input = await screen.findByRole("spinbutton", { name: "Chocolate" });
  const scoopsTotal = screen.getByText("Scoops total: $", { exact: false });

  userEvent.clear(input);
  userEvent.type(input, "-1");
  expect(scoopsTotal).toHaveTextContent("0.00");
});
