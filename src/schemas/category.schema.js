const Yup = require("yup");

const categorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  featuredMedia: Yup.string().required("featuredMedia is required"),
  slug: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

module.exports = {
  categorySchema,
};
