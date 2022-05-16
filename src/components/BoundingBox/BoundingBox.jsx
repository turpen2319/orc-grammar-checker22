export default function BoundingBox({ left, right, top, bottom, issueType }) {
    const backgroundColor = issueType === 'misspelling' ? 'rgba(215, 52, 53, 0.25)' : 'rgba(83, 110, 217, 0.4)';
    const borderColor = issueType === 'misspelling' ? 'var(--red)' : 'var(--blue)';
    return (
        <div style={{
            position: 'absolute',
            left: `${left}%`,
            right: `${right}%`,
            top: `${top}%`,
            bottom: `${bottom}%`,
            borderBottom: `solid 2px ${borderColor}`,
            backgroundColor: `${backgroundColor}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}></div>
    )
}