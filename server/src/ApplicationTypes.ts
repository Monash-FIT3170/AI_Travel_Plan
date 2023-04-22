interface Daily_Itinerary {
    day: number
    date: Date
    events: [Event]
}
interface Event1 {
    name: string
    address: string | null
    description: string | null
    startTime: Date | null
    endTime: Date | null
    cost: number | null
}
interface Travel_Itinerary {
    startDate: Date
    endDate: Date
    schedule: [Daily_Itinerary]
}
interface Chat_Message {
    message: string
    chatHistory: Travel_Itinerary | String
}
export { Daily_Itinerary, Event1, Travel_Itinerary, Chat_Message }