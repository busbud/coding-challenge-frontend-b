import React from "react";
import {
  IconButton,
  Input,
  InputProps,
  IconButtonProps,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/core";
import { useFormContext, Controller } from "react-hook-form";

type ControlledNumberInputProps = InputProps &
  IconButtonProps & { name: string };
export const ControlledNumberInput: React.FunctionComponent<ControlledNumberInputProps> = ({
  variant = "outline",
  variantColor = "gray",
  "aria-label": ariaLabel,
  name = "",
  ...props
}) => {
  const { control, setValue, getValues } = useFormContext();
  return (
    <InputGroup {...props}>
      <InputLeftElement>
        <IconButton
          icon="minus"
          aria-label={`Remove one ${ariaLabel}`}
          onClick={() => {
            if (getValues(name) > 0) {
              setValue(name, Number(getValues(name)) - 1);
            }
          }}
          variant={variant}
          variantColor={variantColor}
          isRound
          size="xs"
        />
      </InputLeftElement>
      <Controller
        control={control}
        name={name}
        render={({ onChange, onBlur, value }) => (
          <Input
            type="number"
            id={name}
            placeholder="0"
            textAlign="center"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onChange(Number(event.target.value))
            }
            value={value}
            onBlur={onBlur}
            paddingX="2rem"
          />
        )}
      />
      <InputRightElement>
        <IconButton
          icon="add"
          aria-label={`Add one ${ariaLabel}`}
          onClick={() => {
            if (getValues(name)) {
              setValue(name, Number(getValues(name)) + 1);
            } else {
              setValue(name, 1);
            }
          }}
          variant={variant}
          variantColor={variantColor}
          isRound
          size="xs"
        />
      </InputRightElement>
    </InputGroup>
  );
};
