const Yup = require("yup");

const userSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  token: Yup.string().optional(),
  role: Yup.string().oneOf(["AUTHOR", "ADMIN"], "Invalid role").optional(),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: Yup.string().optional(),
  avatar: Yup.string().optional(), // Add additional validation if needed for the avatar field
});

module.exports = {
  userSchema,
};
