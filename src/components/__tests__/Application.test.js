import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

beforeEach(() => {
  process.env = Object.assign(process.env, {
    REACT_APP_WEBSOCKET_URL: "ws://localhost:8001"
  });
});

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    //click on the add img
    fireEvent.click(getByAltText(appointment, "Add"));
    //input the name "Lydia Miller-Jones"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    //pick Sylvia Palmer as the interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    //click save to confirm the interview
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Saving ...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    expect(getByText(container, "Lydia Miller-Jones")).toBeInTheDocument();

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //get the booked appointment
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "trash" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 4. check if the confirm mode has show up".
    expect(
      getByText(appointment, "Are you sure you want to remove the appointment?")
    ).toBeInTheDocument();
    // 5. click confirm.
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. check if the deleting mode has showd up.
    expect(getByText(appointment, "Deleting ...")).toBeInTheDocument();
    // 7. wait until until empty mode is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "1 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    //get the booked appointment
    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));
    // 3. Click the "edit" button on the first empty appointment.
    fireEvent.click(getByAltText(appointment, "Edit"));
    // 4. check if the form mode has show up and input a different name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    // 5. click save.
    fireEvent.click(getByText(appointment, "Save"));
    // 6. check if the saving mode has showd up.
    expect(getByText(appointment, "Saving ...")).toBeInTheDocument();
    // 7. wait until until empty mode is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    // 8. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Saving ...")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Something went wrong while saving...")
    );

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(
      container,
      "appointment"
    ).find(appointment => queryByText(appointment, "Archie Cohen"));

    fireEvent.click(getByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting ...")).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, "Something went wrong while deleting...")
    );

    fireEvent.click(getByAltText(appointment, "Close"));

    // expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
