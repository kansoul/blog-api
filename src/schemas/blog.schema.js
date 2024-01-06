const Yup = require("yup");

const blogSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  slug: Yup.string().required("Slug is required"),
  featuredMedia: Yup.string().required("Featured media is required"),
  status: Yup.string().required("Status is required"),
  category: Yup.string().required("Category is required"),
  tags: Yup.array().of(Yup.string().required("Tag is required")),
  author: Yup.string().required("Author is required"),
});

module.exports = {
  blogSchema,
};
