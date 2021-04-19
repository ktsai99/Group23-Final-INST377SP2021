export default (database, DataTypes) => {
  const Genres = database.define(
    "Genres",
    {
      genres_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      genre_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  return Genres;
};
