function TrackerSummary({ attack, data }) {
    const {
        open_left = 0,
        open_right = 0,
        closed_left = 0,
        closed_right = 0,
        trunk = 0,
        head = 0,
        hasScored = 0,
    } = data;
    
    return(
        <>
        <tr className='move-row'>
            <td>{attack}</td>
            <td><p className='tracker'>{open_left}</p></td>
            <td><p className='tracker'>{open_right}</p></td>
            <td><p className='tracker'>{closed_left}</p></td>
            <td><p className='tracker'>{closed_right}</p></td>
            <td><p className='tracker'>{trunk}</p></td>
            <td><p className='tracker'>{head}</p></td>
            <td><p className='tracker'>{hasScored}</p></td>
        </tr>
        </>
    )
}

export default TrackerSummary