import React from "react";
import {
  HStack,
  Form,
  Button,
  TextField,
  H5,
  NumberInputField,
} from "@northlight/ui";
import { FormValuesType } from "../interfaces/interfaces";

interface PropTypes {
  onSubmit: (values: FormValuesType) => void;
}

const AddUserForm = ({ onSubmit }: PropTypes) => {
  return (
    <div className="mt-2">
      <H5 className="mb-1">Add new user or edit existing user's scores</H5>
      <Form
        initialValues={{ name: "", score: 0 }}
        onSubmit={onSubmit}
        formSettings={{
          mode: "onSubmit",
        }}
      >
        <HStack alignItems="end" w="600px">
          <TextField name="name" label="User Name" isRequired={true} />
          <NumberInputField name="score" label="User Score" isRequired={true} />
          <Button type="submit" variant="success" w="400px">
            Validate
          </Button>
        </HStack>
      </Form>
    </div>
  );
};

export default AddUserForm;
