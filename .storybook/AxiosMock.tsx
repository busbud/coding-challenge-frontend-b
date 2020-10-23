import { useEffect } from "react";
import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../utils/axios";

interface IProps {
  children: any;
  mock: (adapter: MockAdapter) => void;
}

const apiMock = new MockAdapter(axiosInstance);

const AxiosMock = ({ children, mock }: IProps) => {
  useEffect(() => {
    mock(apiMock);
    return () => {
      apiMock.reset();
    };
  });
  return children;
};

export default AxiosMock;
