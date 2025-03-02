import { render, screen } from "@testing-library/react";
import { Button } from "./button";

import "@testing-library/jest-dom";

describe("Button component CSS variants", () => {
  test("Base button renders properly", () => {
    render(<Button>Hello</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Renders with primary style", () => {
    render(<Button type="primary">Primary</Button>);
    const button = screen.getByRole("button", { name: "Primary" });
    expect(button).toBeInTheDocument();

    const styles = window.getComputedStyle(button);
    expect(styles.getPropertyValue("background-color")).toBe(
      "color-mix(in srgb, var(--brand-default) 20%, transparent)"
    );
  });
});
