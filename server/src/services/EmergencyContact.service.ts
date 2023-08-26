import { EmergencyContact } from "../models/emergencyContact.model";

const axios = require("axios");

export async function getEmergencyContact(
  country: string
): Promise<EmergencyContact> {
  const url = "https://emergencynumberapi.com/api/country/" + country;

  const emergencyContact: EmergencyContact = {
    country: {
      countryName: "",
      countryISOCode: "",
      countryISONumeric: "",
    },
    fireNumber: "",
    policeNumber: "",
    ambulanceNumber: "",
    universalNumber: "",
  };

  try {
    const response = await axios.get(url);
    console.log(response.data);
    if (response.data.error == "No Data for this Territory") {
      emergencyContact.universalNumber =
        "Your Data seems to be lost on the way";
    }
    else if (response.status != 200 && response.status != 201) {
      emergencyContact.universalNumber =
        "Error occured while fetching";
    } else {
      emergencyContact.country.countryName = response.data.data.country.name;
      emergencyContact.country.countryISOCode =
        response.data.data.country.ISOCode;
      emergencyContact.country.countryISONumeric =
        response.data.data.country.ISONumeric;
      emergencyContact.fireNumber = response.data.data.fire.all[0];
      emergencyContact.policeNumber = response.data.data.police.all[0];
      emergencyContact.ambulanceNumber = response.data.data.ambulance.all[0];
      emergencyContact.universalNumber = response.data.data.dispatch.all == null ? response.data.data.dispatch.fixed[0] : response.data.data.dispatch.all[0];
      if (response.data.data.member_112 == true && emergencyContact.universalNumber == "") {
        emergencyContact.universalNumber = "112";
      }
    }
  } catch (error) {
    console.log(error);
    emergencyContact.universalNumber = "Error occured while fetching";
  }
  return emergencyContact;
}
