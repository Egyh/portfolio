import * as yup from "yup";

export const contactSchema = yup.object({
  name: yup
    .string()
    .required("名前を入力してください")
    .min(2, "名前は2文字以上で入力してください")
    .max(50, "名前は50文字以内で入力してください"),
  email: yup
    .string()
    .required("メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  message: yup
    .string()
    .required("メッセージを入力してください")
    .min(10, "メッセージは10文字以上で入力してください")
    .max(1000, "メッセージは1000文字以内で入力してください"),
});

export type ContactFormData = yup.InferType<typeof contactSchema>;
