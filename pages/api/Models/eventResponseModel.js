
const EventModel = (myCurrentEvents) => {
    if (myCurrentEvents.meta.total == 0)
        return []
    
    var tempEvents = []
    myCurrentEvents.data.map(x => x.attributes).forEach((x, index) => {
        tempEvents.push(
            {
                id: index + 1,
                eventName: x.eventName,
                eventYear: x.eventYear,
                eventLocation: x.eventLocation,
                eventRole: x.eventRole
            }
        );
    });

    return tempEvents;
}
export default EventModel