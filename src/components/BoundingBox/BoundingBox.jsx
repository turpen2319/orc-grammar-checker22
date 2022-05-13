export default function BoundingBox({ left, right, top, bottom, width, height }) {
    return (
        <div style={{
            position: 'absolute',
            left: `${left}%`,
            right: `${right}%`,
            top: `${top}%`,
            bottom: `${bottom}%`,
            borderBottom: 'solid 2px limegreen',
            backgroundColor: "rgba(68,205,77, 0.2)",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}></div>
    )
}

// left: `${left}px`,
// right: `${right}px`,
// top: `${top}px`,
// bottom: `${bottom}px`,