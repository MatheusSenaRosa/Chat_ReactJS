import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver } from "react-hook-form";
import { Form } from "../types";

const schema = yup.object({
  nickname: yup.string().nullable().required("Required").trim(),
});

export const resolver = yupResolver(schema) as Resolver<Form>;
