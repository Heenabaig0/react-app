"use client";

import { FormEvent, useState } from "react";
import { addTodo, deleteTodo, updateTodo } from "@/store/todosSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./todo-app.module.css";

export default function TodoApp() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.todos.items);
  const [draft, setDraft] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const t = draft.trim();
    if (!t) return;
    dispatch(addTodo(t));
    setDraft("");
  }

  function startEdit(id: string, text: string) {
    setEditingId(id);
    setEditText(text);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditText("");
  }

  function saveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    const t = editText.trim();
    if (!t) return;
    dispatch(updateTodo({ id: editingId, text: t }));
    cancelEdit();
  }

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>To-do list</h1>
      <p className={styles.subtitle}>
        Add tasks, edit them inline, or remove them. State lives in Redux Toolkit.
      </p>

      <form className={styles.form} onSubmit={handleAdd}>
        <input
          className={styles.input}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New task"
        />
        <button className={styles.btnPrimary} type="submit" disabled={!draft.trim()}>
          Add
        </button>
      </form>

      {items.length === 0 ? (
        <p className={styles.empty}>No tasks yet. Add one above.</p>
      ) : (
        <ul className={styles.list}>
          {items.map((todo) => (
            <li key={todo.id} className={styles.item}>
              {editingId === todo.id ? (
                <form className={styles.editRow} onSubmit={saveEdit}>
                  <input
                    className={styles.input}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    aria-label="Edit task"
                    autoFocus
                  />
                  <button
                    className={styles.btnPrimary}
                    type="submit"
                    disabled={!editText.trim()}
                  >
                    Save
                  </button>
                  <button
                    className={styles.btnSecondary}
                    type="button"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span className={styles.text}>{todo.text}</span>
                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => startEdit(todo.id, todo.text)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className={styles.btnDanger}
                      onClick={() => dispatch(deleteTodo(todo.id))}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
