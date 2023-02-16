import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    )
}
class Board extends React.Component {
    renderSquare(i) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            className={'square ' + ((i === this.props.selectedIdx) || (this.props.winSquares && this.props.winSquares.indexOf(i) > -1) ? 'selected' : '')}
            onClick={() => this.props.onClick(i)}
        />;
    }


    render() {
        const renderBoarders = () => {
            const rows = [];
            for (let i = 0; i < 3; i++) {
                const cols = [];
                let idx = 0;
                for (let j = 0; j < 3; j++) {
                    idx = 3 * i + j;
                    cols.push(this.renderSquare(idx));
                }
                rows.push(<div className="board-row" key={idx}>{cols}</div>);

            }
            return rows;
        }

        return (
            <div>
                {renderBoarders()}
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                position: {
                    row: null,
                    col: null,
                },
                selectedIdx: null,
            }],
            stepNumber: 0,
            xIsNext: true,
            isAsc: true,
            winSquares: null,
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                position: {
                    row: Math.floor(i / 3),
                    col: Math.floor(i % 3),
                },
                selectedIdx: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,

        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }
    toggleMoves() {
        this.setState({
            isAsc: !this.state.isAsc,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const isLast = this.state.stepNumber === current.squares.length;

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move + '(' + step.position.col + ',' + step.position.row + ')' :
                'Go to game start';
            return (
                <li key={move}>
                    <button
                        onClick={() => this.jumpTo(move)}
                        className={this.state.stepNumber === move ? 'font-weight-bold' : ''}
                    >{desc}</button>
                </li>
            );
        })

        if (!this.state.isAsc) {
            moves.reverse();
        }

        let status;
        if (winner) {
            status = 'Winner : ' + winner.winner;
        } else {
            if (isLast) {
                status = '무승부';
                current.selectedIdx = null;
            } else {
                status = 'Next player : ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        selectedIdx={current.selectedIdx}
                        winSquares={winner ? winner.idxs : null}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div><button onClick={() => this.toggleMoves()}>정렬변경 {this.state.isAsc ? '🔼' : '🔽'}</button></div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}


// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            // return squares[a];
            return { winner: squares[a], idxs: [a, b, c] };
        }
    }
    return null;
}