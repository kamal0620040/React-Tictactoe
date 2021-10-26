function Board({ onClick, squares }) {
  function showSquare(any) {
    return (
      <button className="square" onClick={() => onClick(any)}>
        {squares[any]}
      </button>
    );
  }

  return (
    <div>
      <div className="row">
        {showSquare(0)}
        {showSquare(1)}
        {showSquare(2)}
      </div>
      <div className="row">
        {showSquare(3)}
        {showSquare(4)}
        {showSquare(5)}
      </div>
      <div className="row">
        {showSquare(6)}
        {showSquare(7)}
        {showSquare(8)}
      </div>
    </div>
  );
}
export default Board;
