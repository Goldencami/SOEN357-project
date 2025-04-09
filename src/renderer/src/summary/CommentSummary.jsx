function CommentSummary({ data }) {
    return (
        <div className='all-comments'>
            <p >Comments:</p>
            <p>{data}</p>
        </div>
    )
}

export default CommentSummary