const UserLoader = () => (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center">
      <h1 className="text-6xl font-extrabold text-white">Loading</h1>
      <div className="m-8 flex space-x-2">
        <div className="h-4 w-4 animate-ping rounded-full bg-white" />
        <div className="h-4 w-4 animate-ping rounded-full bg-white" style={{ animationDelay: '0.1s' }} />
        <div className="h-4 w-4 animate-ping rounded-full bg-white" style={{ animationDelay: '0.2s' }} />
      </div>
    </div>
  </div>
);
export default UserLoader;
