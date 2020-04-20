import React from "react";

import { render, cleanup } from "@testing-library/react";

import Application from "components/Application";

beforeEach(()=>{
  process.env = Object.assign(process.env, {REACT_APP_WEBSOCKET_URL: "ws://localhost:8001"});
})

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
