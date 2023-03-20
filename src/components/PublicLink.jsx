export const PublicLink = ({ url, title, docId }) => {
  return (
    <div key={docId}>
      <a
        className="flex justify-center bg-transparent border-2 border-white h-16 mt-3 mb-5 p-3 rounded-xl hover:bg-slate-100 hover:border-slate-100 hover:text-black text-center text-3xl text-slate-100"
        target="_blank"
        href={url}
        rel="noreferrer"
      >
        {title}
      </a>
    </div>
  );
};
