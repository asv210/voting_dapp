export const contractAddress = "0x28FB17368f0E417ED29BE05E9991b16e776b10a0";
export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "electionName",
        type: "string",
      },
      {
        internalType: "string[]",
        name: "options",
        type: "string[]",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "createElection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "electionName",
        type: "string",
      },
      {
        internalType: "string",
        name: "optionChosen",
        type: "string",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
    ],
    name: "getAllElections",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "string",
        name: "electionName",
        type: "string",
      },
    ],
    name: "getAllVoteOfElection",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            internalType: "string",
            name: "optionChosen",
            type: "string",
          },
        ],
        internalType: "struct Voting.VoteGiven[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
      {
        internalType: "string",
        name: "electionName",
        type: "string",
      },
    ],
    name: "getElection",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "electionName",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "options",
            type: "string[]",
          },
        ],
        internalType: "struct Voting.Election",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
