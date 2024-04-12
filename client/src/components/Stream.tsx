import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const Stream = () => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [rtmp, setRtmp] = useState("");
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const [, setScreenMedia] = useState<MediaStream>();
  const [active, setActive] = useState<boolean>(false);
  const socket = io("http://localhost:3000");

  const shareScreen = () => {
    const getScreen = async () => {
      const screen = await navigator.mediaDevices.getDisplayMedia({
        audio: true,
        video: true,
      });
      setScreenMedia(screen);
      if (screenVideoRef.current) {
        screenVideoRef.current.srcObject = screen;
      }
    };
    getScreen();
    setActive(true);
  };

  const stopShare = () => {
    setActive(false);
    mediaStream?.getTracks().forEach((track) => track.stop());
  };

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

    // return () => {
    //   if (mediaStream) {
    //     mediaStream.getTracks().forEach((track) => track.stop());
    //   }
    // };
  }, []);

  useEffect(() => {
    socket.emit("rtmp", rtmp);
  }, [rtmp, socket]);

  return (
    <>
      <main className="flex justify-end items-end min-h-screen flex-col">
        {active ? (
          <>
            <video
              id="screen-media"
              ref={screenVideoRef}
              autoPlay
              muted
              className="absolute"
            ></video>
          </>
        ) : (
          <button className="btn btn-primary m-2" onClick={shareScreen}>
            Share Screen
          </button>
        )}
        <div className="card w-[20vw] bg-base-100 shadow-xl">
          <video id="user-video" ref={userVideoRef} autoPlay muted></video>
          <div className="card-body flex items-center p-4">
            <div className="card-actions justify-between">
              <label className="input input-bordered flex items-center gap-2 w-full">
                <input
                  type="text"
                  className="grow"
                  placeholder="YouTube Stream key"
                  value={rtmp}
                  onChange={(e) => setRtmp(e.target.value)}
                />
              </label>
              <button className="btn btn-primary w-full" onClick={handleStart}>
                Start Stream
              </button>
              {active && (
                <button className="btn btn-primary" onClick={stopShare}>
                  End Stream
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Stream;
