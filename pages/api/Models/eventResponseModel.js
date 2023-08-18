
const EventModel = (myCurrentEvents) => {
    if (myCurrentEvents.meta.total == 0)
        return []
    
    var tempEvents = []
    myCurrentEvents.data.map(x => x).forEach((x, index) => {
        tempEvents.push(
            {
                id: index + 1,
                eventUID:x.uid,
                eventName: x.attributes.eventName,
                eventYear: x.attributes.eventYear,
                eventLocation: x.attributes.eventLocation,
                eventRole: x.attributes.eventRole,
                userId:x.attributes.userId
            }
        );
    });

    return tempEvents;
}
export default EventModel