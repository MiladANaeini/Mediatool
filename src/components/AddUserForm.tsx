import React from "react";
import {
  HStack,
  Form,
  Button,
  TextField,
  NumberInput,
  H5,
} from "@northlight/ui";
import { FormValuesType } from "../interfaces/interfaces";

interface PropTypes {
  onSubmit: (values: FormValuesType) => void;
}

const AddUserForm = ({ onSubmit }: PropTypes) => {
  const validation = (values: any) => {
    const errors: any = {};
    if (values.firstName === "admin") {
      errors.firstName = {
        message: "Nice try",
      };
    }
    if (values.score === "") {
      errors.score = {
        message: "Nice try",
      };
    }
    return errors;
  };

  return (
    <div className="mt-2">
      <H5 className="mb-1">Add new user or edit existing user's scores</H5>
      <Form
        initialValues={{ name: "", score: 0 }}
        onSubmit={onSubmit}
        formSettings={{
          mode: "onSubmit",
        }}
        // validate={validation}
      >
        <HStack alignItems="end" w="600px">
          <TextField name="name" label="User Name" isRequired={true} />
          <NumberInput name="score" isRequired={true} />
          <Button type="submit" variant="success" w="400px">
            Validate
          </Button>
        </HStack>
      </Form>
    </div>
  );
};

export default AddUserForm;
