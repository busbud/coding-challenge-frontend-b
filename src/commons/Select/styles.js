import styled from "styled-components";

import { Select } from "antd";

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    height: 44px !important;
    border-radius: 4px !important;
    padding: 7px 12px !important;
  }

  .ant-select-arrow {
    right: 24px !important;
  }
`;
