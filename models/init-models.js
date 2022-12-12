import _holiday from "./holiday_model.js";
import _artist_genre from "./artist_genre.js";
import _artist_of_interest from "./artist_of_interest.js";
import _artist from "./artist.js";
import _board_detail from "./board_detail.js";
import _concert_artist_model from "./concert_artist_model.js";
import _concert_info from "./concert_info.js";
import _concert_of_interest from "./concert_of_interest.js";
import _genre_concert_model from "./genre_concert_model.js";
import _genre_of_interest from "./genre_of_interest.js";
import _genre from "./genre.js";
import _reply from "./reply.js";
import _user from "./user.js";
import _user_reply from "./user_reply.js";

const initModels = (sequelize) => {
  const holiday = _holiday(sequelize);
  const artist_genre = _artist_genre(sequelize);
  const artist_of_interest = _artist_of_interest(sequelize);
  const artist = _artist(sequelize);
  const board_detail = _board_detail(sequelize);
  const concert_artist_model = _concert_artist_model(sequelize);
  const concert_info = _concert_info(sequelize);
  const concert_of_interest = _concert_of_interest(sequelize);
  const genre_concert_model = _genre_concert_model(sequelize);
  const genre_of_interest = _genre_of_interest(sequelize);
  const genre = _genre(sequelize);
  const reply = _reply(sequelize);
  const user = _user(sequelize);
  const user_reply = _user_reply(sequelize);

  reply.belongsTo(board_detail, {
    as: "f_board",
    foreignKey: "board_code",
  });
  board_detail.hasMany(reply, {
    as: "f_reply",
    foreignKey: "board_code",
  });
  reply.belongsTo(user, {
    as: "f_user",
    foreignKey: "username",
  });
  user.hasMany(reply, {
    as: "fk_reply",
    foreignKey: "username",
  });

  concert_of_interest.belongsTo(user, {
    foreignKey: "username",
  });
  user.hasMany(concert_of_interest, {
    foreignKey: "username",
  });
  concert_of_interest.belongsTo(concert_info, {
    foreignKey: "concert_code",
  });
  concert_info.hasMany(concert_of_interest, {
    foreignKey: "concert_code",
  });
  artist_of_interest.belongsTo(user, {
    foreignKey: "username",
  });
  user.hasMany(artist_of_interest, {
    foreignKey: "username",
  });
  artist_of_interest.belongsTo(artist, {
    foreignKey: "artist_code",
  });
  artist.hasMany(artist_of_interest, {
    foreignKey: "artist_code",
  });
  genre_of_interest.belongsTo(user, {
    foreignKey: "username",
  });
  user.hasMany(genre_of_interest, {
    foreignKey: "username",
  });
  genre_of_interest.belongsTo(genre, {
    foreignKey: "genre_code",
  });
  genre.hasMany(genre_of_interest, {
    foreignKey: "genre_code",
  });

  genre_concert_model.belongsTo(concert_info, {
    as: "f_concert",
    foreignKey: "concert_code",
  });
  concert_info.hasMany(genre_concert_model, {
    as: "fk_concert",
    foreignKey: "concert_code",
  });
  genre_concert_model.belongsTo(genre, {
    foreignKey: "genre_code",
  });
  genre.hasMany(genre_concert_model, {
    foreignKey: "genre_code",
  });
  artist_genre.belongsTo(artist, {
    foreignKey: "artist_code",
  });
  artist.hasMany(artist_genre, {
    foreignKey: "artist_code",
  });
  artist_genre.belongsTo(genre, {
    foreignKey: "genre_code",
  });
  genre.hasMany(artist_genre, {
    foreignKey: "genre_code",
  });
  concert_artist_model.belongsTo(concert_info, {
    foreignKey: "concert_code",
  });
  concert_info.hasMany(concert_artist_model, {
    foreignKey: "concert_code",
  });
  concert_artist_model.belongsTo(artist, {
    foreignKey: "artist_code",
  });
  artist.hasMany(concert_artist_model, {
    foreignKey: "artist_code",
  });

  return {
    holiday,
    artist_genre,
    artist_of_interest,
    artist,
    board_detail,
    concert_artist_model,
    concert_info,
    concert_of_interest,
    genre_concert_model,
    genre_of_interest,
    genre,
    reply,
    user,
    user_reply,
  };
};

export default initModels;
