import React from "react";
import { fireEvent } from "@testing-library/react";
import { render, cleanup } from "@testing-library/react";
import { waitForElement } from "@testing-library/react";
import Application from "components/Application";
import { prettyDOM } from "@testing-library/react";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() => {
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
  const { container } = render(<Application />);
  console.log(container);
  console.log(prettyDOM(container));
});

