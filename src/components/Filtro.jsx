const Filtro = () => {

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Buscar..."}
      />
    </form>
  );
};

export default Filtro;
