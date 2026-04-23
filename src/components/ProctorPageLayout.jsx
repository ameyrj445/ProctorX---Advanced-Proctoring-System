import Navbar from "./Navbar";
import ProctorMainWindow from "./ProctorMainWindow";

export default function ProctorPageLayout() {
    return (
        <div className="flex flex-col
        h-screen w-screen
        bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
            <Navbar />
            <div className="flex-1 h-full overflow-hidden">
                <ProctorMainWindow />
            </div>
        </div>
    )
}
