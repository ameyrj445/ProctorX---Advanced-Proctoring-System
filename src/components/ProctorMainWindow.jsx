import { useRef, useEffect, useState } from "react";
import { FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { computeHeadPose } from "../utils/headPoseUtils.js";

export default function ProctorMainWindow() {

    const FACE_NOT_FOUND_MESSAGE = "Face Not Found"

    const KEY_LANDMARK_INDICES = [1, 9, 57, 130, 287, 359];

    const videoRef = useRef(null);
    const faceLandmarkerRef = useRef(null);
    const [faceAngles, setFaceAngles] = useState({
        pitch: 0,
        yaw: 0,
        roll: 0
    });
    const [inference, setInference] = useState("");

    function updateInference(yaw) {
        if (yaw > 30)
            setInference("Looking Right");
        else if (yaw < -30)
            setInference("Looking Left");
        else
            setInference("Focused");
    }

    useEffect(() => {
        const init = async () => {
            // 1. Load wasm files
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
            );

            // 2. Init FaceLandmarker with VIDEO mode
            const faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath:
                        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                },
                runningMode: "VIDEO",
            });

            faceLandmarkerRef.current = faceLandmarker;

            // 3. Init camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.onloadeddata = () => {
                    requestAnimationFrame(detectFace);
                };
            }
        };

        init();
    }, []);

    // 3. Frame loop for detection
    const detectFace = async (timestamp) => {
        if (
            faceLandmarkerRef.current &&
            videoRef.current &&
            !videoRef.current.paused &&
            !videoRef.current.ended
        ) {
            const results = faceLandmarkerRef.current.detectForVideo(
                videoRef.current,
                timestamp
            );

            if (results.faceLandmarks[0]) {
                let key_landmarks = KEY_LANDMARK_INDICES.map(key_index => results.faceLandmarks[0][key_index]);
                let result = await computeHeadPose(key_landmarks)
                setFaceAngles({
                    pitch: String(Math.trunc(result.rotation.pitch * 100)).padEnd(FACE_NOT_FOUND_MESSAGE.length, " "),
                    yaw: String((Math.trunc(result.rotation.yaw * 100) - 10)).padEnd(FACE_NOT_FOUND_MESSAGE.length, " "),
                    roll: String(Math.trunc(result.rotation.roll * 100)).padEnd(FACE_NOT_FOUND_MESSAGE.length, " ")
                })
                updateInference(result.rotation.yaw * 100 - 10);
            } else {
                setFaceAngles({
                    pitch: FACE_NOT_FOUND_MESSAGE,
                    yaw: FACE_NOT_FOUND_MESSAGE,
                    roll: FACE_NOT_FOUND_MESSAGE
                })
            }
        }
        requestAnimationFrame(detectFace);
    };

    return (
        <div className="w-full h-full p-6">
            <div className={`flex flex-row justify-around items-stretch
            w-full h-full gap-6
            rounded-2xl overflow-hidden
            transition-all duration-300
            ${faceAngles.yaw > 30 || faceAngles.yaw < -30 || faceAngles.yaw === "Face Not Found" 
                ? "bg-gradient-to-r from-red-900/50 via-red-800/30 to-red-900/50 border-2 border-red-500" 
                : "bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 border border-slate-600"}`}>
                
                {/* Left Panel - Inference */}
                <div className="flex flex-col items-center justify-center flex-1
                bg-gradient-to-br from-slate-800/60 to-slate-900/60
                rounded-xl p-8 backdrop-blur-sm border border-slate-700">
                    <div className="text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-4">Status</div>
                    <div className="text-5xl font-bold text-white mb-2">Inference :</div>
                    <div className={`text-4xl font-bold mt-6 px-6 py-3 rounded-lg
                    ${inference === "Focused" 
                        ? "bg-green-500/20 text-green-300 border border-green-500/50" 
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"}`}>
                        {inference || "Loading..."}
                    </div>
                </div>

                {/* Center - Video */}
                <div className="flex-2 flex justify-center items-center
                bg-gradient-to-br from-slate-900/80 to-slate-950/80
                rounded-xl p-4 backdrop-blur-sm border border-slate-700
                overflow-hidden">
                    <div className="relative">
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            muted 
                            width={640} 
                            height={480}
                            className="rounded-lg border-2 border-cyan-500/30"
                        />
                        <div className="absolute top-4 right-4 bg-cyan-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-cyan-500/50">
                            <span className="text-cyan-300 text-sm font-medium">Live</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Capture Data */}
                <div className="flex flex-col items-center justify-center flex-1
                bg-gradient-to-br from-slate-800/60 to-slate-900/60
                rounded-xl p-8 backdrop-blur-sm border border-slate-700">
                    <div className="text-sm uppercase tracking-widest text-purple-400 font-semibold mb-4">Head Pose</div>
                    <div className="text-2xl font-bold text-white mb-6">Capture Data :</div>
                    <div className="space-y-4 w-full">
                        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                            <h2 className="text-sm text-slate-400 font-semibold mb-1">Pitch</h2>
                            <p className="text-3xl font-mono font-bold text-blue-400">{faceAngles.pitch}</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                            <h2 className="text-sm text-slate-400 font-semibold mb-1">Yaw</h2>
                            <p className="text-3xl font-mono font-bold text-purple-400">{faceAngles.yaw}</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                            <h2 className="text-sm text-slate-400 font-semibold mb-1">Roll</h2>
                            <p className="text-3xl font-mono font-bold text-pink-400">{faceAngles.roll}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}