
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

contract Voting {
    struct VoteGiven {
        address voter;
        string optionChosen;
    }

    struct Election {
        string electionName;
        string[] options;
    }

    mapping(address => Election[]) private electionsWithAddress;
    mapping(bytes32 => VoteGiven[]) private votesForElection; // Use a separate mapping for votes

    function createElection(string memory electionName, string[] memory options, address creator) public {
        require(bytes(electionName).length > 0, "Election name must be provided");
        require(options.length > 0, "Options must be provided");
        require(creator != address(0), "Creator address must be provided");

        Election memory newElection;
        newElection.electionName = electionName;
        newElection.options = options;

        electionsWithAddress[creator].push(newElection);
    }

    function vote(address creator, string memory electionName, string memory optionChosen) public {
        uint256 electionIndex = findElectionIndex(creator, electionName);
        require(electionIndex != type(uint256).max, "Election not found");

        VoteGiven memory newVote;
        newVote.voter = msg.sender;
        newVote.optionChosen = optionChosen;

        bytes32 electionKey = keccak256(abi.encodePacked(creator, electionName));
        votesForElection[electionKey].push(newVote);
    }

    function findElectionIndex(address creator, string memory electionName) internal view returns (uint256) {
        Election[] storage elections = electionsWithAddress[creator];
        for (uint256 i = 0; i < elections.length; i++) {
            if (keccak256(abi.encodePacked(elections[i].electionName)) == keccak256(abi.encodePacked(electionName))) {
                return i;
            }
        }
        return type(uint256).max; // Not found
    }

     function getElection (address _address,string memory electionName) public view   returns (Election memory){
       uint256 electionIndex = findElectionIndex(_address, electionName);
        require(electionIndex != type(uint256).max, "Election not found");
        return electionsWithAddress[_address][electionIndex];
       
    }
    function getAllVoteOfElection(address creator,string memory electionName) public view returns (VoteGiven[] memory) {
        uint256 electionIndex = findElectionIndex(creator, electionName);
        require(electionIndex != type(uint256).max, "Election not found");
        bytes32 electionKey = keccak256(abi.encodePacked(creator, electionName));
        return votesForElection[electionKey];
    }
    function getAllElections(address creator)public view   returns(string[] memory){
        Election[] memory elections=electionsWithAddress[creator];
        string[] memory electionNames = new string[](elections.length);
        for (uint i=0; i<elections.length; i++) 
        {
            electionNames[i]=elections[i].electionName;   
        }
        return electionNames;
    }
}
