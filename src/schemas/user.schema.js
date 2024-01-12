const Yup = require("yup");

const userSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username must start with a letter and only contain letters and numbers"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
  token: Yup.string().optional(),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  name: Yup.string().optional(),
  avatar: Yup.string().optional(), // Add additional validation if needed for the avatar field
});

const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^[a-zA-Z][a-zA-Z0-9]*$/,
      "Username must start with a letter and only contain letters and numbers"
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Password must contain at least one letter and one number"
    ),
});

const informationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  country: Yup.string().optional(),
  city: Yup.string().optional(),
  address: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
  birthday: Yup.date().optional(),
  organization: Yup.string().optional(),
  companyName: Yup.string().optional(),
  role: Yup.string().optional(),
  department: Yup.string().optional(),
  zipCode: Yup.string().optional(),
});

module.exports = {
  userSchema,
  loginSchema,
  informationSchema,
};
