function randomEmailGenerator(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  result += "@tes.com";
  return result;
}

function randomCuisinesGenerator(length) {
  let data = [];

  for (let index = 0; index < length; index++) {
    data.push({
      name: "tes",
      description: "tes",
      price: "11111",
      imgUrl: "tes",
      authorId: 1,
      categoryId: 1,
    });
  }
  return data;
}

module.exports = { randomEmailGenerator, randomCuisinesGenerator };
