import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/bookmark.module.css";

interface Bookmark {
  id: string;
  href: string;
  icon: string;
  label: string;
}

const defaultBookmarks: Bookmark[] = [
  { id: "1", href: "https://github.com", icon: "bi-github", label: "GitHub" },
  {
    id: "2",
    href: "https://discord.com/channels/@me",
    icon: "bi-discord",
    label: "Discord",
  },
  { id: "3", href: "https://youtube.com", icon: "bi-youtube", label: "YouTube" },
  {
    id: "4",
    href: "https://music.youtube.com/",
    icon: "bi-music-note-beamed",
    label: "YouTube Music",
  },
  { id: "5", href: "https://chat.openai.com/", icon: "bi-robot", label: "ChatGPT" },
  {
    id: "6",
    href: "https://www.instagram.com/",
    icon: "bi-instagram",
    label: "Instagram",
  },
];

function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : defaultBookmarks;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [newBookmark, setNewBookmark] = useState({ href: "", label: "", icon: "" });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAddBookmark = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newBookmark.href && newBookmark.label) {
      const bookmark: Bookmark = {
        id: Date.now().toString(),
        href: newBookmark.href.startsWith("http")
          ? newBookmark.href
          : `https://${newBookmark.href}`,
        label: newBookmark.label,
        icon: newBookmark.icon || newBookmark.label.charAt(0).toUpperCase(),
      };
      setBookmarks([...bookmarks, bookmark]);
      setNewBookmark({ href: "", label: "", icon: "" });
      setIsAdding(false);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBookmark((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.bookmarksContainer}>
      <div className={styles.bookmarksGrid}>
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} className={styles.bookmarkWrapper}>
            <a
              href={bookmark.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.bookmarkLink}
              title={bookmark.label}
            >
              {bookmark.icon.startsWith("bi-") ? (
                <i className={`bi ${bookmark.icon}`}></i>
              ) : (
                <span className={styles.customIcon}>{bookmark.icon}</span>
              )}
              <span className={styles.bookmarkLabel}>{bookmark.label}</span>
            </a>
            {isRemoving && (
              <button
                className={styles.removeButton}
                onClick={() => handleRemoveBookmark(bookmark.id)}
                aria-label={`Remove ${bookmark.label}`}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={() => {
            setIsAdding(!isAdding);
            setIsRemoving(false);
          }}
          title="Add Bookmark"
        >
          <i className={`bi ${isAdding ? "bi-x-lg" : "bi-plus-circle"}`}></i>
          <span>{isAdding ? "Cancel" : "Add"}</span>
        </button>

        <button
          className={styles.controlButton}
          onClick={() => {
            setIsRemoving(!isRemoving);
            setIsAdding(false);
          }}
          title="Remove Bookmarks"
        >
          <i className={`bi ${isRemoving ? "bi-x-lg" : "bi-trash"}`}></i>
          <span>{isRemoving ? "Cancel" : "Remove"}</span>
        </button>
      </div>

      {isAdding && (
        <div className={styles.addForm}>
          <form onSubmit={handleAddBookmark}>
            <input
              type="text"
              name="label"
              placeholder="Bookmark Name"
              value={newBookmark.label}
              onChange={handleInputChange}
              required
              autoFocus
            />
            <input
              type="text"
              name="href"
              placeholder="URL (e.g., github.com)"
              value={newBookmark.href}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="icon"
              placeholder="Icon (optional, e.g., bi-github)"
              value={newBookmark.icon}
              onChange={handleInputChange}
            />
            <button type="submit" className={styles.submitButton}>
              Add Bookmark
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Bookmarks;
