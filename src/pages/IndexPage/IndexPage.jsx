import ImageGrid from "../../components/ImageGrid/ImageGrid";
import ResponsiveDrawer from "../../components/ResponsiveDrawer/ResponsiveDrawer";


export default function ImagePage({user, setUser}) {
    return (
        <>
            <ResponsiveDrawer user={user} setUser={setUser} bodyComponent={<ImageGrid />}/>
        </>
    )
}