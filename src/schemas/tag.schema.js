const Yup = require("yup");

const tagSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  featuredMedia: Yup.string().required("featuredMedia is required"),
  slug: Yup.string().required("Name is required"),
});

module.exports = {
  tagSchema,
};
