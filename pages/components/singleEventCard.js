import Image from 'next/image';

const SingleEventCard = (data) => {
    const { index } = data;
    const { hoverIndex } = data;
    const { event } = data;
    const { handleEditClickFunc } = data;
    const { handleMouseLeaveFunc } = data;
    const { handleMouseEnterFunc } = data;
    const { svgPencil } = data;

    if (data)
        return <>
            <div key={index} className="event-card"
                onMouseEnter={() => handleMouseEnterFunc(index)}
                onMouseLeave={handleMouseLeaveFunc}>
                <h4>{event.eventName}</h4>
                <p>{event.eventLocation}</p>
                <p>{event.eventYear}</p>
                <p>{event.eventRole}</p>
                {hoverIndex === index && (
                    <div className="edit-icon" onClick={() => handleEditClickFunc(event)}>
                        <Image alt="pencil icon" height={svgPencil.height} src={svgPencil.src} width={svgPencil.width} />
                    </div>
                )}
            </div>
        </>
}
export default SingleEventCard;