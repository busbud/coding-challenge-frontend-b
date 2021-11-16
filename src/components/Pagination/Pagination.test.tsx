import React from "react";
import Pagination from ".";
import { fireEvent, render } from "../../test-utils";

describe("<Pagination />", () => {
  it("should render the Pagination component", () => {
    const onChange = jest.fn();
    const { baseElement } = render(
      <Pagination
        currentPage={1}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    expect(baseElement).toBeTruthy();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("should render next & prev button correctly", () => {
    const onChange = jest.fn();
    const { baseElement, rerender } = render(
      <Pagination
        currentPage={1}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    const prevElement = baseElement.querySelector(
      "button.prev"
    ) as HTMLButtonElement;
    const nextElement = baseElement.querySelector(
      "button.next"
    ) as HTMLButtonElement;
    expect(prevElement).toBeDisabled();
    expect(nextElement).not.toBeDisabled();
    rerender(
      <Pagination
        currentPage={3}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    expect(prevElement).not.toBeDisabled();
    expect(nextElement).toBeDisabled();
  });

  it("should onChange be called if we click on button page", () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    const buttonPage2 = getByText(/2/i) as HTMLButtonElement;
    fireEvent.click(buttonPage2);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(2);
  });

  it("should onChange be called if we click on prev/next button", () => {
    const onChange = jest.fn();
    const { baseElement, rerender } = render(
      <Pagination
        currentPage={2}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    const prevElement = baseElement.querySelector(
      "button.prev"
    ) as HTMLButtonElement;
    const nextElement = baseElement.querySelector(
      "button.next"
    ) as HTMLButtonElement;
    fireEvent.click(prevElement);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenLastCalledWith(1);
    rerender(
      <Pagination
        currentPage={1}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    expect(prevElement).toBeDisabled();
    fireEvent.click(prevElement);
    expect(onChange).toHaveBeenCalledTimes(1);
    fireEvent.click(nextElement);
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(2);
    rerender(
      <Pagination
        currentPage={2}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    fireEvent.click(nextElement);
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenLastCalledWith(3);
    rerender(
      <Pagination
        currentPage={3}
        onChange={onChange}
        count={15}
        itemsPerPage={5}
      />
    );
    expect(nextElement).toBeDisabled();
    fireEvent.click(nextElement);
    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
