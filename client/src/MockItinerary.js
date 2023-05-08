/*
This is a mock itinerary for a 6-day trip to Japan (Tokyo, Kyoto, Osaka) in JavaScript object format.
*/

// mock events
const mockEvent1 = {
  name: "Ueno Park, Tokyo",
  address: "110-0007 Tokyo Ueno Park, Taito-ku, 5-20",
  description:
    "The Ueno park is officially called the “Ueno Imperial Gift Park “ because it was a gift from Emperor Taisho to Tokyo city as a place of public recreation. The park is rich with greenery and birds during winter. This park also includes many other attractions in it.",
  startTime: new Date("2023-05-26T13:00:00.000Z"),
  endTime: new Date("2023-05-26T16:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent2 = {
  name: "Akihabaraeki, Tokyo",
  address: "Taito City, Tokyo, Japan",
  description:
    "The bustling neighborhood of Akihabara is one of the largest hubs for electronics retailers.",
  startTime: new Date("2023-05-26T17:00:00.000Z"),
  endTime: new Date("2023-05-26T18:30:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent3 = {
  name: "Meiji Jingu Shrine, Tokyo",
  address: "1-1 Yoyogikamizonocho, Shibuya, Tokyo 151-8557, Japan",
  description:
    "Meiji Jingu Shrine in Tokyo is one of the numerous places which take you closer to the Japanese culture. It is a great destination to visit for those who love the old world charm.",
  startTime: new Date("2023-05-27T11:00:00.000Z"),
  endTime: new Date("2023-05-27T14:30:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent4 = {
  name: "Harajuku, Tokyo",
  address: "Harajuku, Tokyo",
  description:
    "Harajuku is the trendiest shopping area in Tokyo. Shops full of funky and unique clothes and cafes make this area a popular hangout.",
  startTime: new Date("2023-05-27T15:15:00.000Z"),
  endTime: new Date("2023-05-27T20:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent5 = {
  name: "Tokyo Disneyland",
  address: "1-1 Maihama, Urayasu, Chiba Prefecture 279-0031, Japan",
  description:
    "It is a getaway into the world of fantasy and the rides are all filled with generous doses of cuteness and grandeur.",
  startTime: new Date("2023-05-28T10:00:00.000Z"),
  endTime: new Date("2023-05-28T20:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent6 = {
  name: "Kiyomizu-Dera, Kyoto",
  address:
    "294 Kiyomizu 1-chome, Higashiyama Ward, Kyoto, Kyoto Prefecture 605-0862, Japan",
  description:
    "Established in the year 778, the Kiyomizu-dera is located halfway up the Otowa Mountain in eastern Kyoko. ",
  startTime: new Date("2023-05-29T13:00:00.000Z"),
  endTime: new Date("2023-05-29T15:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent7 = {
  name: "Arashiyama, Kyoto",
  address: "Ukyo Ward, Kyoto, Japan",
  description:
    "A district in Kyoto which is well known for its Bamboo Grove. It is situated along the base of the Arashiyama Mountains (Storm Mountains) and is a nationally-designated Historic Site.",
  startTime: new Date("2023-05-29T15:30:00.000Z"),
  endTime: new Date("2023-05-29T19:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent8 = {
  name: "Fushimi Inari-Taisha, Kyoto",
  address: "68 Fukakusa Yabunouchicho, Fushimi Ward, Kyoto, Japan",
  description:
    "The Fushimi Inari-Taisha is an important Shinto shrine situated in southern Kyoto. It is the most important of several thousands of shrines dedicated to Inari, the Shinto god of rice.",
  startTime: new Date("2023-05-30T10:30:00.000Z"),
  endTime: new Date("2023-05-30T13:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent9 = {
  name: "Kinkaku-Ji, Kyoto",
  address: "1 Kinkakujicho, Kita Ward, Kyoto, Kyoto Prefecture 603-8361, Japan",
  description:
    "A Zen temple situated in the northern part of Kyoto. The top two floors of the temple are completely covered in gold leaf.",
  startTime: new Date("2023-05-30T14:30:00.000Z"),
  endTime: new Date("2023-05-30T16:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent10 = {
  name: "Pontocho, Kyoto",
  address: "Pontocho, Kyoto",
  description:
    "A small charming alley running between Sanjo-dori and Shifo-dori, Pontocho is the place to be to gorge on delicious food. Said to be one of Kyoto most atmospheric dining areas, the alley is lined with many restaurants, dining rooms, tea houses and cafes. ",
  startTime: new Date("2023-05-30T17:30:00.000Z"),
  endTime: new Date("2023-05-30T20:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent11 = {
  name: "Tennoji Zoo, Osaka",
  address:
    "1-108 Chausuyamacho, Tennoji Ward, Osaka, Osaka Prefecture 543-0063, Japan",
  description:
    "With 1500 animals representing over 300 species, in a space spread out over 100 thousand square meters, the Tennoji Zoo is one of the largest in Japan.",
  startTime: new Date("2023-05-31T10:30:00.000Z"),
  endTime: new Date("2023-05-31T13:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

const mockEvent12 = {
  name: "Dotonbori Area, Osaka",
  address: "Dotonbori Area, Osaka",
  description:
    "Dotonbori Area is one of Osaka most popular localities. It is a street that runs parallel to the Dotonbori canal. Having lots of malls, shops and restaurants around, it is a popular shopping and entertainment district. ",
  startTime: new Date("2023-05-31T13:30:00.000Z"),
  endTime: new Date("2023-05-31T19:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

// mock daily itinerary
const mockDaily_Itinerary1 = {
  day: 1,
  date: new Date("2023-05-26"),
  events: [mockEvent1, mockEvent2],
};

const mockDaily_Itinerary2 = {
  day: 2,
  date: new Date("2023-05-27"),
  events: [mockEvent3, mockEvent4],
};

const mockDaily_Itinerary3 = {
  day: 3,
  date: new Date("2023-05-28"),
  events: [mockEvent5],
};

const mockDaily_Itinerary4 = {
  day: 4,
  date: new Date("2023-05-29"),
  events: [mockEvent6, mockEvent7],
};

const mockDaily_Itinerary5 = {
  day: 5,
  date: new Date("2023-05-30"),
  events: [mockEvent8, mockEvent9, mockEvent10],
};

const mockDaily_Itinerary6 = {
  day: 6,
  date: new Date("2023-05-31"),
  events: [mockEvent11, mockEvent12],
};

// mock travel itinerary
export const mockTravel_Itinerary1 = {
  startDate: new Date("2023-05-26"),
  endDate: new Date("2023-05-31"),
  schedule: [
    mockDaily_Itinerary1,
    mockDaily_Itinerary2,
    mockDaily_Itinerary3,
    mockDaily_Itinerary4,
    mockDaily_Itinerary5,
    mockDaily_Itinerary6,
  ],
};
