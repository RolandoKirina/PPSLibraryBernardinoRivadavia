import { useState, useEffect } from "react";

export const useAuthorManager = (initialAuthors) => {
  const getStoredAuthors = () => {
    const stored = localStorage.getItem("authors");
    if (!stored || stored === "[]") {
      return initialAuthors;
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing authors:", error);
      return initialAuthors;
    }
  };

  const [authors, setAuthors] = useState(getStoredAuthors());

  useEffect(() => {
    localStorage.setItem("authors", JSON.stringify(authors));
  }, [authors]);

  // GET BY ID
  const getAuthor = (authorId) => {
    const found = authors.find((author) => author.authorId === authorId);
    if (!found) console.warn(`Autor con ID ${authorId} no encontrado`);
    return found;
  };

  // CREATE
  const createAuthor = (newAuthor) => {
    setAuthors((prev) => [...prev, newAuthor]);
  };

  // UPDATE
  const updateAuthor = (authorId, updatedData) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.authorId === authorId ? { ...author, ...updatedData } : author
      )
    );
  };

  // DELETE
  const deleteAuthor = (authorId) => {
    setAuthors((prev) =>
      prev.filter((author) => author.authorId !== authorId)
    );
  };

  return {
    authors,
    getAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor
  };
};
