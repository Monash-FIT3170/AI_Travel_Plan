import Background from "../components/Background"
import BackgroundImage from "../components/BackgroundImage"
import { EventCardView } from "../components/EventCardView"


const mockevent = {
  name: "Ueno Park, Tokyo",
  address: "110-0007 Tokyo Ueno Park, Taito-ku, 5-20",
  description:
    "The Ueno park is officially called the “Ueno Imperial Gift Park “ because it was a gift from Emperor Taisho to Tokyo city as a place of public recreation. The park is rich with greenery and birds during winter. This park also includes many other attractions in it.",
  startTime: new Date("2023-05-26T13:00:00.000Z"),
  endTime: new Date("2023-05-26T16:00:00.000Z"),
  cost: 0,
  chatResponse: "",
};

export function ItineraryRight(){
    return (
        <div>
            <BackgroundImage/>
            <Background>
            <EventCardView event={mockevent}></EventCardView>
            </Background>
        </div>

    )
}