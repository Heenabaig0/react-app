"use client";

import { FormEvent, useState } from "react";
import {
  addShoppingItem,
  deleteShoppingItem,
  toggleBought,
  updateShoppingItem,
} from "@/store/shoppingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import styles from "./shopping-app.module.css";

export default function ShoppingApp() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.shopping.items);

  const [nameDraft, setNameDraft] = useState("");
  const [qtyDraft, setQtyDraft] = useState("1");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editQty, setEditQty] = useState("1");

  function toQuantity(value: string) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return 1;
    return Math.max(1, Math.floor(parsed));
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault();
    const name = nameDraft.trim();
    if (!name) return;

    dispatch(addShoppingItem(name, toQuantity(qtyDraft)));
    setNameDraft("");
    setQtyDraft("1");
  }

  function startEdit(id: string, name: string, quantity: number) {
    setEditingId(id);
    setEditName(name);
    setEditQty(String(quantity));
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditQty("1");
  }

  function saveEdit(e: FormEvent) {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;

    dispatch(
      updateShoppingItem({
        id: editingId,
        name: editName,
        quantity: toQuantity(editQty),
      })
    );
    cancelEdit();
  }

  return (
    <div className={styles.page}>
      <span className={styles.heartsLeft} aria-hidden>
        ♡ ♡ ♡
      </span>
      <span className={styles.heartsRight} aria-hidden>
        ♡ ♡ ♡
      </span>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Shopping list</h1>
        <p className={styles.subtitle}>
          Add items with quantity, mark them as bought, and edit details inline.
        </p>

        <form className={styles.form} onSubmit={handleAdd}>
          <input
            className={styles.input}
            type="text"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="Item name"
            aria-label="Item name"
          />
          <input
            className={styles.qtyInput}
            type="number"
            min={1}
            value={qtyDraft}
            onChange={(e) => setQtyDraft(e.target.value)}
            aria-label="Quantity"
          />
          <button className={styles.btnPrimary} type="submit" disabled={!nameDraft.trim()}>
            <span className={styles.cartIcon} aria-hidden>
              🛒
            </span>
            <span className={styles.srOnly}>Add to shopping list</span>
          </button>
        </form>

        {items.length === 0 ? (
          <p className={styles.empty}>No items yet. Add one above.</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                {editingId === item.id ? (
                  <form className={styles.editRow} onSubmit={saveEdit}>
                    <input
                      className={styles.input}
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      aria-label="Edit item name"
                      autoFocus
                    />
                    <input
                      className={styles.qtyInput}
                      type="number"
                      min={1}
                      value={editQty}
                      onChange={(e) => setEditQty(e.target.value)}
                      aria-label="Edit quantity"
                    />
                    <button className={styles.btnPrimary} type="submit" disabled={!editName.trim()}>
                      Save
                    </button>
                    <button className={styles.btnSecondary} type="button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <label className={styles.itemMain}>
                      <input
                        type="checkbox"
                        checked={item.bought}
                        onChange={() => dispatch(toggleBought(item.id))}
                        aria-label={`Mark ${item.name} as bought`}
                      />
                      <span className={`${styles.text} ${item.bought ? styles.textBought : ""}`}>
                        {item.name}
                      </span>
                      <span className={styles.qtyBadge}>x{item.quantity}</span>
                    </label>
                    <div className={styles.actions}>
                      <button
                        type="button"
                        className={styles.btnSecondary}
                        onClick={() => startEdit(item.id, item.name, item.quantity)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={styles.btnDanger}
                        onClick={() => dispatch(deleteShoppingItem(item.id))}
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
    </div>
  );
}
