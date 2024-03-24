const Stream = () => {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="card w-[35vw] bg-base-100 shadow-xl">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Novacast</h2>
          <p>Stream your victory</p>
          <div className="card-actions justify-between">
            <label className="input input-bordered flex items-center gap-2">
              Stream URL
              <input type="text" className="grow" placeholder="YouTube RTMP" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Stream key
              <input
                type="password"
                className="grow"
                placeholder="YouTube Stream key"
              />
            </label>
            <button className="btn btn-primary">Start Stream</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Stream;
