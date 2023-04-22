interface Daily_Itinerary {
    day: number
    date: Date
    events: Event[]
}
interface Event {
    name: string
    address: string
    description?: string
    startTime: Date
    endTime: Date
    cost?: number
    chatResponse?: string
}
interface Travel_Itinerary {
    startDate: Date
    endDate: Date
    schedule?: Daily_Itinerary[]
}
interface Chat_Message {
    message: string
    chatHistory: Travel_Itinerary | String
}
export { Daily_Itinerary, Event, Travel_Itinerary, Chat_Message }