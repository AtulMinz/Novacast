import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Stream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [rtmp, setRtmp] = useState("");
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const socket = io("http://localhost:3000");

  const handleStart = () => {
    if (mediaStream) {
      const mediaRecorder = new MediaRecorder(mediaStream, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
      });

      mediaRecorder.ondataavailable = (e) => {
        console.log("Binary stream", e.data);
        socket.emit("binarystream", e.data);
      };

      mediaRecorder.start();
    }
  };

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const media = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMediaStream(media);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = media;
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    getUserMedia();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    socket.emit("rtmp", rtmp);
  }, [rtmp, socket]);

  return (
    <>
      <main className="flex justify-center items-center min-h-screen">
        <div className="card w-[35vw] bg-base-100 shadow-xl">
          <video id="user-video" ref={userVideoRef} autoPlay muted></video>
          <div className="card-body">
            <h2 className="card-title">Novacast</h2>
            <p>Stream your victory</p>
            <div className="card-actions justify-between">
              <label className="input input-bordered flex items-center gap-2">
                Stream key
                <input
                  type="text"
                  className="grow"
                  placeholder="YouTube Stream key"
                  value={rtmp}
                  onChange={(e) => setRtmp(e.target.value)}
                />
              </label>
              <button className="btn btn-primary" onClick={handleStart}>
                Start Stream
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Stream;
