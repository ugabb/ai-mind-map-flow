export const json = JSON.parse(`
    {
    "Turing Machine": {
        "description": "A mathematical model of computation representing an abstract machine that manipulates symbols on a tape according to rules.",
        "components": [
            "Memory Tape",
            "Head",
            "State",
            "Table of Rules"
        ],
        "Memory Tape": {
            "description": "An infinite tape divided into cells, each containing a symbol from a finite alphabet.",
            "operations": [
                "Read symbol from cell",
                "Write symbol into cell",
                "Move head left or right"
            ],
            "properties": [
                "Infinite",
                "Discrete"
            ]
        },
        "Head": {
            "description": "Component positioned over a cell, reads and writes symbols, and moves left or right.",
            "operations": [
                "Read symbol",
                "Write symbol",
                "Move left or right"
            ]
        },
        "State": {
            "description": "One of a finite set of states the machine can be in.",
            "operations": [
                "Select current state"
            ]
        },
        "Table of Rules": {
            "description": "Specifies actions based on current state and symbol read.",
            "actions": [
                "Write symbol",
                "Move head",
                "Halt computation"
            ]
        }
    }
}
`)