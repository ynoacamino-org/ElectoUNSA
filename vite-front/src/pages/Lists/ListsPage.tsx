import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ListsPage.module.css";

type ListItem = {
  id: string;
  name: string;
  electionType: string;
  year: number;
  candidates: string[];
  color?: string;
};

const MOCK_LISTS: ListItem[] = [
  { id: "1", name: "Renovación Universitaria", electionType: "Rectorado", year: 2025, candidates: ["María López", "Juan Pérez"], color: "#e7b9bd" },
  { id: "2", name: "UNSA Integra", electionType: "Decanato", year: 2024, candidates: ["Carlos Ruiz"], color: "#e7b9bd" },
  { id: "3", name: "Autonomía y Futuro por la UNSA", electionType: "Asamblea", year: 2023, candidates: ["Ana Torres"], color: "#e7b9bd" },
  { id: "4", name: "Compromiso Estudiantil", electionType: "Rectorado", year: 2025, candidates: ["Luis Gómez"], color: "#e7b9bd" },
  { id: "5", name: "Renovación Universitaria 2", electionType: "Rectorado", year: 2025, candidates: ["Sofía Ramos"], color: "#e7b9bd" },
  { id: "6", name: "UNSA Integra B", electionType: "Decanato", year: 2024, candidates: ["Diego Flores"], color: "#e7b9bd" },
  { id: "7", name: "Autonomía y Futuro B", electionType: "Asamblea", year: 2023, candidates: ["Marta Díaz"], color: "#e7b9bd" },
  { id: "8", name: "Compromiso Estudiantil B", electionType: "Rectorado", year: 2025, candidates: ["Raúl Salas"], color: "#e7b9bd" },
];

export default function ListsPage() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | string>("All");
  const [year, setYear] = useState<"All" | string>("All");
  const [listName, setListName] = useState<"All" | string>("All");

  const types = useMemo(() => ["All", ...Array.from(new Set(MOCK_LISTS.map((l) => l.electionType)))], []);
  const years = useMemo(() => ["All", ...Array.from(new Set(MOCK_LISTS.map((l) => String(l.year))))], []);
  const listNames = useMemo(() => ["All", ...Array.from(new Set(MOCK_LISTS.map((l) => l.name)))], []);

  const filtered = useMemo(() => {
    return MOCK_LISTS.filter((l) => {
      if (type !== "All" && l.electionType !== type) return false;
      if (year !== "All" && String(l.year) !== year) return false;
      if (listName !== "All" && l.name !== listName) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const inName = l.name.toLowerCase().includes(q);
        const inCandidates = l.candidates.some((c) => c.toLowerCase().includes(q));
        return inName || inCandidates;
      }
      return true;
    });
  }, [query, type, year, listName]);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Listas Electorales Autorizadas</h1>
          <p className={styles.subtitle}>Filtra y busca para encontrar la información de las listas participantes</p>
        </div>
      </header>

      <section className={styles.filters}>
        <div className={styles.searchWrapper}>
          <span className={styles.searchIcon} aria-hidden>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21l-4.35-4.35" stroke="#9b9b9b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="11" cy="11" r="6" stroke="#9b9b9b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <input
            className={styles.search}
            placeholder="Buscar por nombre de candidato"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "Tipo de Elección" : t}
            </option>
          ))}
        </select>

        <select className={styles.select} value={year} onChange={(e) => setYear(e.target.value)}>
          {years.map((y) => (
            <option key={y} value={y}>
              {y === "All" ? "Año" : y}
            </option>
          ))}
        </select>

        <select className={styles.select} value={listName} onChange={(e) => setListName(e.target.value)}>
          {listNames.map((n) => (
            <option key={n} value={n}>
              {n === "All" ? "Nombre de Lista" : n}
            </option>
          ))}
        </select>

        <button
          className={styles.applyBtn}
          onClick={() => {
            // botón visual — los filtros ya se aplican en tiempo real.
          }}
        >
          Aplicar Filtros
        </button>
      </section>

      <section className={styles.grid}>
        {filtered.length === 0 ? (
          <div className={styles.empty}>No se encontraron listas con esos filtros.</div>
        ) : (
          filtered.map((list) => (
            <article key={list.id} className={styles.card}>
              <div className={styles.thumb} style={{ background: list.color || "#f0c8cc" }} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{list.name}</h3>
                <p className={styles.meta}>
                  Elección: <strong>{list.electionType}</strong>
                </p>
                <p className={styles.meta}>
                  Año: <strong>{list.year}</strong>
                </p>
                <p className={styles.candidates}>Candidatos: {list.candidates.slice(0, 2).join(", ")}</p>
                <div className={styles.actions}>
                  <button className={styles.detailBtn} onClick={() => navigate(`/listas/${list.id}`)}>
                    Ver detalle
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
