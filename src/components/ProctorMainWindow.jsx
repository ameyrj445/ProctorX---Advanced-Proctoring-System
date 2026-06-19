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
        <div className="w-full h-full p-2 sm:p-3 md:p-4 lg:p-6 overflow-auto">
            <div className={`flex flex-col lg:flex-row justify-between items-stretch
            w-full h-full gap-2 sm:gap-3 md:gap-4 lg:gap-6
            rounded-xl lg:rounded-2xl overflow-hidden
            transition-all duration-300
            ${faceAngles.yaw > 30 || faceAngles.yaw < -30 || faceAngles.yaw === "Face Not Found" 
                ? "bg-gradient-to-r from-red-900/50 via-red-800/30 to-red-900/50 border-2 border-red-500" 
                : "bg-gradient-to-r from-slate-700/30 via-slate-600/30 to-slate-700/30 border border-slate-600"}`}>
                
                {/* Left Panel - Inference */}
                <div className="flex flex-col items-center justify-center flex-1
                bg-gradient-to-br from-slate-800/60 to-slate-900/60
                rounded-lg lg:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-sm border border-slate-700
                min-h-fit lg:min-h-full">
                    <div className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-semibold mb-2 sm:mb-3 md:mb-4">Status</div>
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1 sm:mb-2 text-center">Inference :</div>
                    <div className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-2 sm:mt-3 md:mt-4 lg:mt-6 px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2 md:py-3 lg:py-3 rounded-lg text-center ${inference === "Focused" ? "bg-green-500/20 text-green-300 border border-green-500/50" : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"}`}>
                        {inference || "Loading..."}
                    </div>
                </div>

                {/* Center - Video */}
                <div className="flex-1 lg:flex-2 flex justify-center items-center
                bg-gradient-to-br from-slate-900/80 to-slate-950/80
                rounded-lg lg:rounded-xl p-2 sm:p-3 md:p-4 backdrop-blur-sm border border-slate-700
                overflow-hidden min-h-fit lg:min-h-full">
                    <div className="relative w-full h-full flex justify-center items-center">
                        <video 
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            width={640}
                            height={480}
                            className="rounded-lg border-2 border-cyan-500/30 max-w-full h-auto max-h-full object-contain"
                        />
                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 bg-cyan-500/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border border-cyan-500/50">
                            <span className="text-cyan-300 text-xs sm:text-sm font-medium">Live</span>
                        </div>
                    </div>
                </div>
                                     
                {/* Right Panel - Capture Data */}
                <div className="flex flex-col items-center justify-center flex-1
                bg-gradient-to-br from-slate-800/60 to-slate-900/60
                rounded-lg lg:rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 backdrop-blur-sm border border-slate-700
                min-h-fit lg:min-h-full">
                    <div className="text-xs sm:text-sm uppercase tracking-widest text-purple-400 font-semibold mb-2 sm:mb-3 md:mb-4">Head Pose</div>
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 md:mb-6 text-center">Capture Data :</div>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full">
                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-slate-600">
                            <h2 className="text-xs sm:text-sm text-slate-400 font-semibold mb-0.5 sm:mb-1">Pitch</h2>
                            <p className="text-lg sm:text-2xl md:text-3xl font-mono font-bold text-blue-400 truncate">{faceAngles.pitch}</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-slate-600">
                            <h2 className="text-xs sm:text-sm text-slate-400 font-semibold mb-0.5 sm:mb-1">Yaw</h2>
                            <p className="text-lg sm:text-2xl md:text-3xl font-mono font-bold text-purple-400 truncate">{faceAngles.yaw}</p>
                        </div>
                        <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 md:p-4 border border-slate-600">
                            <h2 className="text-xs sm:text-sm text-slate-400 font-semibold mb-0.5 sm:mb-1">Roll</h2>
                            <p className="text-lg sm:text-2xl md:text-3xl font-mono font-bold text-pink-400 truncate">{faceAngles.roll}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}                                  