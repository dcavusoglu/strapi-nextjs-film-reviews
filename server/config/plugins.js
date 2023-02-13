module.exports = ({ env }) => ({
  // ...
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        film: {
          field: "slug",
          references: "title",
        },
      },
    },
  },
  // ...
});
