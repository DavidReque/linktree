import { useState, useRef, useEffect } from "react";

export default function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, [editTitle]);

  useEffect(() => {
    if (urlRef.current) {
      urlRef.current.focus();
    }
  }, [editUrl]);

  function handleEditTitle() {
    setEditTitle(true);
  }

  function handleEditUrl() {
    setEditUrl(true);
  }

  function handleChangeTitle(e) {
    setCurrentTitle(e.target.value);
  }

  function handleChangeUrl(e) {
    setCurrentUrl(e.target.value);
  }

  function handleBlurTitle(e) {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleBlurUrl(e) {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  }

  function handleDelete() {
    onDelete(docId);
  }

  return (
    <div
      className="flex items-center bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/50 h-44 mb-10 p-4 w-4/5"
      key={docId}
    >
      <div className="py-2 px-3 w-full">
        <div className="font-extrabold py-4 pt-0 pb-5">
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                type="text"
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              <button
                className="bg-green-500 p-2 rounded-xl hover:opacity-70 mr-3"
                onClick={handleEditTitle}
              >
                <span className="material-symbols-outlined text-white mr-2">
                  edit
                </span>
                <span className="text-white text-base font-semibold">
                  Editar
                </span>
              </button>
              {currentTitle}
            </>
          )}
        </div>
        <div className="text-zinc-300 lowercase font-medium">
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                type="text"
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <button
                onClick={handleEditUrl}
                className="bg-green-500 p-2 rounded-xl hover:opacity-70 mr-3"
              >
                \
                <span className="material-symbols-outlined text-white mr-2">
                  edit
                </span>
                <span className="text-white text-base font-semibold">
                  Editar
                </span>
              </button>
              {currentUrl}
            </>
          )}
        </div>
      </div>

      <div className="flex items-stretch content-stretch">
        <button
          className="bg-red-500 p-2 rounded-xl hover:opacity-70 m-2 flex items-center justify-center"
          onClick={handleDelete}
        >
          <span className="material-symbols-outlined text-white mr-2">
            delete
          </span>
          <span className="text-white text-base font-semibold">Eliminar</span>
        </button>
      </div>
    </div>
  );
}
