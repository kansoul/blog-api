const Yup = require("yup");

const mediaSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  description: Yup.string().optional(),
  type: Yup.string()
    .required("Type is required")
    .oneOf(["AVATAR", "MEDIA", "OTHER"], "Invalid role"),
  data: Yup.string().required("Base64 is required"),
});

const updateSchema = Yup.object().shape({
  title: Yup.string().required("Name is required"),
  description: Yup.string().optional(),
  type: Yup.string()
    .required("Type is required")
    .oneOf(["AVATAR", "MEDIA", "OTHER"], "Invalid role"),
});

const uploadImageSchema = Yup.object().shape({
  data: Yup.string().required("Base64 is required"),
});

module.exports = {
  mediaSchema,
  updateSchema,
  uploadImageSchema,
};
