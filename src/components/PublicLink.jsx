export const PublicLink = ({ url, title, docId }) => {
  return (
    <div className="flex justify-center" key={docId}>
      <a
        className="text-center mb-4 text-3xl text-slate-100 hover:text-black"
        target="_blank"
        href={url}
        rel="noreferrer"
      >
        {title}
      </a>
    </div>
  );
};
