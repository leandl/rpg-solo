import { useCallback, useEffect, useMemo, useState } from "react";
import "./typewriter-notebook-styles.css";
import { typewriter } from "../../utils/sounds/typewriter";
import { Tabs } from "../../components/tabs";

type NotePage = {
  id: string;
  title: string;
  content: string;
};

const STORAGE_KEY = "typewriter-notebook";

function createNewPage(noteNumber: number = 1): NotePage {
  const id = crypto.randomUUID();
  return {
    id,
    title: `Anotação ${noteNumber}`,
    content: "",
  };
}

export function TypewriterNotebook() {
  const [pages, setPages] = useState<Record<string, NotePage>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    const firstPage = createNewPage();

    return {
      [firstPage.id]: firstPage,
    };
  });

  const pagesList = useMemo(() => Object.values(pages), [pages]);
  const [activePageId, setActivePageId] = useState(() => pagesList[0].id);

  const enableDeleteButton = pagesList.length > 1;

  const handleChangePageData = (
    pageId: string,
    attr: keyof NotePage,
    newValue: string,
  ) => {
    setPages((prevPages) => ({
      ...prevPages,
      [pageId]: {
        ...prevPages[pageId],
        [attr]: newValue,
      },
    }));
  };

  const handleAddNewPage = useCallback(() => {
    const newPage = createNewPage(pagesList.length + 1);
    setPages((prevPages) => ({
      ...prevPages,
      [newPage.id]: newPage,
    }));
  }, [pagesList.length]);

  const handleDeletePage = useCallback(
    (pageId: string) => {
      if (!enableDeleteButton) return;

      const nextPages = { ...pages };
      delete nextPages[pageId];

      setPages(nextPages);

      if (activePageId === pageId) {
        setActivePageId(Object.keys(nextPages)[0]);
      }
    },
    [pages, activePageId, enableDeleteButton],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    }, 500);

    return () => clearTimeout(timeout);
  }, [pages]);

  return (
    <div className="typewriter-notebook-container">
      <Tabs.Root
        defaultValue={activePageId}
        value={activePageId}
        onValueChange={setActivePageId}
      >
        <div className="tabs-container">
          <Tabs.List>
            <Tabs.Tab className="new-tab-btn" onClick={handleAddNewPage}>
              +
            </Tabs.Tab>
            {pagesList.map((page) => (
              <Tabs.Tab key={page.id} value={page.id}>
                {page.title}
                {enableDeleteButton && (
                  <div
                    className="delete-tab-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                  >
                    ✕
                  </div>
                )}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </div>

        {pagesList.map((page) => (
          <Tabs.Content key={page.id} value={page.id}>
            <main className="paper">
              <input
                className="title-input"
                value={page.title}
                placeholder="Título..."
                onChange={(e) =>
                  handleChangePageData(page.id, "title", e.target.value)
                }
                onKeyDown={typewriter.onKeyDown}
              />

              <textarea
                className="editor"
                value={page.content}
                placeholder="Comece a escrever..."
                onChange={(e) =>
                  handleChangePageData(page.id, "content", e.target.value)
                }
                onKeyDown={typewriter.onKeyDown}
              />
            </main>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
